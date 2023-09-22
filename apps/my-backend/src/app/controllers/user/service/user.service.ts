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

  async findbyID(id: number) 
  {
    const users = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!users) {
      return BadRequestException;
    }
    return users;
  }

  async findOne(username: string) 
  {
    const users = await this.userRepository.findOne({
      where: {
        username: username,
      },
    });
    if (!users) {
      return BadRequestException;
    }
    return users;
  }

  async create(user: CreateCustomerDTO) 
  {
    const hash_password = encryptPassword(user.hash_password);
    const newUser = await this.userRepository.create({...user, hash_password});
    await this.userRepository.save(newUser);
    return newUser;
  }

}
