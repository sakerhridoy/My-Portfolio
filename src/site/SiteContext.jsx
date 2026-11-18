import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api, { getTenantSlugFromPath } from '../admin/api';
import { buildIdentity } from './identity';

const SiteContext = createContext(null);

export function SiteProvider({ children }) {
  const { pathname } = useLocation();
  const slug = getTenantSlugFromPath(pathname);
  const [settings, setSettings] = useState(null);
  const [ownerName, setOwnerName] = useState('');
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    let active = true;
    setSettings(null);
    setOwnerName('');
    setUserProfile(null);

    api.settings
      .get()
      .then(data => {
        if (active) setSettings(data || null);
      })
      .catch(() => {
        if (active) setSettings(null);
      });

    const targetUser = slug || 'saker';
    api.users
      .getProfile(targetUser)
      .then(data => {
        if (!active) return;
        const profile = data?.user || data?.profile || data;
        setUserProfile(profile);
        if (profile?.name) setOwnerName(profile.name);
      })
      .catch(() => {
        if (slug) {
          api.auth
            .getPortfolio(slug)
            .then(data => {
              if (active) setOwnerName(data?.name || '');
            })
            .catch(() => {
              if (active) setOwnerName('');
            });
        }
      });

    return () => {
      active = false;
    };
  }, [slug]);

  const [themeMode, setThemeMode] = useState(() => localStorage.getItem(`portfolio-theme-mode-${slug || 'default'}`) || 'dark');

  useEffect(() => {
    if (settings?.themeMode) setThemeMode(settings.themeMode);
  }, [settings?.themeMode]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-mode', themeMode);
    localStorage.setItem(`portfolio-theme-mode-${slug || 'default'}`, themeMode);
  }, [themeMode, slug]);

  const toggleThemeMode = () => setThemeMode(prev => (prev === 'dark' ? 'light' : 'dark'));

  const applyTheme = (theme, mode) => {
    const root = document.documentElement;
    const isLight = mode === 'light';
    const presets = {
      cyan: {
        '--bg-main': isLight ? '#F8FAFC' : '#030712',
        '--bg-surface': isLight ? 'rgba(255, 255, 255, 0.85)' : 'rgba(13, 19, 36, 0.78)',
        '--border-glass': isLight ? 'rgba(15, 23, 42, 0.1)' : 'rgba(56, 189, 248, 0.22)',
        '--text-heading': isLight ? '#0F172A' : '#F8FAFC',
        '--text-body': isLight ? '#334155' : '#CBD5E1',
        '--text-muted': isLight ? '#475569' : '#94A3B8',
        '--accent-primary': isLight ? '#0284C7' : '#22D3EE',
        '--accent-secondary': isLight ? '#2563EB' : '#3B82F6',
        '--accent-glow': isLight ? 'rgba(2, 132, 199, 0.15)' : 'rgba(34, 211, 238, 0.25)',
      },
      violet: {
        '--bg-main': isLight ? '#F8FAFC' : '#090514',
        '--bg-surface': isLight ? 'rgba(255, 255, 255, 0.85)' : 'rgba(25, 18, 40, 0.85)',
        '--border-glass': isLight ? 'rgba(15, 23, 42, 0.1)' : 'rgba(232, 121, 249, 0.22)',
        '--text-heading': isLight ? '#1E1B4B' : '#FFFFFF',
        '--text-body': isLight ? '#312E81' : '#E2E8F0',
        '--text-muted': isLight ? '#4338CA' : '#A5B4FC',
        '--accent-primary': isLight ? '#7C3AED' : '#E879F9',
        '--accent-secondary': isLight ? '#6D28D9' : '#8B5CF6',
        '--accent-glow': isLight ? 'rgba(124, 58, 237, 0.15)' : 'rgba(232, 121, 249, 0.25)',
      },
      gold: {
        '--bg-main': isLight ? '#F8FAFC' : '#0A0A0C',
        '--bg-surface': isLight ? 'rgba(255, 255, 255, 0.85)' : 'rgba(24, 24, 27, 0.85)',
        '--border-glass': isLight ? 'rgba(15, 23, 42, 0.1)' : 'rgba(250, 204, 21, 0.22)',
        '--text-heading': '#000000',
        '--text-body': '#1F2937',
        '--text-muted': '#374151',
        '--accent-primary': isLight ? '#D97706' : '#FACC15',
        '--accent-secondary': isLight ? '#B45309' : '#F59E0B',
        '--accent-glow': isLight ? 'rgba(217, 119, 6, 0.15)' : 'rgba(250, 204, 21, 0.25)',
      },
    };

    const colors = presets[theme] || presets.cyan;
    Object.entries(colors).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
    root.setAttribute('data-theme', theme);
  };

  useEffect(() => {
    const theme = settings?.themePreset || 'cyan';
    const mode = themeMode;
    applyTheme(theme, mode);
  }, [settings?.themePreset, themeMode]);

  // Dynamic Browser Tab Title & Favicon per tenant
  useEffect(() => {
    if (pathname.startsWith('/admin')) {
      const adminOwner = userProfile?.name || ownerName || 'Portfolio';
      document.title = `${adminOwner} • Control Panel`;
      return;
    }

    const name =
      settings?.tabTitle ||
      settings?.siteTitle ||
      userProfile?.name ||
      ownerName ||
      'Creative Portfolio';

    const role =
      settings?.profession ||
      settings?.heroSubtitle ||
      userProfile?.profession ||
      '';

    document.title =
      settings?.tabTitle ||
      settings?.siteTitle ||
      (role ? `${name} | ${role}` : name);

    const faviconUrl = settings?.favicon?.url;
    if (faviconUrl) {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = faviconUrl;
    }
  }, [
    pathname,
    settings?.tabTitle,
    settings?.siteTitle,
    settings?.profession,
    settings?.heroSubtitle,
    settings?.favicon?.url,
    userProfile?.name,
    userProfile?.profession,
    ownerName,
  ]);

  const identity = useMemo(
    () => buildIdentity({ slug, settings, ownerName, userProfile }),
    [slug, settings, ownerName, userProfile],
  );

  const value = useMemo(
    () => ({
      slug,
      username: slug,
      settings,
      identity,
      userProfile,
      profileData: userProfile,
      themeMode,
      toggleThemeMode,
      setThemeMode,
    }),
    [slug, settings, identity, userProfile, themeMode],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const value = useContext(SiteContext);
  if (!value) {
    throw new Error('useSite must be used inside SiteProvider');
  }
  return value;
}