import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { User } from 'src/user/user.entity';
import { PostService } from './post.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User]), UserModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
