import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class AuthController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;

    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  async register(req: Request, res: Response) {
    try {
      const result = await this.userService.register(req.body);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const result = await this.userService.login(req.body);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }
}

