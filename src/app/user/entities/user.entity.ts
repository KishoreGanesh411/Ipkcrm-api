import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserRoles, Status } from '../enums/user.enums';
import { Gender } from 'src/app/enums/common.enum';

@ObjectType()
export class UserEntity {
  @Field(() => ID)
  id!: string;

  @Field({ defaultValue: false })
  archived: boolean;

  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field(() => UserRoles)
  role!: UserRoles;

  @Field(() => Gender, { nullable: true })
  gender?: Gender;

  @Field(() => String, { nullable: true })
  phone?: string;

  @Field(() => Status)
  status!: Status;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
