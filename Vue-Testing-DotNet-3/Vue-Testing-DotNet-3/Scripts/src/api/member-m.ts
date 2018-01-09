import { Moment } from 'moment'

export class MemberProfile {

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

export class MemberInfo {
    userName: string;
    memberId: number;
    email: string;
    lastLogin: Moment;
    registDate: Moment;
}