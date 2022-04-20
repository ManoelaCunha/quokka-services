import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Resident from './Resident';
import Category from './Category';
import ServiceProvider from './ServiceProvider';

@Entity('services')
export default class Service {
    @PrimaryGeneratedColumn('uuid')
    serviceId: string;

    @Column({ nullable: false })
    title: string;

    @Column({ type: 'text', nullable: false })
    description: string;

    @Column({ default: 'available', nullable: false })
    status: string;

    @ManyToOne(() => Resident, (resident: Resident) => resident.services, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    resident: Resident;

    @ManyToOne(() => Category, (category: Category) => category.services, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    category: Category;

    @ManyToOne(
        () => ServiceProvider,
        (serviceProvider: ServiceProvider) => serviceProvider.services,
        {
            onDelete: 'SET NULL',
        },
    )
    serviceProvider: ServiceProvider;
}
