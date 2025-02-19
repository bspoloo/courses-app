
import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";
import { CreateCourseInput } from "src/course/dto/create-course.input";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@InputType()
export class CreateUserInput {
    @Field()
    @IsString()
    @IsNotEmpty()
    name: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    email: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    phone: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    address: string;

    @Field(() => [CreateCourseInput], {nullable: true})
    @IsString()
    @IsNotEmpty()
    courses: CreateCourseInput[];
}