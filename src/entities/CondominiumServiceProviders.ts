import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Condominium from './Condominium';
import ServiceProvider from './ServiceProvider';

@Entity('condominiums_service_providers')
export default class CondominiumServiceProvider {
    @PrimaryGeneratedColumn('uuid')
    condoServiceProvidersId: string;

    @Column({ default: false })
    isApproved: boolean;

    @ManyToOne(
        () => Condominium,
        (condominium: Condominium) => condominium.condominiumServiceProviders,
        { onDelete: 'CASCADE' },
    )
    condominium: Condominium;

    @ManyToOne(
        () => ServiceProvider,
        (serviceProvider) => serviceProvider.condominiumServiceProviders,
        { onDelete: 'CASCADE', eager: true },
    )
    serviceProvider: ServiceProvider;
}
