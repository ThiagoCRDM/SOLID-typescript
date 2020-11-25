import { IUsersRepository } from "../IUsersRepository";
import { User } from "../../entities/User";

export class LocalUsersRepository implements IUsersRepository{
    private useres: Array<User>;

    async findByEmail(email: string):Promise<User>{
        const user = this.useres.find( user => user.email === email);

        return user;
    }
    
    async save(user:User): Promise<void>{
        
        this.useres.push(user);
    }
}