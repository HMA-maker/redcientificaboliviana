export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

/**
 * Returns the proper absolute path for static assets, taking into account
 * GitHub Pages base path or custom domains.
 */
export function getAssetPath(url?: string | null): string {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  const cleanUrl = url.startsWith('/') ? url : `/${url}`;
  if (BASE_PATH && (cleanUrl === BASE_PATH || cleanUrl.startsWith(`${BASE_PATH}/`))) {
    return cleanUrl;
  }
  return `${BASE_PATH}${cleanUrl}`;
}
