export class CreateActivityDto {
    userId: number;
    packageId: number;
    packageTitle: string;
    packageStatus: string;
    activeTime: string;
    expireTime: string;
    remainWatchTime: number;
}
