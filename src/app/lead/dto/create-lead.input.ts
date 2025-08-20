// src/ipk-leadd/dto/create-ipk-leadd.input.ts
import { Field, InputType, Int } from '@nestjs/graphql';
import {
  ClientTypeEnum,
  GenderEnum,
  ProductEnum,
  ProfessionEnum,
} from '../enums/ipk-leadd.enum';

@InputType()
export class CreateIpkLeaddInput {
  @Field()
  leadCode!: string; // FE "leadId" value

  @Field({ nullable: true })
  location?: string;

  @Field(() => GenderEnum, { nullable: true })
  gender?: GenderEnum;

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

  // keep raw string values "<5L" | "10-25L" | "50L+"
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
}
