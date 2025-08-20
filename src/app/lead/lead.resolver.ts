// src/ipk-leadd/ipk-leadd.resolver.ts
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IpkLeaddService } from './ipk-leadd.service';
import { IpkLeaddEntity } from './entities/ipk-leadd.model';
import { CreateIpkLeaddInput } from './dto/create-lead.input';
import { UpdateIpkLeaddInput } from './dto/update-leadd.input';

@Resolver(() => IpkLeaddEntity)
export class IpkLeaddResolver {
  constructor(private readonly service: IpkLeaddService) {}

  @Mutation(() => IpkLeaddEntity)
  createIpkLeadd(@Args('input') input: CreateIpkLeaddInput) {
    return this.service.create(input);
  }

  @Query(() => [IpkLeaddEntity], { name: 'ipkLeadds' })
  findAll() {
    return this.service.findAll();
  }

  @Query(() => IpkLeaddEntity, { name: 'ipkLeadd' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.service.findOne(id);
  }

  @Query(() => IpkLeaddEntity, { name: 'ipkLeaddByCode' })
  findByCode(@Args('leadCode') leadCode: string) {
    return this.service.findByLeadCode(leadCode);
  }

  @Mutation(() => IpkLeaddEntity)
  updateIpkLeadd(@Args('input') input: UpdateIpkLeaddInput) {
    return this.service.update(input);
  }

  @Mutation(() => IpkLeaddEntity)
  removeIpkLeadd(@Args('id', { type: () => ID }) id: string) {
    return this.service.remove(id);
  }
}
