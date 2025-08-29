// src/app/user/user-api.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.dto';

type ActiveDto = { active: boolean };

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // CREATE
  async createUserDetails(userInfo: CreateUserInput): Promise<UserEntity> {
    return (await this.prisma.user.create({
      data: {
        ...userInfo,
        archived: false, // new users start as not archived
      },
    })) as UserEntity;
  }

  // UPDATE (full/partial)
  async updateUser(id: string, userInfo: UpdateUserDto): Promise<UserEntity> {
    return (await this.prisma.user.update({
      where: { id },
      data: userInfo,
    })) as UserEntity;
  }

  // SOFT DELETE → archived = true
  async deleteUser(id: string): Promise<UserEntity> {
    return (await this.prisma.user.update({
      where: { id },
      data: { archived: true },
    })) as UserEntity;
  }

  // LIST (only non-archived)
  async getAllUser(): Promise<UserEntity[]> {
    return (await this.prisma.user.findMany({
      where: { archived: false },
    })) as UserEntity[];
  }

  // READ ONE (only if not archived)
  async getUser(id: string): Promise<UserEntity> {
    return (await this.prisma.user.findFirst({
      where: { id, archived: false },
    })) as UserEntity;
  }

  // LIST active users (active=true & not archived)
  // async getActiveUsers(): Promise<UserEntity[]> {
  //   return (await this.prisma.user.findMany({
  //     where: { archived: false, active: true },
  //   })) as UserEntity[];
  // }

  // TOGGLE ACTIVE (only 'active' field)
  async updateUserActive(id: string, patch: ActiveDto): Promise<UserEntity> {
    return (await this.prisma.user.update({
      where: { id },
      data: patch, // e.g. { active: true } or { active: false }
    })) as UserEntity;
  }
}
