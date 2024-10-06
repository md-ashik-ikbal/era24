import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("Activity")
export class ActivityEntity {
    @PrimaryGeneratedColumn()
    activityId: number;

    @Column()
    userId: number;

    @Column()
    packageId: number;

    @Column()
    packageTitle: string;

    @Column()
    packageStatus: string;

    @Column()
    activeTime: string;

    @Column()
    expireTime: string;

    @Column()
    remainWatchTime: number;
}