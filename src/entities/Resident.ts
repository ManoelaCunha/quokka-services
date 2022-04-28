import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import Condominium from './Condominium';
import Service from './Service';

@Entity('residents')
export default class Resident {
    @PrimaryGeneratedColumn('uuid')
    residentId: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ length: 14, nullable: false, unique: true })
    cpf: string;

    @Column({ nullable: true })
    apartmentBlock: string;

    @Column({ type: 'integer', nullable: true })
    apartmentNumber: number;

    @Column({ type: 'boolean', default: false, nullable: false })
    isAuth: boolean;

    @ManyToOne(
        () => Condominium,
        (condominium: Condominium) => condominium.residents,
        { onDelete: 'CASCADE', lazy: true },
    )
    condominium: Condominium;

    @OneToMany(() => Service, (service: Service) => service.resident)
    services: Service[];
}
