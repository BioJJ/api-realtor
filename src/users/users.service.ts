import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
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
      select: ['id', 'name', 'email', 'phone', 'profile', 'status'],
      where: { status: 'ACTIVATE' }
    });
  }

  async find(id: any): Promise<User> {
    const user = await this.userRepository.findOne({
      select: ['id', 'name', 'email', 'phone', 'profile', 'status'],
      where: { id: parseInt(id, 10) }
    });

    if (!id) {
      throw new NotFoundException(`Não achei um usuario com o id ${id}`);
    }

    return user;
  }

  async findEmail(emailUser: any): Promise<UserInterface> {
    const { id, name, email, password, phone, profile, status } =
      await this.userRepository.findOne({
        select: [
          'id',
          'name',
          'email',
          'password',
          'phone',
          'profile',
          'status'
        ],
        where: { email: emailUser }
      });

    if (!id) {
      throw new Error();
    }

    const response: UserInterface = {
      id,
      name,
      email,
      phone,
      password,
      profile,
      status
    };

    return response;
  }

  async update(userId: any, updateUserDto: UpdateUserDto): Promise<void> {
    const userDTO = await this.find(userId);
    const user = this.userRepository.create(userDTO);
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
