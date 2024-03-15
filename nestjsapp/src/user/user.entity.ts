import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { Post } from '../post/post.entity';

@Entity('User')
export class User {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ length: 256 })
  password: string;

  @Column()
  age: number;

  @Column()
  fullName: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Post, (post) => post.userId)
  @JoinColumn()
  posts: Post[];
}

/*


o posts (relación con los posts del usuario)

*/
