/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly APP_VERSION: string;
  readonly APP_AUTHOR: string;
  readonly APP_NAME: string;
  readonly APP_DESCRIPTION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
