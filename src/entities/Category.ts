import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Service from './Service';

@Entity('categories')
export default class Category {
    @PrimaryGeneratedColumn('uuid')
    categoryId: string;

    @Column({ nullable: false })
    name: string;

    @OneToMany(() => Service, (service: Service) => service.category)
    services: Service[];
}
