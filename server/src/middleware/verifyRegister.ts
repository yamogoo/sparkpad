import { db } from "@/models";
import { UserCreation, ApiBadResponse } from "@/typings";

import { Response, Request, NextFunction } from "express";

const UserModel = db.models.User;
const RolesModel = db.models.Role.Roles;

const checkIfEmailOrLoginExists = (
  req: Request<{}, {}, UserCreation>,
  res: Response<ApiBadResponse>,
  next: NextFunction
): void => {
  const { email, login } = req.body;

  /* * * Check if "login" is exists * * */

  UserModel.findOne({ where: { login } }).then((user) => {
    if (user) {
      res.setHeader("Content-Type", "application/json");
      return res.status(400).send({ error: "The user name is already in use" });
    }

    /* * * Check if "email" is exists * * */

    UserModel.findOne({ where: { email } }).then((user) => {
      if (user) {
        res.setHeader("Content-Type", "application/sjon");
        return res
          .status(400)
          .send({ error: "The user email is already in use" });
      }

      next();
    });
  });
};

const checkIfRoleExists = (
  req: Request<{}, {}, UserCreation>,
  res: Response<ApiBadResponse>,
  next: NextFunction
): void => {
  const { roles } = req.body;

  RolesModel.forEach((role) => {
    const isRoleExists = roles.find((_role) => role === _role);

    if (!isRoleExists)
      return res.status(400).send({ error: "User role does not exists" });
  });

  next();
};

export const verifyRegister = {
  checkIfEmailOrLoginExists,
  checkIfRoleExists,
};
