import express, { Request } from "express";

const router = express.Router();

router.get("/", (_req: Request, res) => {
  res.send(200).send({ message: "ok" });
});

export default router;
