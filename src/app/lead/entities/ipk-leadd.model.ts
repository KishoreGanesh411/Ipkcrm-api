// src/ipk-leadd/entities/ipk-leadd.entity.ts
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  ClientTypeEnum,
  ProductEnum,
  ProfessionEnum,
} from '../enums/ipk-leadd.enum';
import { Gender } from 'src/app/enums/common.enum';

@ObjectType()
export class IpkLeaddEntity {
  @Field(() => ID)
  id!: string;

  @Field()
  leadCode!: string;

  @Field({ nullable: true })
  location?: string;

  @Field(() => Gender, { nullable: true })
  gender?: Gender;

  @Field(() => Int, { nullable: true })
  age?: number;

  @Field(() => ProfessionEnum, { nullable: true })
  profession?: ProfessionEnum;

  @Field({ nullable: true })
  companyName?: string;

  @Field({ nullable: true })
  designation?: string;

  @Field(() => ProductEnum, { nullable: true })
  product?: ProductEnum;

  // kept STRING to accept "<5L" | "10-25L" | "50L+"
  @Field({ nullable: true })
  investmentRange?: string;

  @Field(() => Int, { nullable: true })
  sipAmount?: number;

  @Field(() => [ClientTypeEnum], { nullable: 'itemsAndList' })
  clientTypes?: ClientTypeEnum[];

  @Field({ nullable: true })
  remark?: string;

  @Field({ nullable: true })
  leadSource?: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
