
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { NumericType, Repository } from 'typeorm';
import { UserOutput } from './dto/use.output';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User)
    private readonly userRepository: Repository<User>, ){}

    public async getUsers() : Promise<UserOutput[]>{
        return await this.userRepository.find();
    }
    public async getUserById(id : number) : Promise<UserOutput>{
        const user = await this.userRepository.findOne(
            {where: {id : id}}
        );
        if(!user){
            throw new Error('User not found in database with id: ' +  id)
        }
        return user;
    }
    public async createUser(userDTO : CreateUserInput) : Promise<UserOutput>{
        if(!userDTO){
            throw new Error('User is null ')
        }
        return await this.userRepository.save(userDTO);
    }
    public async updateUser(id : number, userDTO : UpdateUserInput) : Promise<UserOutput>{
        const user = await this.userRepository.findOne({
            where: { id : id}
        });
        if(!user){
            throw new Error('User not found in database with id: ' +  id)
        }
        return this.userRepository.save(userDTO);
    }
}