export class LoginUsers {
    email!: string;
    password!: string;

    constructor(obj: any) {
        this.email = obj['email'];
        this.password = obj['password'];
    }
}
