import { Field, ID, ObjectType } from '@nestjs/graphql';

/**
 * GraphQL representation of an IPK lead.  Exposes basic fields and the
 * assigned RM user as a nested object.
 */
@ObjectType()
export class IpkLeaddEntity {
  @Field(() => ID)
  id!: string;

  @Field()
  leadCode!: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  leadSource?: string;

  @Field({ nullable: true })
  location?: string;
  @Field({ nullable: true })
  gender?: string;
  @Field({ nullable: true })
  age?: number;
  @Field({ nullable: true })
  profession?: string;
  @Field({ nullable: true })
  companyName?: string;
  @Field({ nullable: true })
  designation?: string;
  @Field({ nullable: true })
  product?: string;
  @Field({ nullable: true })
  investmentRange?: string;
  @Field({ nullable: true })
  sipAmount?: number;
  @Field({ nullable: true })
  remark?: string;

  /**
   * The ID of the RM user assigned to this lead.  Stored as a simple string
   * rather than a relation to decouple the lead from the User model in the
   * Prisma schema.  Frontend clients can fetch user details separately.
   */
  @Field({ nullable: true })
  assignedRM?: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
