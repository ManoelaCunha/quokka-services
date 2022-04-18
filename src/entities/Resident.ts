import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import Condominium from './Condominium.ts';

@Entity('residents')
export default class Resident {
    @PrimaryGeneratedColumn('uuid')
    residentId: string;

    @Column()
    name: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ length: 14, nullable: false, unique: true })
    cpf: string;

    @Column()
    apartmentBlock: string;

    @Column({ type: 'integer' })
    apartmentNumber: number;

    @Column({ type: 'boolean', default: false })
    isAuth: boolean;

    @ManyToOne(() => Condominium, (condominiums) => condominiums.condominiumId)
    condominiumId = Condominium;
}
