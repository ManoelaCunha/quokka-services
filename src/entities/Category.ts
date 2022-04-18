import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export default class Category {
    @PrimaryGeneratedColumn('uuid')
    categoryId: string;

    @Column({ nullable: false })
    name: string;
}
