import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('super_admins')
export default class SuperAdmin {
    @PrimaryGeneratedColumn('uuid')
    superAdminId: string;

    @Column()
    name: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column()
    password: string;
}
