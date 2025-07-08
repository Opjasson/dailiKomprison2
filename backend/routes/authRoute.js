import express from "express";
import { deleteLogin, getLogin, login } from "../controllers/authController.js";

const route = express.Router();

route.post("/login", login);
route.get("/login", getLogin);
route.delete("/login/:id", deleteLogin);

export default route;
