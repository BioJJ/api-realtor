import { Injectable } from '@nestjs/common';
import { UserInterface } from 'src/users/entities/user.interface';
import { UsersService } from 'src/users/users.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';
import { UserPayload } from './models/UserPayload';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async login(user: User): Promise<UserToken> {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name
    };

    return {
      access_token: this.jwtService.sign(payload)
    };
  }

  async validateUser(email: string, password: string) {
    let user: UserInterface;
    try {
      user = await this.userService.findEmail(email);
    } catch (error) {
      return null;
    }

    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) return null;

    return user;
  }
}
