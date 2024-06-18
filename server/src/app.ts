import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";

// Routes
import indexRouter from "@/routes/index";
import authRouter from "@/routes/auth";
import noteRouter from "@/routes/notes";

import { db } from "./models";

import { useLogger } from "@/middleware/useLogger";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.setupRouter();
  }

  private async config() {
    this.app.use(
      cors({
        origin: "*",
      })
    );
    this.app.use(useLogger);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(compression());
    this.app.use(cookieParser());

    await db.init();
  }

  private setupRouter() {
    this.app.use("/v1", indexRouter);
    this.app.use("/v1/auth", authRouter);
    this.app.use("/v1/groups", noteRouter);
  }
}

export default new App().app;
