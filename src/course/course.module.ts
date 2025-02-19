import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entity/course.entity';
import { CourseResolver } from './course.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  providers: [CourseResolver, CourseService],
  exports: [CourseService]
})
export class CourseModule { }
