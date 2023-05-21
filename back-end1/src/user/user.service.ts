/*import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
*/
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { HashService } from 'src/shared/hash.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private hashService: HashService,
  ) {}

  //Création d'un utilisateur
  async create(user: User): Promise<User> {
    //Verifie si l'utilisateur existe déjà
    const userExist = await this.findOneByEmail(user.email);

    //Si l'utilisateur existe déjà, on renvoie une erreur
    if (userExist)
      throw new UnauthorizedException({
        message: 'cet utilisateur existe deja',
      });
    /*  throw new HttpException(
        { message: 'cet utilisateur existe deja' },
        HttpStatus.NOT_ACCEPTABLE,
      );*/

    //Sinon on hash le mot de passe et on génére le matricule puis on sauvegarde l'utilisateur
    user.password = await this.hashService.hash(user.password);

    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }


  async update(id: number, updateUsersDto: any) {
    try {
      const user = await this.usersRepository.findOne({ where: { id: id } });
  
      if (!user) {
        throw new UnauthorizedException({
          message: 'utulisateur introuvable',
        });
      }
  
      // Vérifier si le nouvel email est déjà utilisé par un autre utilisateur
      if (updateUsersDto.email) {
        const existingUser = await this.usersRepository.findOne({
          where: { email: updateUsersDto.email },
        });
        if (existingUser && existingUser.id !== id) {
          throw new UnauthorizedException({
            message: 'cet email existe deja',
          });
        }
      }
  
      // Mettre à jour les propriétés de l'utilisateur avec les données fournies
      const updatedUser = { ...user, ...updateUsersDto };
      await this.usersRepository.save(updatedUser);
  
      return updatedUser;
    } catch (error) {
      console.log(
        `Erreur lors de la mise à jour de l'utilisateur : ${error.message}`,
      );
    }
  }
  
  /*async update(id: number, updateUsersDto: any) {
   
    
    return this.usersRepository.update(id, updateUsersDto);
  }*/


  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
