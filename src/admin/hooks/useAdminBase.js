import { useParams } from 'react-router-dom';

/**
 * Returns the dashboard base path for the current route.
 * Tenanted routes (`/:slug/admin/*`) keep the slug, the legacy `/admin/*`
 * tree falls back to the plain base.
 */
export function useAdminBase() {
  const { slug } = useParams();
  return slug ? `/${slug}/admin` : '/admin';
}

export default useAdminBase;
