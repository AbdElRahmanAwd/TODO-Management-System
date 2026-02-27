import { Router } from "express";
import { TodoController } from "../controllers/todo.controller";
import { TodoRepository } from "../repositories/todo.repo";
import { TodoService } from "../services/todo.service";

const todoRouter = Router();
const todoRepo = new TodoRepository();
const todoService = new TodoService(todoRepo);
const todoController = new TodoController(todoService);

todoRouter.get("/", todoController.getAll);
todoRouter.get("/:id", todoController.getById);
todoRouter.post("/", todoController.create);
todoRouter.put("/:id", todoController.update);
todoRouter.patch("/:id/status", todoController.updateStatus);
todoRouter.delete("/:id", todoController.delete);

export default todoRouter;
