import { Repository } from "typeorm";
import { IUserRepository } from "./user.repo.interface";
import { User } from "../entities/user.entity";
import { AppDataSource } from "../config/data-source";

export class UserRepository implements IUserRepository {
  private repo: Repository<User>;

  constructor() {
    this.repo = AppDataSource.getRepository(User);
  }

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  create(data: Pick<User, "name" | "email" | "password">) {
    const user = this.repo.create(data);
    return this.repo.save(user);
  }
}
