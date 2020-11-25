import { MailtrapMailProvider } from "../../providers/implementations/MailtrapMailProvider";
import { LocalUsersRepository } from "../../repositories/implementations/LocalUsersRepository";
import { CreateUserUserCase } from "./CreateUserUserCase";
import { CreateUserController } from "./CreateUserController";

const mailTrapMailProvider = new MailtrapMailProvider();
const localUsersRepository = new LocalUsersRepository();

const createUseUserCase = new CreateUserUserCase(
    localUsersRepository,
    mailTrapMailProvider,
);

const createUserController = new CreateUserController(
    createUseUserCase
);

export { createUseUserCase, createUserController }