const defaultAccessCodeHash =
  '7ef16ae30eed110d4ea5917ee69d4f72bb058269630b31792761154db2712e1d'

export const archiveAccessCodeHash = (
  import.meta.env.VITE_ARCHIVE_ACCESS_CODE_HASH || defaultAccessCodeHash
).trim().toLowerCase()
