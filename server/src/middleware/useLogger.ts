import { Request, Response, NextFunction } from "express";

import { logger } from "@/utils/logger";

export const useLogger = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const { path } = req;
  logger.http("request", { path });
  next();
};
