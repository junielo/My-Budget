import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../../entities/user.entity';
import { retry } from 'rxjs';
import { CreateCustomerDTO } from '../../../dto/create-customer.dto';
import { encryptPassword } from '../../../utils/bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) { }

  async findAll() 
  {
    const users = await this.userRepository.find();
    if (!users) {
      return BadRequestException;
    }
    return users;
  }

  async findOne(username: string) 
  {
    const users = await this.userRepository.find({
      where: {
        username: username,
      },
      take: 1,
    });
    if (!users) {
      return BadRequestException;
    }
    return users[0];
  }

  async create(user: CreateCustomerDTO) 
  {
    const hash_password = encryptPassword(user.hash_password);
    const newUser = await this.userRepository.create({...user, hash_password});
    await this.userRepository.save(newUser);
    return newUser;
  }

}
