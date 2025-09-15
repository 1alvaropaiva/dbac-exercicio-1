import express from "express";
import UserController from "../controllers/UserController.js";

const router = express.Router();

router.get("/", UserController.getAll);
router.get("/:id", UserController.getByID);
router.post("/", UserController.create);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.destroy);

export default router;
