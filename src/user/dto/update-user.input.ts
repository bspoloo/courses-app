
import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@InputType()
export class UpdateUserInput {
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

}