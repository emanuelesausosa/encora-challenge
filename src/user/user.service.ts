import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserDto } from './models/dtos/UserDto';
import { v4 as uuidv4 } from 'uuid';
import { User } from './models/entities/User';
import * as USER_DB from '../data/user_db.json';
import * as fs from 'fs';

@Injectable()
export class UserService {
  usersRepository = USER_DB;

  saveNewUser(userDto: UserDto): User {
    // check if user is already in the database
    const userExists = this.getUserByName(userDto.name);
    if (userExists) {
      throw new ConflictException(`User: ${userDto.name} already exists`);
    }
    // create new user
    const newUser: User = { ...userDto };
    newUser.id = uuidv4();

    // save item in json file
    this.usersRepository.push(newUser);
    try {
      fs.writeFileSync(
        'src/data/user_db.json',
        JSON.stringify(this.usersRepository),
      );
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        `Error saving user: ${userDto.name}`,
      );
    }
    return newUser;
  }

  getAllUsers() {
    return this.usersRepository;
  }

  getUserById(id: string): User {
    return this.usersRepository.find((user: User) => user.id === id);
  }

  getUserByName(name: string): User {
    return this.usersRepository.find((user: User) => user.name === name);
  }
}
