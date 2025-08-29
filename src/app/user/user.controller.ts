// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Param,
//   Patch,
//   Post,
// } from '@nestjs/common';
// import { UserService } from './user-api.service';
// import { CreateUserInput } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

// @Controller('users')
// export class UserController {
//   constructor(private readonly users: UserService) {}

//   @Post()
//   create(@Body() dto: CreateUserInput) {
//     return this.users.create(dto);
//   }

//   @Get()
//   findAll() {
//     return this.users.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.users.findOne(id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
//     return this.users.update(id, dto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.users.remove(id);
//   }
// }
