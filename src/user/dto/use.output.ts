import { Field, ObjectType } from "@nestjs/graphql";


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
}