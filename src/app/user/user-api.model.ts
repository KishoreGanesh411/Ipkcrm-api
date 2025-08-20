import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  archived: boolean;

  @Field()
  status: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
