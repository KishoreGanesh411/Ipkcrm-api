import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

/**
 * AssignmentService encapsulates the logic for generating sequential lead codes
 * and performing round‑robin RM assignment.  It uses the AssignmentMeta
 * collection to store counters and the last assigned RM ID.  All updates
 * happen within transactions to ensure concurrency safety.
 */
@Injectable()
export class AssignmentService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Get the next sequence value for a given counter name.  Creates the
   * counter document if it does not exist and atomically increments the
   * integer value.  Returns the new value after increment.
   */
  async nextSequence(name: string): Promise<number> {
    const result = await this.prisma.assignmentMeta.upsert({
      where: { name },
      update: { value: { increment: 1 } },
      create: { name, value: 1 },
    });
    return result.value;
  }

  /**
   * Determine the next active RM for lead assignment.  This method fetches
   * all active RMs (role=RM, status=ACTIVE, archived=false) ordered by
   * creation date, then uses the AssignmentMeta entry with name
   * 'RM_ROUND_ROBIN' to remember the last assigned RM.  The method runs
   * inside a transaction to avoid race conditions.  If no active RMs are
   * available an exception is thrown.
   */
  async getNextActiveRm() {
    const result = await this.prisma.$transaction(async (prisma) => {
      const activeRms = await prisma.user.findMany({
        where: { role: 'RM', status: 'ACTIVE', archived: false },
        orderBy: { createdAt: 'asc' },
        select: { id: true },
      });
      if (activeRms.length === 0) {
        throw new InternalServerErrorException('No active RMs available');
      }
      // Fetch last assigned RM ID from meta
      const meta = await prisma.assignmentMeta.findFirst({ where: { name: 'RM_ROUND_ROBIN' } });
      let nextRmId: string;
      if (!meta) {
        // No meta means no previous assignment; choose the first RM
        nextRmId = activeRms[0].id;
        await prisma.assignmentMeta.create({ data: { name: 'RM_ROUND_ROBIN', value: 0 } });
      } else {
        // Use meta.value as index into activeRms to remember position
        const lastIndex = meta.value;
        const nextIndex = (lastIndex + 1) % activeRms.length;
        nextRmId = activeRms[nextIndex].id;
        // Update meta.value to next index
        await prisma.assignmentMeta.update({ where: { name: 'RM_ROUND_ROBIN' }, data: { value: nextIndex } });
      }
      return nextRmId;
    });
    return result;
  }
}