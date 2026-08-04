// Un nom d'image préfixé par "wp:" désigne un fichier hébergé localement sur
// fr.wikipedia.org plutôt que sur Wikimedia Commons (rare, cas des fichiers non partagés).
function resolveImageRef(ref: string): { host: string; fileName: string } {
  if (ref.startsWith('wp:')) return { host: 'fr.wikipedia.org', fileName: ref.slice(3) }
  return { host: 'commons.wikimedia.org', fileName: ref }
}

export function commonsFilePath(ref: string, width = 480): string {
  const { host, fileName } = resolveImageRef(ref)
  return `https://${host}/wiki/Special:FilePath/${encodeURIComponent(fileName)}?width=${width}`
}

export function commonsFilePage(ref: string): string {
  const { host, fileName } = resolveImageRef(ref)
  return `https://${host}/wiki/File:${encodeURIComponent(fileName)}`
}
