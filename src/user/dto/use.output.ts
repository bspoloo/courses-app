import { Field, ObjectType } from "@nestjs/graphql";
import { CourseOutput } from "src/course/dto/course.output";
import { Course } from "src/course/entity/course.entity";


@ObjectType()
export class UserOutput {
    @Field()
    name: string;
    @Field()
    email: string;
    @Field()
    phone: string;
    @Field()
    address: string;

    @Field(() => [CourseOutput], { nullable: true })
    courses: CourseOutput[]
    
}