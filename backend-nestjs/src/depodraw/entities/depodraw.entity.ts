import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Depodraw")
export class DepodrawEntity {
    @PrimaryGeneratedColumn()
    depodrawId: number;

    @Column()
    userId: number;

    @Column()
    phone: string;

    @Column()
    amount: string;

    @Column()
    transactionId: string;

    @Column()
    paymentMethod: string;

    @Column()
    status: string;
}
