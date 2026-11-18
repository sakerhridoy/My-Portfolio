const SAKER_DEFAULTS = {
  heroTitle: 'Saker Ahmed Hridoy',
  heroSubtitle: 'Full-Stack Web Developer',
  siteName: 'SakerHridoy',
  tabTitle: 'SakerHridoy - webDeveloper',
};

const SAKER = {
  ...SAKER_DEFAULTS,
  roleLabel: 'Frontend Developer',
  aboutBody:
    'crafting modern, clean & visually immersive digital experiences. I love animation-rich interfaces, smooth UX, and premium dark UI.',
  aboutExtra:
    'My goal is to master full-stack development, AI-integrated web apps, and build real-world scalable solutions. I always push my limits to produce visually stunning and functional products.',
  githubUser: 'sakerhridoy',
  useBundledContent: true,
  stats: [
    { count: '1+', title: 'Years Experience' },
    { count: '20+', title: 'Projects' },
    { count: '2+', title: 'Clients' },
  ],
  socials: {
    facebook: 'https://www.facebook.com/sakerhridoy/',
    github: 'https://github.com/sakerhridoy',
    linkedin: 'https://www.linkedin.com/in/sakerhridoy/',
    instagram: 'https://www.instagram.com/imsakerhridoy/',
    twitter: 'https://x.com/imsakerhridoy',
  },
  services: null,
};

const SUMAIYA = {
  heroTitle: 'Sumaiya Tazeen',
  heroSubtitle:
    'Graphic & UI/UX Designer. I shape brands, interfaces, and visuals that feel clear and memorable.',
  siteName: 'SumaiyaTazeen',
  tabTitle: 'SumaiyaTazeen - graphic&ui/ux designer',
  roleLabel: 'Graphic & UI/UX Designer',
  aboutBody:
    'designing interfaces and brand visuals with a focus on layout, type, color, and how people actually move through a screen.',
  aboutExtra:
    'I work across UI, UX, and graphic design — from first sketches to polished screens that feel intentional and easy to use.',
  githubUser: '',
  useBundledContent: false,
  stats: [
    { count: 'UI', title: 'Interface Design' },
    { count: 'UX', title: 'User Experience' },
    { count: 'Brand', title: 'Visual Identity' },
  ],
  socials: {},
  services: [
    {
      title: 'UI Design',
      desc: 'Screens, components, and layouts that stay clear on every device.',
    },
    {
      title: 'UX Design',
      desc: 'Flows and structure shaped around how people actually use a product.',
    },
    {
      title: 'Graphic Design',
      desc: 'Brand marks, social visuals, and campaign graphics with a consistent look.',
    },
    {
      title: 'Design Systems',
      desc: 'Type, color, and spacing rules so a product feels like one brand.',
    },
  ],
};

function presetFor(slug, ownerName) {
  if (!slug || slug === 'saker') return SAKER;
  if (slug === 'sumaiya') return SUMAIYA;
  const name = ownerName || slug;
  return {
    heroTitle: name,
    heroSubtitle: '',
    siteName: name,
    tabTitle: name,
    roleLabel: '',
    aboutBody: '',
    aboutExtra: '',
    githubUser: '',
    useBundledContent: false,
    stats: [],
    socials: {},
    services: [],
  };
}

function isSakerDefault(value, key) {
  return Boolean(value) && value === SAKER_DEFAULTS[key];
}

function pick(slug, settingsValue, presetValue, key) {
  const value = String(settingsValue || '').trim();
  if (!value) return presetValue || '';
  if (slug && slug !== 'saker' && isSakerDefault(value, key)) return presetValue || '';
  return value;
}

export function githubUserFrom(value) {
  const raw = String(value || '').trim();
  if (!raw) return '';
  const match = raw.match(/github\.com\/([^/?#]+)/i);
  if (match) return match[1];
  if (/^[A-Za-z0-9-]+$/.test(raw)) return raw;
  return '';
}

export function buildIdentity({ slug, settings, ownerName, userProfile }) {
  const preset = presetFor(slug, ownerName);
  const socials = {};
  for (const key of ['facebook', 'github', 'linkedin', 'instagram', 'twitter']) {
    const fromSettings = String(settings?.socials?.[key] || '').trim();
    socials[key] = fromSettings || preset.socials[key] || '';
  }

  const heroTitle = userProfile?.name || pick(slug, settings?.heroTitle, preset.heroTitle, 'heroTitle');
  const siteName = userProfile?.siteTitle || settings?.siteTitle || pick(slug, settings?.siteName, preset.siteName, 'siteName');
  const roleLabel = userProfile?.profession || settings?.profession || preset.roleLabel;
  const heroSubtitle = userProfile?.profession || settings?.profession || pick(slug, settings?.heroSubtitle, preset.heroSubtitle, 'heroSubtitle');
  const defaultTab = userProfile?.name
    ? (userProfile.profession ? `${userProfile.name} - ${userProfile.profession}` : userProfile.name)
    : (slug === 'sumaiya' ? 'Sumaiya Tazeen - Graphic & UI/UX Designer' : preset.tabTitle);
  const tabTitle = userProfile?.siteTitle || settings?.siteTitle || defaultTab;
  const favicon = userProfile?.siteFavicon || settings?.favicon?.url || '';
  const logoUrl = userProfile?.logoUrl || settings?.logo?.url || settings?.logoUrl || '';

  return {
    slug,
    heroTitle,
    heroSubtitle,
    aboutShort: String(settings?.aboutShort || '').trim(),
    contactSubtitle: String(settings?.contactSubtitle || '').trim(),
    roleLabel,
    aboutBody: preset.aboutBody,
    aboutExtra: preset.aboutExtra,
    siteName,
    tabTitle,
    footerText:
      String(settings?.footerText || '').trim() ||
      `© ${new Date().getFullYear()} ${heroTitle || siteName}. All Rights Reserved.`,
    email: userProfile?.email || settings?.email || '',
    phone: settings?.phone || '',
    resumeUrl: settings?.resumeUrl || '',
    aboutCards: settings?.aboutCards || [],

    socialLinks: settings?.socialLinks || [],
    profileImage: settings?.profileImage?.url || '',
    favicon,
    logoUrl,
    profession: userProfile?.profession || '',
    socials,
    githubUser: githubUserFrom(socials.github) || preset.githubUser || '',
    useBundledContent: preset.useBundledContent,
    stats: preset.stats,
    services: preset.services,
  };
}
