import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../../entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>,
      ) {}

      async findAll() {
        const users = await this.userRepository.find();
        if (!users) {
          return BadRequestException;
        }
        return users;
      }
}