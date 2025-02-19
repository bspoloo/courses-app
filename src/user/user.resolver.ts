import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { UserOutput } from "./dto/use.output";
import { User } from "./entity/user.entity";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";


@Resolver(of => User)
export class UserResolver{
    constructor(private userService : UserService){}

    @Query(() => [UserOutput], {name: 'getUsers'})
    public async getUsers() : Promise<UserOutput[] | void>{
        try{
            return this.userService.getUsers();
        }catch(error){
            throw new Error(`Error retrieving users: ${error.message}`);
        }
    }
    @Query(() => UserOutput, {name : 'getUserById'} )
    public async getUserById(@Args('id') id : number) : Promise<UserOutput>{
        try{
            return this.userService.getUserById(id);
        }catch(error){
            throw new Error(`Error retrieving user: ${error.message}`)
        }
    }
    @Mutation(() => UserOutput, {name: 'createUser'})
    public async createUser(@Args('user') user : CreateUserInput) : Promise<UserOutput>{
        try{
            return this.userService.createUser(user);
        }catch(error){
            throw new Error(`Error while creating user: ${error.message}`)
        }
        
    }
    @Mutation(() => UserOutput, {name: 'updateUser'})
    public async updateUser(@Args('id') id : number, @Args('user') user:UpdateUserInput ) : Promise<UserOutput>{
        try{
            return this.userService.updateUser(id , user);
        }catch(error){
            throw new Error(`Error while updating user with id: ${id}  error : ${error.message}`)
        }
    }
    @Mutation(() => UserOutput, {name : 'deleteUser'})
    public async deleteUser(@Args('id') id : number) : Promise<UserOutput>{
        try{
            return this.userService.deleteUserById(id);
        }catch(error){
            throw new Error(`Error while deleting user with id: ${id}  error : ${error.message}`)
        }
    }
}