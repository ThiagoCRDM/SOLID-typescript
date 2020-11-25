import { CreateUserUserCase } from "./CreateUserUserCase";
import {Request, Response} from 'express';

export class CreateUserController{
    
    private createUserUserCase:CreateUserUserCase;

    constructor(createUserUserCase:CreateUserUserCase){
        this.createUserUserCase = createUserUserCase;
    }

    async handle(request:Request, response:Response):Promise<Response>{

        const { name, email, password } = request.body;

        try {

            await this.createUserUserCase.execute({
                name,
                email,
                password
            });
    
            return response.status(201).send();
            
        } catch (error) {
           return response.status(400).send({
               message: error.message || 'Unexpected error.'
           });
        }
    }
}