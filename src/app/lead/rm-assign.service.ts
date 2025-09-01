// src/ipk-leadd/rm-assign.service.ts
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { DbSeqService } from 'src/common/db-seq.service';

@Injectable()
export class RmAssignService {
  constructor(
    private prisma: PrismaService,
    private seq: DbSeqService,
  ) {}

  /** Simple round-robin among active RMs using a global cursor */
  async pickNextRM(tx: Prisma.TransactionClient): Promise<string | null> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const active = await tx.rmMember.findMany({
      where: { active: true },
      orderBy: { name: 'asc' },
      select: { name: true },
    });
    if (active.length === 0) return null;

    const cursor = await this.seq.next('rm_rr_cursor', tx); // ✅ pass tx
    const idx = (cursor - 1) % active.length;
    return active[idx].name;
  }

  /** Alternative: least-load assignment */
  async pickLeastLoadRM(): Promise<string | null> {
    const active = await this.prisma.rmMember.findMany({
      where: { active: true },
      select: { name: true },
    });
    if (active.length === 0) return null;

    // Compute open lead counts per RM (can be optimized)
    const stats = await Promise.all(
      active.map(async (rm) => {
        const count = await this.prisma.ipkLeadd.count({
          where: { assignedRM: rm.name, status: 'OPEN' },
        });
        return { name: rm.name, open: count };
      }),
    );

    // Pick RM with minimum open leads (ties broken by name)
    stats.sort((a, b) => a.open - b.open || a.name.localeCompare(b.name));
    return stats[0].name;
  }
}
