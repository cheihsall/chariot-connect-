import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Req,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './connexion.service';

import { JwtAuthGuard } from './authGuard';
import { User } from 'src/user/entities/user.entity';

type RequestWithUser = { user: Partial<User> };

@Controller()
export class AuthController {
  connexionService: any;
  constructor(private readonly authService: AuthService) {}

  @Post('auth')
  async login(@Body() user: User): Promise<{ access_token: string }> {
    const validatedUser = await this.authService.validateUser(
      user.email,
      user.password,
    );
    if (!validatedUser) {
      throw new UnauthorizedException({ message: 'connect toi' });
    }
    return this.authService.login(validatedUser);
  }
}
