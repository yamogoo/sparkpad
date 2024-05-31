import { Response, Request, NextFunction, RequestHandler } from "express";

const checkIfEmailOrLoginExists = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  //...
  next();
};

const checkIfRoleExists = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  //...
  next();
};

export const verifyRegister = {
  checkIfEmailOrLoginExists,
  checkIfRoleExists,
};
