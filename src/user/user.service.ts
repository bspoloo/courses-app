
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { NumericType, Repository } from 'typeorm';
import { UserOutput } from './dto/use.output';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Course } from 'src/course/entity/course.entity';
import { CreateCourseInput } from 'src/course/dto/create-course.input';
import { Certificate } from 'crypto';

@Injectable()
export class UserService {
    constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, 
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>
){}
    public async getUsers() : Promise<UserOutput[]>{
        
        return await this.userRepository.find({
            relations: {
                courses: true,
            }
        });
    }
    public async getUserById(id : number) : Promise<UserOutput>{
        const user = await this.userRepository.findOne({
            where: {id : id},
            relations: {
                courses: true
            }
        });
        if(!user){
            throw new Error('User not found in database with id: ' +  id)
        }
        return user;
    }
    public async createUser(userDTO : CreateUserInput) : Promise<UserOutput>{
        if(!userDTO){
            throw new Error('User is null ')
        }
        const courses = await Promise.all(
            userDTO.courses.map((course : CreateCourseInput) => this.preloadCourseByName(course))
        );
        
        const userEntity : User = this.userRepository.create({...userDTO, courses})
        console.log(userEntity);
        return await this.userRepository.save(userEntity);
    }
    public async updateUser(id : number, userDTO : UpdateUserInput) : Promise<UserOutput>{
        const user = await this.userRepository.findOne({
            where: { id : id}
        });
        if(!user){
            throw new Error('User not found in database with id: ' +  id)
        }
        Object.assign(user, userDTO);
        return await this.userRepository.save(user);
    }
    public async deleteUserById(id : number) : Promise<UserOutput>{
        const user = await this.userRepository.findOne({
            where: { id : id}
        });
        if(!user){
            throw new Error('User not found in database with id: ' +  id)
        }
        await this.userRepository.delete(id);
        return user;
    }
    private async preloadCourseByName(course : CreateCourseInput): Promise<Course>{
        const existingCourse = await this.courseRepository.findOne({
            where: {name: course.name}
        });
        if(!existingCourse){
            const createdCourse = this.courseRepository.create(course);
            await this.courseRepository.save(createdCourse);
            return createdCourse;
        }
        console.log('This already exists');
        return existingCourse;
    }
}