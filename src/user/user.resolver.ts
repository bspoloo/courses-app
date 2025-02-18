import { Query, Resolver } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { UserOutput } from "./dto/use.output";
import { User } from "./entity/user.entity";


@Resolver(of => User)
export class UserResolver{
    constructor(private userService : UserService){}

    @Query(() => [UserOutput], {name: 'getUsers'})
    public async getUsers() : Promise<UserOutput[]>{
        return this.userService.getUsers();
    }
}