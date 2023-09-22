import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/service/user.service';
import { User } from '../../entities/user.entity';
import { comparePassword } from '../../utils/bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService
    ) { }

    async validateUser(username: string, pass: string) {
        const tempUser = await this.userService.findOne(username);
        if (typeof (tempUser) !== typeof BadRequestException) {
            const user = tempUser as User
            if (user && comparePassword(pass, user.hash_password)) {
                const { hash_password, ...result } = user;
                return result;
            }
        }
        return null;
    }

}
