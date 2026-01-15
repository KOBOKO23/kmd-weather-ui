/// <reference types="vite/client" />

// Optional: You can declare your own env variables for stricter typing
interface ImportMetaEnv {
  readonly VITE_API_KEY: string;        // replace/add your env variables here
  readonly VITE_API_URL?: string;       // example of an optional variable
  // add more VITE_ variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
