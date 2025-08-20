import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ defaultValue: false })
  archived?: boolean;

  @Field({ defaultValue: true })
  status?: boolean;
}
