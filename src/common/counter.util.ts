import { PrismaService } from 'prisma/prisma.service';

export class CounterUtil {
  static async next(prisma: PrismaService, key: string): Promise<number> {
    // atomic increment via upsert
    const updated = await prisma.counter.upsert({
      where: { key },
      update: { current: { increment: 1 } },
      create: { key, current: 1 },
    });
    return updated.current;
  }

  static async peek(prisma: PrismaService, key: string): Promise<number> {
    const doc = await prisma.counter.findUnique({ where: { key } });
    return doc?.current ?? 0;
  }
}
