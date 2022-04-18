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

    @ManyToOne(
        () => Condominium,
        (condominium: Condominium) => condominium.residents,
    )
    condominium: Condominium[];

    @OneToMany(() => Service, (service: Service) => service.resident)
    services: Service[];
}
