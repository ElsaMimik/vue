export class Member {
    userName: string;
    loginId: string;
    age: number;
    ip: string;
    constructor() {
        this.userName = 'waiting...';
        this.loginId = 'waiting...';
        this.age = 0;
        this.ip = 'waiting...';
    }
}

export class LoginRequest {
    loginId: string = '';
    password: string = '';
}