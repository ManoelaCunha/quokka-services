import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('service_providers')
export class ServiceProvider {
    @PrimaryGeneratedColumn('uuid')
    serviceProviderId: string;

    @Column({ length: 11, nullable: false })
    phone: string;

    @Column()
    socialMedia: string;

    @Column()
    name: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ unique: true, nullable: false })
    cpf: string;

    @Column({ nullable: false })
    occupation: string;
}
