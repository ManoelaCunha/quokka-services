import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Condominium from './Comdominium';
import ServiceProvider from './ServiceProvider';

@Entity('condominiums_service_providers')
export default class CondominiumServiceProvider {
    @PrimaryGeneratedColumn('uuid')
    condoServiceProvidersId: string;

    @Column({ default: false })
    isApproved: boolean;

    @ManyToOne(
        () => Condominium,
        (condominum: Condominium) => condominum.condominiumServiceProviders,
    )
    condominium: Condominium;

    @ManyToOne(
        () => ServiceProvider,
        (serviceProvider) => serviceProvider.condominiumServiceProviders,
    )
    serviceProvider: ServiceProvider;
}
