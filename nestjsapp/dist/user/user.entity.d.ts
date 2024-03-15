import { Post } from '../post/post.entity';
export declare class User {
    id: string;
    email: string;
    password: string;
    age: number;
    fullName: string;
    createdDate: Date;
    updatedAt: Date;
    deletedAt: Date;
    posts: Post[];
}
