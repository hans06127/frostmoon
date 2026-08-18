/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ARCHIVE_ACCESS_CODE_HASH?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
