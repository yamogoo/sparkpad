/// <reference types="vite/client" />

interface ImportMetaEnv {
  /* * * Package.json * * */

  readonly APP_VERSION: string;
  readonly APP_AUTHOR: string;
  readonly APP_NAME: string;
  readonly APP_DESCRIPTION: string;

  /* * * Env * * */

  readonly VITE_PORT: string;
  readonly VITE_SERVER_HOST: string;
  readonly VITE_SERVER_PORT: string;
  readonly VITE_SERVER_API_VERSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
