import express from "express";

const router = express.Router();

router.get("/", (req, res, next) => {
  res.send(200).send({ message: "ok" });
});

export default router;
