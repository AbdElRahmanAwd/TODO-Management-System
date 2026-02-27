import { TodoRepository } from "../repositories/todo.repo";
import * as todoDto from "../types/todo.dto";

export class TodoService {
  private todoRepo: TodoRepository;

  constructor() {
    this.todoRepo = new TodoRepository();
  }

  getAll() {
    return this.todoRepo.findAll();
  }

  getById(id: number) {
    return this.todoRepo.findById(id);
  }

  async create(data: todoDto.CreateTodoDto) {
    const name = data.name?.trim();

    if (!name) throw new Error("Task name is required");
    if (name.length > 200)
      throw new Error("Task name must be less than 200 characters");
    if (name.length < 2)
      throw new Error("Task name must be at least 2 characters");

    const description = data.description?.trim() || undefined;
    return this.todoRepo.create({ name, description });
  }

  async update(id: number, data: todoDto.UpdateTodoDto) {
    const name = data.name?.trim();

    if (!name) throw new Error("Task name is required");
    if (name.length > 200)
      throw new Error("Task name must be less than 200 characters");
    if (name.length < 2)
      throw new Error("Task name must be at least 2 characters");

    const description = data.description?.trim() || undefined;
    return this.todoRepo.update(id, { ...data, name, description });
  }

  async updateStatus(id: number, status: todoDto.UpdateTodoStatusDto) {
    return this.todoRepo.updateStatus(id, status.status);
  }

  delete(id: number) {
    return this.todoRepo.delete(id);
  }
}
