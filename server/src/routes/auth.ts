import express, { Request, Response, NextFunction } from "express";

import { authController } from "@/controllers/authController";
import { useVerifyRegister } from "@/middleware/useVerifyRegister";

const router = express.Router();

// Set headers
router.use((_req: Request, res: Response, next: NextFunction) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// Sign Up
router.post(
  "/register",
  [useVerifyRegister.checkIfEmailOrLoginExists],
  authController.register
);

// SignIn
router.post("/login", authController.login);

export default router;
