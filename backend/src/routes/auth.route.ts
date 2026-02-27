import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { UserRepository } from "../repositories/user.repo";
import { UserService } from "../services/user.service";

const authRouter = Router();
const userRepo = new UserRepository();
const userService = new UserService(userRepo);
const authController = new AuthController(userService);

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);

export default authRouter;

