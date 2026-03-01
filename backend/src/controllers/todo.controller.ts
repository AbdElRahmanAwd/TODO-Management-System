import { Response } from "express";
import { TodoService } from "../services/todo.service";
import { AuthRequest } from "../middleware/auth.middleware";

export class TodoController {
  private todoService: TodoService;

  constructor(todoService: TodoService) {
    this.todoService = todoService;

    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll(req: AuthRequest, res: Response) {
    const todos = await this.todoService.getAll(req.userId!);
    res.json(todos);
  }

  async getById(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const todo = await this.todoService.getById(Number(id), req.userId!);
    if (!todo) return res.status(404).json({ error: "Todo not found" });
    res.json(todo);
  }

  async create(req: AuthRequest, res: Response) {
    const todo = await this.todoService.create(req.body, req.userId!);
    res.status(201).json(todo);
  }

  async update(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const todo = await this.todoService.update(
      Number(id),
      req.body,
      req.userId!,
    );
    if (!todo) return res.status(404).json({ error: "Todo not found" });
    res.json(todo);
  }

  async updateStatus(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const todo = await this.todoService.updateStatus(
      Number(id),
      req.body,
      req.userId!,
    );
    if (!todo) return res.status(404).json({ error: "Todo not found" });
    res.json(todo);
  }

  async delete(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const deleted = await this.todoService.delete(Number(id), req.userId!);
    if (!deleted) return res.status(404).json({ error: "Todo not found" });
    res.json({ message: "Todo deleted" });
  }
}
