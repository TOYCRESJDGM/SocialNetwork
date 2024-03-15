import {
  Controller,
  Get,
  Query,
  Param,
  Req,
  Body,
  UseGuards,
  Put,
  Delete,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { User as UserEntity } from './user.entity';
import { UpdateUser } from './update.dto';
import { ApiTags, ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('name/?')
  async getUserByName(@Query() query): Promise<UserEntity[]> {
    try {
      const { name } = query;
      return await this.userService.findByFullName(name);
    } catch (err) {
      throw err;
    }
  }

  @Get(':id')
  async getUserById(@Param() params): Promise<UserEntity> {
    try {
      return await this.userService.findById(params.id);
    } catch (err) {
      throw err;
    }
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized Bearer Auth',
  })
  @UseGuards(AuthGuard('jwt'))
  @Put('')
  async updateUser(
    @Req() req,
    @Body() body: UpdateUser,
  ): Promise<{ message: string }> {
    const { name, email, age } = body;
    return await this.userService.updateUser(name, email, age, req.user.id);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized Bearer Auth',
  })
  @UseGuards(AuthGuard('jwt'))
  @Delete('')
  async deleteUser(
    @Req() req,
    @Body() body: { password: string },
  ): Promise<{ message: string }> {
    const { password } = body;
    return await this.userService.deleteUser(password, req.user.id);
  }
}
