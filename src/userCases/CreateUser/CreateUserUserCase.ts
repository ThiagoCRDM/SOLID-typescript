import { User } from "../../entities/User";

import { IMailProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUserCase{

    private usersRepository: IUsersRepository;
    private mailProvider: IMailProvider;

    constructor(usersRepository: IUsersRepository, mailProvider: IMailProvider){
        this.usersRepository = usersRepository;
        this.mailProvider =  mailProvider;
    }
    
    async execute(data: ICreateUserRequestDTO){
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

        if(userAlreadyExists){
            throw new Error('User already exists.');
        }

        const user = new User(data);

        await this.usersRepository.save(user);

        await this.mailProvider.sendMail({
            to:{name:data.name,
                email:data.email
            },
            from:{
                name: "Equipe do meu App.",
                email: "Equipe@meuapp.com",
            },
            subject: "Seja bem-vindo á plataforma",
            body:"<p>Você já pode fazer login em nossa plataforma.</p>"
        });
    }

}