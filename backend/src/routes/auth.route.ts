import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { container } from "../container/inversify.config";
import { TYPES } from "../container/types";

const authRouter = Router();
const authController = container.get<AuthController>(TYPES.AuthController);

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/me", authMiddleware, authController.getMe);

export default authRouter;
