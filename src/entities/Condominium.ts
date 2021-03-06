import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import Resident from './Resident';
import CondominiumServiceProvider from './CondominiumServiceProviders';

@Entity('condominiums')
export default class Condominium {
    @PrimaryGeneratedColumn('uuid')
    condominiumId: string;

    @Column({ nullable: false, unique: true })
    condominiumName: string;

    @Column({ length: 8, nullable: false })
    zipCode: string;

    @Column({ nullable: false })
    district: string;

    @Column({ nullable: false })
    street: string;

    @Column({ type: 'integer', nullable: false })
    number: number;

    @Column({ nullable: false })
    trusteeName: string;

    @Column({ nullable: false, unique: true })
    trusteeEmail: string;

    @Column({ nullable: false, unique: true })
    trusteeCpf: string;

    @Column({ nullable: false })
    trusteePassword: string;

    @OneToMany(() => Resident, (resident: Resident) => resident.condominium, {
        eager: true,
    })
    residents: Resident[];

    @OneToMany(
        () => CondominiumServiceProvider,
        (condominiumServiceProvider: CondominiumServiceProvider) =>
            condominiumServiceProvider.condominium,
        { eager: true },
    )
    condominiumServiceProviders: CondominiumServiceProvider[];
}
