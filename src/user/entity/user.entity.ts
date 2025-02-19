import { Field, ObjectType } from "@nestjs/graphql";
import { Course } from "src/course/entity/course.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @Field(() => [Course], {nullable: true})
    @OneToMany(() => Course, (course) => course.user)
    courses : Course[];
}