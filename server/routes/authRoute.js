import express from "express";
import { register, login, logOut } from "../controllers/authController.js";
import { getCurrentUser } from "../controllers/userController.js";
import isAuth from "../middlewares/isAuth.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/logout", logOut);
authRouter.post("/logout", logOut);
authRouter.get("/current-user", isAuth, getCurrentUser);

export default authRouter;