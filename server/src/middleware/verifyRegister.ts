import { db } from "@/models";
import { RegisterCredentialsRequest } from "@/typings";
import { Response, Request, NextFunction, RequestHandler } from "express";

const User = db.models.User;
const Roles = db.models.Role.Roles;

const checkIfEmailOrLoginExists = (
  req: Request<any, any, RegisterCredentialsRequest>,
  res: Response,
  next: NextFunction
): void => {
  const { email, login } = req.body;

  /* * * Check if "login" is exists * * */
  User.findOne({ where: { login } }).then((user) => {
    if (user) {
      res.setHeader("Content-Type", "application/json");
      return res
        .status(400)
        .send({ message: "The user name is already in use" });
    }

    /* * * Check if "email" is exists * * */
    User.findOne({ where: { email } }).then((user) => {
      if (user) {
        res.setHeader("Content-Type", "application/sjon");
        return res
          .status(400)
          .send({ message: "The user email is already in use" });
      }

      next();
    });
  });
};

const checkIfRoleExists = (
  req: Request<any, any, RegisterCredentialsRequest>,
  res: Response,
  next: NextFunction
): void => {
  const { roles } = req.body;

  Roles.forEach((role) => {
    const isRoleExists = roles.find((_role) => role === _role);

    if (!isRoleExists)
      return res.status(400).send({ message: "User role does not exists" });
  });

  next();
};

export const verifyRegister = {
  checkIfEmailOrLoginExists,
  checkIfRoleExists,
};
