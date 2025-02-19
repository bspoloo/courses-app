import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Course } from 'src/course/entity/course.entity';

@Module({
    imports:[TypeOrmModule.forFeature([User, Course])],
    providers: [UserResolver, UserService],
    exports: [ UserService ]
})
export class UserModule {}
