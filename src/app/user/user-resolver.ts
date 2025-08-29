// src/app/user/user.resolver.ts
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UserService } from './user-api.service';
import { UserEntity } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly users: UserService) {}

  /* CREATE */
  @Mutation(() => UserEntity)
  async createUser(@Args('input') input: CreateUserInput) {
    return this.users.createUserDetails(input);
  }

  /* READ: ALL */
  @Query(() => [UserEntity])
  async getUsers(): Promise<UserEntity[]> {
    return this.users.getAllUser();
  }

  /* READ: ONE (findOne) */
  @Query(() => UserEntity)
  async getUser(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<UserEntity> {
    return this.users.getUser(id);
  }

  /* UPDATE */
  @Mutation(() => UserEntity)
  async updateUser(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.users.updateUser(id, input);
  }

  /* REMOVE (soft delete → archived = true) */
  @Mutation(() => UserEntity)
  async removeUser(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<UserEntity> {
    return this.users.deleteUser(id);
  }
}
