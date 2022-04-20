import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import CondominiumServiceProvider from './CondominiumServiceProviders';
import Service from './Service';

@Entity('service_providers')
export default class ServiceProvider {
    @PrimaryGeneratedColumn('uuid')
    serviceProviderId: string;

    @Column({ length: 11, nullable: false })
    phone: string;

    @Column({ nullable: true })
    socialMedia: string;

    @Column({ nullable: false })
    name: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ unique: true, nullable: false })
    cpf: string;

    @Column({ nullable: false })
    occupation: string;

    @OneToMany(
        () => CondominiumServiceProvider,
        (condominiumServiceProviders: CondominiumServiceProvider) =>
            condominiumServiceProviders.serviceProvider,
    )
    condominiumServiceProviders: CondominiumServiceProvider[];

    @OneToMany(() => Service, (services: Service) => services.serviceProvider)
    services: Service[];
}
