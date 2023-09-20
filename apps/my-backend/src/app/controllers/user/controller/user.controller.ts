import { Controller, Get } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '../../../entities/user.entity';

@Controller('user')
export class UserController {

    constructor(
        private userService: UserService,
    ) {}

    @Get()
    async findAll() {
        const users = await this.userService.findAll()
        return users
    }
}
