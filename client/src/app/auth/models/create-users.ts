export class CreateUsers {
    email!: string;
    username!: string;
    first_name!: string;
    last_name!: string;
    password!: string;

    constructor(obj: any) {
        this.email = obj['email'];
        this.username = obj['username'];
        this.first_name = obj['firstName'];
        this.last_name = obj['lastName'];
        this.password = obj['password'];
    }
}
