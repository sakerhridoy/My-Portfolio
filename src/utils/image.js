/**
 * Optimize Cloudinary URLs to automatically serve optimal formats (WebP/AVIF) and compression (f_auto,q_auto).
 */
export function optimizeImageUrl(url) {
  if (!url || typeof url !== 'string') return url;
  if (url.includes('res.cloudinary.com') && url.includes('/upload/') && !url.includes('f_auto')) {
    return url.replace('/upload/', '/upload/f_auto,q_auto/');
  }
  return url;
}
