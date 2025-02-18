import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class User {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({ length: 500, nullable: false })
    name: string;

    @Field()
    @Column('text', { nullable: false })
    email: string;

    @Field()
    @Column('varchar', { length: 15 })
    phone: string;
    
    @Field()
    @Column('text')
    address: string;
}