import { IUserRepository } from "../repositories/user.repo.interface";
import { LoginDto, RegisterDto, AuthResponse } from "../types/auth.dto";
import { hashPassword, verifyPassword, generateToken } from "../utils/auth";

export class UserService {
  private userRepo: IUserRepository;

  constructor(userRepo: IUserRepository) {
    this.userRepo = userRepo;
  }

  async register(data: RegisterDto): Promise<AuthResponse> {
    const { name, email, password } = data;

    const existingUser = await this.userRepo.findByEmail(email);
    if (existingUser) throw new Error("Email already taken");

    if (name.length < 2 || name.length > 100)
      throw new Error("Name must be between 2 and 100 characters");
    if (password.length < 6 || password.length > 100)
      throw new Error("Password must be between 6 and 100 characters");

    const hashedPassword = await hashPassword(password);
    const user = await this.userRepo.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user.id);
    return { token, user: { id: user.id, name: user.name, email: user.email } };
  }

  async getMe(userId: number) {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new Error("User not found");
    return { id: user.id, name: user.name, email: user.email };
  }

  async login(data: LoginDto): Promise<AuthResponse> {
    const { email, password } = data;

    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new Error("Invalid email or password");

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) throw new Error("Invalid email or password");

    const token = generateToken(user.id);
    return { token, user: { id: user.id, name: user.name, email: user.email } };
  }
}
