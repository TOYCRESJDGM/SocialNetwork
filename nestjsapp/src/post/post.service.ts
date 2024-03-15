import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  // Get all posts for generic feed; with pagination
  async getAllPosts(skip = 0, take = 10): Promise<Post[]> {
    try {
      return await this.postRepository
        .createQueryBuilder('post')
        .innerJoin('post.userId', 'user')
        .select(['post', 'user.fullName'])
        .orderBy('post.createdDate', 'DESC')
        .skip(skip)
        .take(take)
        .getMany();
    } catch (err) {
      throw err;
    }
  }

  //   Get post by postId
  async getPostById(id: string): Promise<Post> {
    try {
      const post = await this.postRepository
        .createQueryBuilder('post')
        .innerJoin('post.userId', 'user')
        .select(['post', 'user.fullName'])
        .where('post.id = :id', { id })
        .getOne();
      return post;
    } catch (err) {
      throw err;
    }
  }

  //   Get posts by fullname; with pagination
  async getPostsByfullName(name: string, skip = 0, take = 10): Promise<Post[]> {
    try {
      const user = await this.userRepository.findOne({
        where: { fullName: name },
      });
      if (!user) {
        throw new Error('User not found');
      }

      return await this.postRepository
        .createQueryBuilder('post')
        .innerJoin('post.userId', 'user')
        .select(['post', 'user.fullName'])
        .where('post.userId = :userId', { userId: user.id })
        .orderBy('post.createdDate', 'DESC')
        .skip(skip)
        .take(take)
        .getMany();
    } catch (err) {
      throw err;
    }
  }

  //   Create a new post
  async createPost(id: string, title: string, content: string): Promise<Post> {
    try {
      // Find profile by id
      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        throw new Error('User not found');
      }
      const insertResult = await this.postRepository
        .createQueryBuilder()
        .insert()
        .into(Post)
        .values([
          {
            title,
            content,
            likes: [],
            userId: user,
          },
        ])
        .execute();
      const postId = insertResult.identifiers[0].id;
      const newPost = await this.getPostById(postId.toString());
      return newPost;
    } catch (err) {
      throw err;
    }
  }

  async updatePost(
    id: string,
    title: string,
    content: string,
  ): Promise<{ message: string }> {
    try {
      const post = await this.postRepository.findOne({ where: { id } });

      if (!post) {
        throw new Error('Post not found');
      }

      post.title = title;
      post.content = content;

      await this.postRepository.save(post);

      return { message: 'Post successfully updated' };
    } catch (err) {
      throw err;
    }
  }

  async deletePost(id: string): Promise<{ message: string }> {
    try {
      const post = await this.postRepository.findOne({ where: { id } });

      if (!post) {
        throw new Error('Post not found');
      }

      post.deletedAt = new Date();

      await this.postRepository.save(post);

      return { message: 'Post successfully deleted' };
    } catch (err) {
      throw err;
    }
  }

  async likePost(id: string, userId: string): Promise<Post> {
    try {
      const post = await this.getPostById(id);
      // check if userId has already liked post
      if (post.likes.some((like) => like === userId)) {
        // unlike
        post.likes.splice(post.likes.indexOf(userId), 1);
        return await this.postRepository.save(post);
      } else {
        post.likes.push(userId);
        return await this.postRepository.save(post);
      }
    } catch (err) {
      throw err;
    }
  }
}
