import express from "express";
import { addData, deleteData, getData, getDataById } from "../controllers/jadwalController.js";

const router = express.Router();

router.get("/jadwal/:id", getDataById)
router.get("/jadwal", getData);
router.post("/jadwal", addData);
// router.patch("/jadwal/:id", updateData)
router.delete("/jadwal/:id", deleteData)


export default router;
