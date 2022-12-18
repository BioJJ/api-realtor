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
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      select: ['id', 'name', 'email', 'phone', 'status'],
      where: { status: 'ACTIVATE' }
    });
  }

  async find(userId: any): Promise<UserInterface> {
    const { id, name, email, password, phone, status } =
      await this.userRepository.findOne({
        select: ['id', 'name', 'email', 'phone', 'status'],
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
    const user = await this.find(userId);
    this.userRepository.merge(user, updateUserDto);
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
