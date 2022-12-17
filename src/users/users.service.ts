import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserInterface } from './entities/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.save(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      where: { status: 'ACTIVATE' }
    });
  }

  async find(userId: any): Promise<UserInterface> {
    const { id, name, email, password, phone, status } =
      await this.userRepository.findOne({
        where: { id: parseInt(userId, 10) }
      });

    if (!id) {
      throw new Error();
    }

    const response: User = {
      id,
      name,
      email,
      phone,
      password,
      status
    };

    return response;
  }

  async update(userId: any, updateUserDto: UpdateUserDto): Promise<void> {
    const { name, email, phone, password } = updateUserDto;
    const user = await this.find(userId);

    user.name = name ? name : user.name;
    user.email = email ? email : user.email;
    user.phone = phone ? phone : user.phone;
    user.password = password ? password : user.password;

    await this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete({ id });
  }

  async activate(id: number): Promise<void> {
    await this.userRepository.update(id, { status: 'ACTIVATE' });
  }

  async inactivate(id: number): Promise<void> {
    await this.userRepository.update(id, { status: 'INACTIVATE' });
  }
}
