// src/ipk-leadd/ipk-leadd.module.ts
import { Module } from '@nestjs/common';
import { IpkLeaddResolver } from './lead.resolver';
import { IpkLeaddService } from './ipk-leadd.service';
import { IpkLeaddController } from './lead.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [IpkLeaddResolver, IpkLeaddService, PrismaService],
  controllers: [IpkLeaddController],
  exports: [IpkLeaddService],
})
export class IpkLeaddModule {}
