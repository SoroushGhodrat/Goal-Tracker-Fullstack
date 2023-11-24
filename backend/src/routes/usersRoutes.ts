const express = require("express");
const router = express.Router();
import usersControllers from "../controllers/usersControllers";
import protect from "../middleware/authMiddleware";

router.get("/", usersControllers.getAllUsers);

router.post("/", usersControllers.registerUser);

router.post("/login", usersControllers.loginUser);

router.get("/me", protect, usersControllers.getMe);

export default router;
