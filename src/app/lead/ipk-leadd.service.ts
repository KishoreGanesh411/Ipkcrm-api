// src/ipk-leadd/ipk-leadd.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateIpkLeaddInput } from './dto/create-lead.input';
import { UpdateIpkLeaddInput } from './dto/update-leadd.input';

@Injectable()
export class IpkLeaddService {
  constructor(private readonly prisma: PrismaService) {}

  create(input: CreateIpkLeaddInput) {
    return this.prisma.ipkLeadd.create({ data: { ...input } });
  }

  findAll() {
    return this.prisma.ipkLeadd.findMany({
      orderBy: { createdAt: 'desc' },
    });
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
