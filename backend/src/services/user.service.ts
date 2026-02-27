import { IUserRepository } from "../repositories/user.repo.interface";
import { LoginDto, RegisterDto } from "../types/auth.dto";

export class UserService {
  private userRepo: IUserRepository;

  constructor(userRepo: IUserRepository) {
    this.userRepo = userRepo;
  }

  async register(data: RegisterDto) {
    const { name, email, password } = data;

    const existingUser = await this.userRepo.findByEmail(email);
    if (existingUser) throw new Error("Email already taken");

    if (name.length < 2 || name.length > 100)
      throw new Error("Name must be between 2 and 100 characters");
    if (password.length < 6 || password.length > 100)
      throw new Error("Password must be between 6 and 100 characters");

    return this.userRepo.create({ name, email, password });
  }

  async login(data: LoginDto) {
    const { email, password } = data;

    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new Error("Invalid email or password");

    return user;
  }
}
