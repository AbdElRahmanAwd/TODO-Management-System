import { Router } from "express";
import { TodoController } from "../controllers/todo.controller";
import { TYPES } from "../container/types";
import { container } from "../container/inversify.config";

const todoRouter = Router();
const todoController = container.get<TodoController>(TYPES.TodoController);

todoRouter.get("/", todoController.getAll);
todoRouter.get("/:id", todoController.getById);
todoRouter.post("/", todoController.create);
todoRouter.put("/:id", todoController.update);
todoRouter.patch("/:id/status", todoController.updateStatus);
todoRouter.delete("/:id", todoController.delete);

export default todoRouter;
