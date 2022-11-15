import express from "express";
import {
  addTask,
  deleteTask,
  getTask,
  updateTask,
} from "../controllers/task.js";

const router = express.Router();

router.get("/", getTask);

router.post("/", addTask);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

export default router;
