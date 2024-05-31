import express from "express";
import cors from "cors";

// Routes
import indexRouter from "@/routes/auth";
import authRouter from "@/routes/auth";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.setupRouter();
  }

  private async config() {
    this.app.use(cors);
  }

  private setupRouter() {
    this.app.use("/", indexRouter);
    this.app.use("/auth/", authRouter);
  }
}

export default new App().app;
