import express from "express";

const router = express.Router();

router.get("/", (req, res, next) => {
  res.send(200).send({ error: 0 });
});

export default router;
