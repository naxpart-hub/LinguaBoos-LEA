// Résout les chemins d'assets du dossier public/ en respectant la base Vite.
// Indispensable pour GitHub Pages où l'app vit sous /LinguaBoos-LEA/ :
// asset('/boss_time.png') → '/LinguaBoos-LEA/boss_time.png' (et '/boss_time.png' en local).
export const asset = (path: string): string => {
  if (!path || path.startsWith('data:') || path.startsWith('http')) return path;
  const base: string = (import.meta as any).env?.BASE_URL ?? '/';
  if (base === '/' || path.startsWith(base)) return path;
  return base.replace(/\/$/, '') + (path.startsWith('/') ? path : `/${path}`);
};
