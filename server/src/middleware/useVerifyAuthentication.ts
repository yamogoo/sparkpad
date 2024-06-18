import authConfig from "@/config/authConfig";
import { ApiResponse, AuthBody, isAuthToken } from "@/typings";

import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

const { secretKey } = authConfig;

const useVerifyAuthentication = async (
  req: Request,
  res: Response<ApiResponse<AuthBody>>,
  next: NextFunction
) => {
  const token = req.headers["x-access-token"];

  if (!isAuthToken(token))
    return res.status(400).send({
      error: "Invalid token",
    });

  if (!secretKey) {
    return res.status(500).send({
      error: "Server Error. Server has empty secret token",
    });
  }

  const decoded = jwt.verify(token, secretKey);

  if (!(typeof decoded === "object" && "id" in decoded))
    return res.status(401).send({ error: "Unauthorized" });

  const { id } = decoded;

  if (id) {
    req.body.userId = id;
    next();
  } else {
    return res.status(500).send({
      error: "Server Error. Invalid token data",
    });
  }
};

export const auth = {
  useVerifyAuthentication,
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
