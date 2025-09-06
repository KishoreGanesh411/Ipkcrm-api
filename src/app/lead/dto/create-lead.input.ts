// src/ipk-leadd/dto/create-ipk-leadd.input.ts
import { Field, InputType, Int } from '@nestjs/graphql';
import {
  ClientTypeEnum,
  ProductEnum,
  ProfessionEnum,
} from '../enums/ipk-leadd.enum';
import { Gender } from '../../enums/common.enum';

@InputType()
export class CreateIpkLeaddInput {
  @Field({ nullable: true }) firstName?: string;
  @Field({ nullable: true }) lastName?: string;
  // @Field({ nullable: true }) name?: string; // only if you added `name` to Prisma
  @Field({ nullable: true }) email?: string;

  @Field({ nullable: true }) location?: string;
  @Field(() => Gender, { nullable: true }) gender?: Gender;
  @Field(() => Int, { nullable: true }) age?: number;
  @Field(() => ProfessionEnum, { nullable: true }) profession?: ProfessionEnum;
  @Field({ nullable: true }) companyName?: string;
  @Field({ nullable: true }) designation?: string;
  @Field(() => ProductEnum, { nullable: true }) product?: ProductEnum;
  @Field({ nullable: true }) investmentRange?: string;
  @Field(() => Int, { nullable: true }) sipAmount?: number;
  @Field(() => [ClientTypeEnum], { nullable: 'itemsAndList' })
  clientTypes?: ClientTypeEnum[];
  @Field({ nullable: true }) remark?: string;
  @Field({ nullable: true }) leadSource?: string;
}
