import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  //avant erreur
  /* 
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  } */
  async validateUser(
    email: string,
    mot_de_passe: string,
  ): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      if (user && (await bcrypt.compare(mot_de_passe, user.password))) {
        const etat = user.etat;
        if (etat == false) {
          throw new UnauthorizedException({
            correct: false,
            message: 'compte archivé',
          });
        } else {
          return user;
        }
      } else {
        throw new UnauthorizedException({
          correct: false,
          message: 'mot de passe invalide',
        });
      }
    } else {
      throw new UnauthorizedException({
        correct: false,
        message: 'mail invalide',
      });
    }
    /*  return null; */
  }

  async login(user: User): Promise<{
    access_token: string;
    id: number;
    role: string;
    prenom: string;
    nom: string;
    email: string;
  }> {
    const payload = { email1: user.email, sub: user.id };
    const id = user.id;
    const role = user.role;
    const prenom = user.prenom;
    const nom = user.nom;
    const email = user.email;

    return {
      access_token: this.jwtService.sign(payload),
      id: id,
      role: role,
      prenom: prenom,
      nom: nom,
      email: email,
    };
  }
}
