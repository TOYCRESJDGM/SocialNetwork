import {
  Controller,
  Get,
  Post,
  Query,
  Param,
  Req,
  Body,
  UseGuards,
  Put,
  Delete,
} from '@nestjs/common';

import { PostService } from './post.service';
import { Post as PostEntity } from './post.entity';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  /*
        Route: GET/all/?
        desc: Return array of most recent post and pagination
    
    */

  @Get('all/?')
  async getAllPosts(@Query() query): Promise<PostEntity[]> {
    try {
      const { skip, take } = query;
      return await this.postService.getAllPosts(skip, take);
    } catch (err) {
      throw err;
    }
  }

  @Get('name/?')
  async getByFullName(@Query() query): Promise<PostEntity[]> {
    try {
      const { name, skip, take } = query;
      return await this.postService.getPostsByfullName(name, skip, take);
    } catch (err) {
      throw err;
    }
  }

  @Get(':id')
  async getById(@Param() params): Promise<PostEntity> {
    try {
      return await this.postService.getPostById(params.id);
    } catch (err) {
      throw err;
    }
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized Bearer Auth',
  })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createPost(@Req() req, @Body() body): Promise<PostEntity> {
    try {
      return await this.postService.createPost(
        req.user.id,
        body.title,
        body.content,
      );
    } catch (err) {
      throw err;
    }
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized Bearer Auth',
  })
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async updatePost(
    @Param('id') id: string,
    @Body() body: { title: string; content: string },
  ): Promise<{ message: string }> {
    const { title, content } = body;
    return await this.postService.updatePost(id, title, content);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized Bearer Auth',
  })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deletePost(@Param('id') id: string): Promise<{ message: string }> {
    return await this.postService.deletePost(id);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized Bearer Auth',
  })
  @UseGuards(AuthGuard('jwt'))
  @Post('like/:id')
  async likePost(@Req() req, @Param() params): Promise<PostEntity> {
    try {
      return await this.postService.likePost(params.id, req.user.id);
    } catch (err) {
      throw err;
    }
  }
}
