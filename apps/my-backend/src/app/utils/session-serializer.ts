import { PassportSerializer } from "@nestjs/passport";
import { UserService } from "../controllers/user/service/user.service";
import { User } from "../entities/user.entity";

export class SessionSerializer extends PassportSerializer{

    constructor(
        private userService: UserService
    ){
        super();
    }
    serializeUser(user: User, done: (err, user: User) => void) {
        console.log('Serrialized')
        done(null, user);
    }
    async deserializeUser(user: User, done: (err, user: User) => void) {
        console.log('Deserialized')
        const userDB = (await this.userService.findbyID(user.id)) as User;
        return userDB ? done(null, userDB) : done(null, null)
    }

}