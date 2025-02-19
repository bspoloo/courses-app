import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Column } from "typeorm";

@ObjectType()
export class CourseOutput {
    @Field()
    name: string;

    @Field()
    description: string

    @Field()
    price: number;
}