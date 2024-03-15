"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const post_entity_1 = require("./post.entity");
const user_entity_1 = require("../user/user.entity");
const typeorm_2 = require("typeorm");
let PostService = class PostService {
    constructor(postRepository, userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }
    async getAllPosts(skip = 0, take = 10) {
        try {
            return await this.postRepository
                .createQueryBuilder('post')
                .innerJoin('post.userId', 'user')
                .select(['post', 'user.fullName'])
                .orderBy('post.createdDate', 'DESC')
                .skip(skip)
                .take(take)
                .getMany();
        }
        catch (err) {
            throw err;
        }
    }
    async getPostById(id) {
        try {
            const post = await this.postRepository
                .createQueryBuilder('post')
                .innerJoin('post.userId', 'user')
                .select(['post', 'user.fullName'])
                .where('post.id = :id', { id })
                .getOne();
            return post;
        }
        catch (err) {
            throw err;
        }
    }
    async getPostsByfullName(name, skip = 0, take = 10) {
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
        }
        catch (err) {
            throw err;
        }
    }
    async createPost(id, title, content) {
        try {
            const user = await this.userRepository.findOne({ where: { id } });
            if (!user) {
                throw new Error('User not found');
            }
            const insertResult = await this.postRepository
                .createQueryBuilder()
                .insert()
                .into(post_entity_1.Post)
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
        }
        catch (err) {
            throw err;
        }
    }
    async updatePost(id, title, content) {
        try {
            const post = await this.postRepository.findOne({ where: { id } });
            if (!post) {
                throw new Error('Post not found');
            }
            post.title = title;
            post.content = content;
            await this.postRepository.save(post);
            return { message: 'Post successfully updated' };
        }
        catch (err) {
            throw err;
        }
    }
    async deletePost(id) {
        try {
            const post = await this.postRepository.findOne({ where: { id } });
            if (!post) {
                throw new Error('Post not found');
            }
            post.deletedAt = new Date();
            await this.postRepository.save(post);
            return { message: 'Post successfully deleted' };
        }
        catch (err) {
            throw err;
        }
    }
    async likePost(id, userId) {
        try {
            const post = await this.getPostById(id);
            if (post.likes.some((like) => like === userId)) {
                post.likes.splice(post.likes.indexOf(userId), 1);
                return await this.postRepository.save(post);
            }
            else {
                post.likes.push(userId);
                return await this.postRepository.save(post);
            }
        }
        catch (err) {
            throw err;
        }
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PostService);
//# sourceMappingURL=post.service.js.map