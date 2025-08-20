// src/ipk-leadd/ipk-leadd.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { IpkLeaddService } from './ipk-leadd.service';
import { CreateIpkLeaddInput } from './dto/create-lead.input';
import { UpdateIpkLeaddInput } from './dto/update-leadd.input';

@Controller('ipk-leadd')
export class IpkLeaddController {
  constructor(private readonly service: IpkLeaddService) {}

  @Post()
  create(@Body() body: CreateIpkLeaddInput) {
    return this.service.create(body);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: Omit<UpdateIpkLeaddInput, 'id'>,
  ) {
    return this.service.update({ id, ...body });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
