import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../admin/auth/useAuth';
import { useSite } from '../site/SiteContext';

function applyFavicon(url) {
  if (!url) return;
  const existingLinks = document.querySelectorAll("link[rel*='icon']");
  if (existingLinks.length > 0) {
    existingLinks.forEach((link) => {
      link.href = url;
    });
  } else {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = url;
    document.head.appendChild(link);
  }
}

/**
 * Keeps the browser tab title and favicon in sync with the user profile & settings.
 * Dynamically switches title (e.g. "Sumaiya Tazeen - Graphic & UI/UX Designer"),
 * favicon, and logo when navigating between profiles.
 */
const DocumentMeta = () => {
  const { user } = useAuth();
  const { identity, userProfile } = useSite();
  const { pathname } = useLocation();

  useEffect(() => {
    const isAdmin = pathname.includes('/admin');
    if (isAdmin) {
      document.title = user?.name ? `${user.name} • Control Panel` : 'Control Panel';
    } else {
      const pageTitle =
        userProfile?.siteTitle ||
        identity.tabTitle ||
        (userProfile?.name && userProfile?.profession
          ? `${userProfile.name} - ${userProfile.profession}`
          : userProfile?.name || 'Portfolio');
      document.title = pageTitle;
    }

    const faviconUrl = userProfile?.siteFavicon || identity.favicon;
    if (faviconUrl) {
      applyFavicon(faviconUrl);
    }
  }, [user, identity, userProfile, pathname]);

  return null;
};

export default DocumentMeta;
