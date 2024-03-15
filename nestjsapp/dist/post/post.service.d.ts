import { Post } from './post.entity';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
export declare class PostService {
    private readonly postRepository;
    private readonly userRepository;
    constructor(postRepository: Repository<Post>, userRepository: Repository<User>);
    getAllPosts(skip?: number, take?: number): Promise<Post[]>;
    getPostById(id: string): Promise<Post>;
    getPostsByfullName(name: string, skip?: number, take?: number): Promise<Post[]>;
    createPost(id: string, title: string, content: string): Promise<Post>;
    updatePost(id: string, title: string, content: string): Promise<{
        message: string;
    }>;
    deletePost(id: string): Promise<{
        message: string;
    }>;
    likePost(id: string, userId: string): Promise<Post>;
}
