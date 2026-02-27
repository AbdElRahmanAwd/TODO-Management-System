import { Request, Response } from "express";
import { TodoService } from "../services/todo.service";

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

  async getAll(req: Request, res: Response) {
    const todos = await this.todoService.getAll();
    res.json(todos);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const todo = await this.todoService.getById(Number(id));
    if (!todo) return res.status(404).json({ error: "Todo not found" });
    res.json(todo);
  }

  async create(req: Request, res: Response) {
    const data = req.body;
    const todo = await this.todoService.create(data);
    res.status(201).json(todo);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;
    const todo = await this.todoService.update(Number(id), data);
    if (!todo) return res.status(404).json({ error: "Todo not found" });
    res.json(todo);
  }

  async updateStatus(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;
    const todo = await this.todoService.updateStatus(Number(id), data);
    if (!todo) return res.status(404).json({ error: "Todo not found" });
    res.json(todo);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const deleted = await this.todoService.delete(Number(id));
    if (!deleted) return res.status(404).json({ error: "Todo not found" });
    res.json({ message: "Todo deleted" });
  }
}
