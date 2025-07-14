import express from "express";
import { deleteLogin, forgotPassword, getLogin, login } from "../controllers/authController.js";

const route = express.Router();

route.post("/login", login);
route.get("/login", getLogin);
route.post("/forgotPass", forgotPassword)
route.delete("/login/:id", deleteLogin);

export default route;
