import authConfig from "@/config/authConfig";
import { BadRequest } from "@/typings";
import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

const { secretKey } = authConfig;

const verifyAuthentication = async (
  req: any,
  res: Response<BadRequest | any>,
  next: NextFunction
) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided",
    });
  }

  if (!secretKey) {
    return res.status(500).send({
      message: "Server Error. Server has empty secret token",
    });
  }

  const decoded = jwt.verify(token, secretKey);

  if (!(typeof decoded === "object" && "id" in decoded))
    return res.send(401).send({ message: "Unauthorized" });

  const { id } = decoded;

  if (id) {
    req.body.userId = id;
    console.log("verify: ", id);
    next();
  }
};

export const auth = {
  verifyAuthentication,
};

// COOKIE:

// export const verifyAuthentication = async (
//   req: any,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { token = false } = req.cookies;

//     if (token) {
//       if (!secretKey)
//         return res
//           .status(500)
//           .send({ message: "Server Error. Server has empty secret token" });

//       const payload = jwt.verify(token, secretKey);

//       req.payload = payload;

//       next();
//     } else {
//       res.status(400).send("No token provided");
//     }
//   } catch (err) {
//     res.status(400).send("No token provided");
//   }
// };
