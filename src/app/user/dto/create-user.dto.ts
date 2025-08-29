import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Status, UserRoles } from '../enums/user.enums';
import { Gender } from '../../enums/common.enum';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name!: string;
  @Field({ defaultValue: false })
  archived: boolean;

  @Field()
  @IsEmail()
  email!: string;

  @Field(() => UserRoles)
  @IsEnum(UserRoles)
  role!: UserRoles;

  @Field(() => Gender, { nullable: true })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @Field(() => String, { nullable: true })
  phone?: string;

  @Field(() => Status, { defaultValue: Status.ACTIVE })
  @IsEnum(Status)
  status: Status = Status.ACTIVE;
}
