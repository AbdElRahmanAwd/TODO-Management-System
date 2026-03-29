import { inject, injectable } from "inversify";
import { ITodoRepository } from "../repositories/interfaces/todo.repo.interface";
import * as todoDto from "../types/todo.dto";
import { TYPES } from "../container/types";
@injectable()
export class TodoService {
  private todoRepo: ITodoRepository;

  constructor(@inject(TYPES.TodoRepository) todoRepo: ITodoRepository) {
    this.todoRepo = todoRepo;
  }

  getAll(userId: number) {
    return this.todoRepo.findAll(userId);
  }

  getById(id: number, userId: number) {
    return this.todoRepo.findById(id, userId);
  }

  async create(data: todoDto.CreateTodoDto, userId: number) {
    const name = data.name?.trim();

    if (!name) throw new Error("Task name is required");
    if (name.length > 200)
      throw new Error("Task name must be less than 200 characters");
    if (name.length < 2)
      throw new Error("Task name must be at least 2 characters");

    const description = data.description?.trim() || undefined;
    return this.todoRepo.create({ name, description }, userId);
  }

  async update(id: number, data: todoDto.UpdateTodoDto, userId: number) {
    const name = data.name?.trim();

    if (!name) throw new Error("Task name is required");
    if (name.length > 200)
      throw new Error("Task name must be less than 200 characters");
    if (name.length < 2)
      throw new Error("Task name must be at least 2 characters");

    const description = data.description?.trim() || undefined;
    return this.todoRepo.update(id, { ...data, name, description }, userId);
  }

  async updateStatus(
    id: number,
    status: todoDto.UpdateTodoStatusDto,
    userId: number,
  ) {
    return this.todoRepo.updateStatus(id, status.status, userId);
  }

  delete(id: number, userId: number) {
    return this.todoRepo.delete(id, userId);
  }
}
