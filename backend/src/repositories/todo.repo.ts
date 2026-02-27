import { Repository } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { Todo } from "../entities/todo.entity";
import { ITodoRepository } from "./todo.repo.interface";
import { TodoStatus } from "../enums/todo-status.enum";

export class TodoRepository implements ITodoRepository {
  private repo: Repository<Todo>;

  constructor() {
    this.repo = AppDataSource.getRepository(Todo);
  }

  findAll() {
    return this.repo.find({ order: { createdAt: "DESC" } });
  }

  findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  create(data: Pick<Todo, "name" | "description">) {
    const todo = this.repo.create(data);
    return this.repo.save(todo);
  }

  async update(id: number, data: Partial<Pick<Todo, "name" | "description">>) {
    const todo = await this.findById(id);
    if (!todo) return null;

    if (data.name !== undefined) todo.name = data.name;
    if (data.description !== undefined) todo.description = data.description;

    return this.repo.save(todo);
  }

  async updateStatus(id: number, status: TodoStatus) {
    const todo = await this.findById(id);
    if (!todo) return null;

    todo.status = status;
    return this.repo.save(todo);
  }

  async delete(id: number) {
    const result = await this.repo.delete({ id });
    return (result.affected ?? 0) > 0;
  }
}
