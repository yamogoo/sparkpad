import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import { v4 } from "uuid";

import config from "@/config/authConfig";

import { db } from "@/models";

import {
  ApiResponse,
  AuthorizedUser,
  LoginCredentials,
  User,
  UserCreation,
} from "@/typings";

const UserModel = db.models.User;
const RoleModel = db.models.Role;

const { secretKey } = config;

const register = (
  req: Request<{}, {}, UserCreation>,
  res: Response<ApiResponse<Pick<User, "login" | "email">>>
): void => {
  const { login, email, password, roles } = req.body;

  UserModel.create({
    id: v4(),
    login,
    email,
    password: bcrypt.hashSync(password, 8),
  })
    .then((user) => {
      if (roles.length > 0) {
        RoleModel.findAll({
          where: { name: { [Op.or]: roles } },
        }).then((_roles) => {
          res.status(200).send({
            payload: {
              login: user.login,
              email: user.email,
            },
          });
        });
      } else {
        res.status(400).send({ error: "User roles not been provided" });
      }
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
};

const login = (
  req: Request<{}, {}, LoginCredentials>,
  res: Response<ApiResponse<AuthorizedUser>>
): void => {
  const { login, password } = req.body;

  UserModel.findOne({
    where: { login },
  }).then((user) => {
    if (!user) return res.status(400).send({ error: "User not found" });

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid)
      return res.status(400).send({ error: "Invalid password" });

    if (!secretKey)
      return res
        .status(500)
        .send({ error: "Server doesn't provide access token" });

    const accessToken = jwt.sign({ id: user.id }, secretKey, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400,
    });

    res.status(200).send({
      payload: {
        login: user.login,
        email: user.email,
        accessToken,
      },
    });

    // const userData = { login: user.login, email: user.email };
    // res.cookie("token", accessToken, { httpOnly: true }).json(userData);
  });
};

export const authController = { register, login };
