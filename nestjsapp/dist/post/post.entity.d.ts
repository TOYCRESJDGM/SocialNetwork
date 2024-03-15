import { User } from 'src/user/user.entity';
export declare class Post {
    id: string;
    title: string;
    content: string;
    likes: string[];
    createdDate: Date;
    updatedAt: Date;
    deletedAt: Date;
    userId: User;
}
