export class UserInfo {
    
    name: string;
    username: string;
    authorities: Array<string>;

    constructor() {
        this.name = '';
        this.username = '';
        this.authorities = new Array<string>();
    }

    parse(userInfo: UserInfo) {
        this.name = userInfo.name;
        this.username = userInfo.username;
        this.authorities = new Array<string>();
        userInfo.authorities.forEach((role) => this.authorities.push(role));
    }

}