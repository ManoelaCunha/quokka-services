import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Condominium from './Condominium.ts';
import ServiceProvider from './ServiceProvider.ts';

@Entity('condominiums_service_providers')
export default class CondominiumServiceProvider {
    @PrimaryGeneratedColumn('uuid')
    condoServiceProvidersId: number;

    @Column({ default: false })
    isApproved: boolean;

    @ManyToOne(() => Condominium, (condominum) => condominum.orderProducts)
    condominiumId: Condominium;

    @ManyToOne(
        () => ServiceProvider,
        (serviceProvider) => serviceProvider.orderProducts,
    )
    serviceProviderId: ServiceProvider;
}
