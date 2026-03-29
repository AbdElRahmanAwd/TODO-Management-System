import { injectable } from "inversify";
import { Repository } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { Todo } from "../entities/todo.entity";
import { ITodoRepository } from "./interfaces/todo.repo.interface";
import { TodoStatus } from "../enums/todo-status.enum";
@injectable()
export class TodoRepository implements ITodoRepository {
  private repo: Repository<Todo>;

  constructor() {
    this.repo = AppDataSource.getRepository(Todo);
  }

  findAll(userId: number) {
    return this.repo.find({
      where: { user: { id: userId } },
      order: { createdAt: "DESC" },
    });
  }

  findById(id: number, userId: number) {
    return this.repo.findOne({ where: { id, user: { id: userId } } });
  }

  create(data: Pick<Todo, "name" | "description">, userId: number) {
    const todo = this.repo.create({ ...data, user: { id: userId } });
    return this.repo.save(todo);
  }

  async update(
    id: number,
    data: Partial<Pick<Todo, "name" | "description">>,
    userId: number,
  ) {
    const todo = await this.findById(id, userId);
    if (!todo) return null;

    if (data.name !== undefined) todo.name = data.name;
    if (data.description !== undefined) todo.description = data.description;

    return this.repo.save(todo);
  }

  async updateStatus(id: number, status: TodoStatus, userId: number) {
    const todo = await this.findById(id, userId);
    if (!todo) return null;

    todo.status = status;
    return this.repo.save(todo);
  }

  async delete(id: number, userId: number) {
    const result = await this.repo.delete({ id, user: { id: userId } });
    return (result.affected ?? 0) > 0;
  }
}
