import { Request, Response } from "express";
import { v4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import config from "@/config/authConfig";

import { db } from "@/models";
import { Op } from "sequelize";

import { RegisterCredentialsRequest } from "@/typings";

const User = db.models.User;
const Role = db.models.Role;

const { secretKey } = config;

const register = (
  req: Request<any, any, RegisterCredentialsRequest>,
  res: Response
): void => {
  const { login, email, password, roles } = req.body;

  User.create({
    id: v4(),
    login,
    email,
    password: bcrypt.hashSync(password, 8),
  })
    .then((user) => {
      if (roles.length > 0) {
        Role.findAll({
          where: { name: { [Op.or]: roles } },
        }).then((_roles) => {
          res.status(200).send({
            user: {
              login: user.login,
              email: user.email,
            },
          });
        });
      } else {
        res.status(400).send({ message: "User roles not been provided" });
      }
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
};

const login = (req: Request, res: Response): void => {
  const { login, password } = req.body;

  User.findOne({
    where: { login },
  }).then((user) => {
    if (!user) return res.status(400).send({ message: "User not found" });

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid)
      return res.status(400).send({ message: "Invalid password" });

    if (!secretKey)
      return res
        .status(500)
        .send({ message: "Server doesn't provide access token" });

    const accessToken = jwt.sign({ id: user.id }, secretKey, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400,
    });

    // const userData = { login: user.login, email: user.email };
    // res.cookie("token", accessToken, { httpOnly: true }).json(userData);

    res.status(200).send({
      user: {
        login: user.login,
        email: user.email,
        accessToken,
      },
    });
  });
};

export const authController = { register, login };
