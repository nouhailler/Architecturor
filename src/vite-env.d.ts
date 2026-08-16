/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

declare module '*.module.css' {
  const classes: Record<string, string>
  export default classes
}

/** Identifiant du build (hash de commit court, ou 'dev'), injecté par vite.config.ts. */
declare const __BUILD_ID__: string
/** Date ISO du build, injectée par vite.config.ts. */
declare const __BUILD_TIME__: string
