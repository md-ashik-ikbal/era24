export class CreateUserDto {
    id: number;
    role: string;
    userName: string;
    phone: string;
    email: string;
    password: string;
}

export class LoginDto {
    email: string;
    password: string;
}