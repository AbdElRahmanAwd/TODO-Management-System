import { Container } from "inversify";
import { UserRepository } from "../repositories/user.repo";
import { TodoRepository } from "../repositories/todo.repo";
import { TYPES } from "./types";
import { ITodoRepository, IUserRepository } from "../repositories/interfaces";
import { TodoService } from "../services/todo.service";
import { UserService } from "../services/user.service";
import { AuthController } from "../controllers/auth.controller";
import { TodoController } from "../controllers/todo.controller";

export const container = new Container();
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<ITodoRepository>(TYPES.TodoRepository).to(TodoRepository);

container.bind<TodoService>(TYPES.TodoService).to(TodoService);
container.bind<UserService>(TYPES.UserService).to(UserService);

container.bind<AuthController>(TYPES.AuthController).to(AuthController);
container.bind<TodoController>(TYPES.TodoController).to(TodoController);
