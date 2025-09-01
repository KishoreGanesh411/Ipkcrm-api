// src/app/lead/ipk-leadd.service.ts   (or src/ipk-leadd/ipk-leadd.service.ts)
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateIpkLeaddInput } from './dto/create-lead.input';
import { UpdateIpkLeaddInput } from './dto/update-leadd.input';
import { DbSeqService } from 'src/common/db-seq.service'; // adjust path if needed
import { makeLeadCode } from './leadcode.util';
import type { Prisma } from '@prisma/client';

@Injectable()
export class IpkLeaddService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly seq: DbSeqService,
  ) {}

  /**
   * Create a lead:
   *  - atomically get next daily sequence
   *  - generate leadCode
   *  - pick next active RM (round-robin) if any
   */
  async create(input: CreateIpkLeaddInput) {
    return this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // 1) daily counter key, e.g. "lead_seq_2025-09-04"
      const todayKey = `lead_seq_${new Date().toISOString().slice(0, 10)}`;
      const seqNum = await this.seq.next(todayKey, tx);
      const leadCode = makeLeadCode(seqNum);

      // 2) get active RMs in deterministic order
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const activeRms = await tx.rmMember.findMany({
        where: { active: true },
        orderBy: { name: 'asc' },
        select: { name: true },
      });

      // 3) round-robin cursor (also stored in Counter table)
      let assignedRM: string | null = null;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (activeRms.length > 0) {
        const cursor = await this.seq.next('rm_rr_cursor', tx); // 1,2,3,...
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const idx = (cursor - 1) % activeRms.length;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        assignedRM = activeRms[idx].name;
      }

      // 4) create the lead
      const row = await tx.ipkLeadd.create({
        data: {
          ...input, // include your optional fields: location, gender, etc.
          leadCode,
          assignedRM,
        },
      });

      return row;
    });
  }

  findAll() {
    return this.prisma.ipkLeadd.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: string) {
    const rec = await this.prisma.ipkLeadd.findUnique({ where: { id } });
    if (!rec) throw new NotFoundException('Lead not found');
    return rec;
  }

  async findByLeadCode(leadCode: string) {
    const rec = await this.prisma.ipkLeadd.findUnique({ where: { leadCode } });
    if (!rec) throw new NotFoundException('Lead not found');
    return rec;
  }

  async update(input: UpdateIpkLeaddInput) {
    const { id, ...data } = input;
    return this.prisma.ipkLeadd.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.ipkLeadd.delete({ where: { id } });
  }
}
