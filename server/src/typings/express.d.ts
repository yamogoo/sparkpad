// declare module "express-serve-static-core" {

// }

declare interface Request {
  headers: {
    "x-access-token"?: string;
  };
}
