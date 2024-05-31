declare global {
  namespace NodeJS {
    interface ProcessEnv extends IProcessEnv {}
  }
}

interface IProcessEnv {
  readonly [key: string]: string | undefined;
  readonly HOST: string | undefined;
  readonly PORT: string | undefined;
  readonly DB_HOST: string | undefined;
  readonly DB_PORT: string | undefined;
  readonly DB_PASSWORD: string | undefined;
  readonly DB_NAME: string | undefined;
  readonly JWT_SECRET: string | undefined;
}
