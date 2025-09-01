// src/ipk-leadd/ipk-leadd.module.ts
import { Module } from '@nestjs/common';
import { IpkLeaddResolver } from './lead.resolver';
import { IpkLeaddService } from './ipk-leadd.service';
import { IpkLeaddController } from './lead.controller';
import { PrismaService } from 'prisma/prisma.service';
import { DbSeqService } from 'src/common/db-seq.service';
import { RmAssignService } from './rm-assign.service';

@Module({
  providers: [
    IpkLeaddResolver,
    IpkLeaddService,
    PrismaService,
    DbSeqService,
    RmAssignService,
  ],
  controllers: [IpkLeaddController],
  exports: [IpkLeaddService],
})
export class IpkLeaddModule {}
