import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/user/entity/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@ObjectType()
@Entity()
export class Course {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({ length: 500, nullable: false })
    name: string;

    @Field()
    @Column()
    description : string
    
    @Field()
    @Column('integer')
    price: number;

    @Field(() => User, {nullable: true})
    @ManyToOne(()=> User , (user) => user.courses, {onDelete: 'CASCADE'})
    user : User;
}