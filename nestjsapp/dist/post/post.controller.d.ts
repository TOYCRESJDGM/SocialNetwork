import { PostService } from './post.service';
import { Post as PostEntity } from './post.entity';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    getAllPosts(query: any): Promise<PostEntity[]>;
    getByFullName(query: any): Promise<PostEntity[]>;
    getById(params: any): Promise<PostEntity>;
    createPost(req: any, body: any): Promise<PostEntity>;
    updatePost(id: string, body: {
        title: string;
        content: string;
    }): Promise<{
        message: string;
    }>;
    deletePost(id: string): Promise<{
        message: string;
    }>;
    likePost(req: any, params: any): Promise<PostEntity>;
}
