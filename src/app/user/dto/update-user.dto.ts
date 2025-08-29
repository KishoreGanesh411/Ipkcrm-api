import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { CreateUserInput } from './create-user.dto';
import { Status, UserRoles } from '../enums/user.enums';
import { Gender } from 'src/app/enums/common.enum';

@InputType()
export class UpdateUserDto extends PartialType(CreateUserInput) {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field(() => UserRoles, { nullable: true })
  @IsOptional()
  @IsEnum(UserRoles)
  role?: UserRoles;

  @Field({ nullable: true }) active?: boolean;

  @Field(() => Gender, { nullable: true })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @Field(() => String, { nullable: true })
  phone?: string;

  @Field(() => Status, { nullable: true })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;
}
