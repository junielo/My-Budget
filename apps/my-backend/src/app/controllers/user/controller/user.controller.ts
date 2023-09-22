import { BadGatewayException, Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '../../../entities/user.entity';
import { CreateCustomerDTO } from '../../../dto/create-customer.dto';

@Controller('user')
export class UserController {

    constructor(
        private userService: UserService,
    ) {}

    @Get()
    async findAll() {
        const users = await this.userService.findAll()
        if(!users) {
            return users
        }
        const filtered = (users as User[]).map(user => {
            const { hash_password, ...result } = user;
            return result;
        })
        
        return filtered
    }

    @Post('create')
    async create(@Body() customer: CreateCustomerDTO) {
        const saved = await this.userService.create(customer)
        if(!saved) {
            return BadGatewayException
        }
        return 'User created successfully';
    }
}
