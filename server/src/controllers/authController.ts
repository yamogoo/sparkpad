import { Request, Response, NextFunction } from "express";

const register = (req: Request, res: Response, next: NextFunction): void => {
  //...
  next();
};

const login = (req: Request, res: Response, next: NextFunction): void => {
  //...
  next();
};

export const authController = {
  register,
  login,
};
