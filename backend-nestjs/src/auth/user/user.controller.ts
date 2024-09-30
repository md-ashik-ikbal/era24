import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("isEmailExist/:email")
  FindByEmail(@Param("email") email: string = "") {
    return this.userService.FindByEmail(email);
  }

  @Post("register")
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post("loginAuth")
  LogInAuth(@Body() loginDto: LoginDto) {
    return this.userService.LogInAuth(loginDto.email, loginDto.password);
  }

  @Get("getDataById/:id")
  GetDataById(@Param("id") id: number) {
    return this.userService.GetDataById(id);
  }

  // @Get("findAll")
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Get(':email')
  // findOne(@Param('email') email: string) {
  //   return this.userService.findOne(email);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
