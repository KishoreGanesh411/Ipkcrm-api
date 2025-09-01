// src/common/db-seq.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import type { Prisma } from '@prisma/client';

@Injectable()
export class DbSeqService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Get next integer for a named counter.
   * If tx is provided, uses it; else uses the root prisma client.
   */
  async next(key: string, tx?: Prisma.TransactionClient): Promise<number> {
    const client = tx ?? this.prisma;

    const existing = await client.counter.findUnique({ where: { key } });
    if (!existing) {
      const created = await client.counter.create({ data: { key, current: 1 } });
      return created.current;
    }
    const updated = await client.counter.update({
      where: { key },
      data: { current: { increment: 1 } },
    });
    return updated.current;
  }
}
