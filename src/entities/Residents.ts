import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Condominiums } from './Condominiums.ts';

@Entity('residents')
export class Residents {
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

    @ManyToOne(() => Condominiums, (condominium) => condominium.condominium_id)
    condominiumId = Condominiums;
}
