const express = require("express");
const router = express.Router();
import goalsControllers from "../controllers/goalsControllers";
import protect from "../middleware/authMiddleware";

router.get("/", protect, goalsControllers.getAllGoals);

// router.get("/:uid", goalsControllers.getGoalByUserId);

router.post("/", protect, goalsControllers.setGoal);

router.put("/:id", protect, goalsControllers.updateGoal);

router.delete("/:id", protect, goalsControllers.deleteGoal);

export default router;
