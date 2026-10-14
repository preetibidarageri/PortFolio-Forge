import { Router } from "express";

import {
  publishPortfolio,
  getPublicPortfolio,
} from "../controllers/portfolioController";

import protect from "../middleware/authMiddleware";

const router = Router();

/*
  Protected route
  User must be logged in
*/
router.post("/publish", protect, publishPortfolio);

/*
  Public route
  Anyone can view a published portfolio
*/
router.get("/public/:slug", getPublicPortfolio);

export default router;
