import { BsTwitterX, BsDribbble, BsBehance, BsWhatsapp } from 'react-icons/bs';
import { FiFacebook, FiGithub, FiInstagram, FiExternalLink } from 'react-icons/fi';
import { SlSocialLinkedin } from 'react-icons/sl';

const ICONS = [
  { key: 'facebook', Icon: FiFacebook },
  { key: 'github', Icon: FiGithub },
  { key: 'linkedin', Icon: SlSocialLinkedin },
  { key: 'instagram', Icon: FiInstagram },
  { key: 'twitter', Icon: BsTwitterX },
  { key: 'dribbble', Icon: BsDribbble },
  { key: 'behance', Icon: BsBehance },
  { key: 'whatsapp', Icon: BsWhatsapp },
];

const SocialLinks = ({ socials = {}, socialLinks = [], className = '' }) => {
  const normalizedSocials = typeof socials === 'object' && socials !== null ? socials : {};
  const normalizedLinks = Array.isArray(socialLinks) ? socialLinks : [];

  const links = ICONS.filter((item) => normalizedSocials[item.key]);
  
  return (
    <div className={className}>
      {links.map(({ key, Icon }) => {
        const url = normalizedSocials[key];
        const href = typeof url === 'string' && (url.startsWith('http') ? url : `https://${url}`);
        if (!href) return null;
        return (
          <a
            key={key}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-cyan-400 flex items-center justify-center transition"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={key}
          >
            <Icon size={20} />
          </a>
        );
      })}
      {normalizedLinks.filter(s => s?.url).map((item, idx) => {
        const href = typeof item.url === 'string' && (item.url.startsWith('http') ? item.url : `https://${item.url}`);
        if (!href) return null;
        return (
          <a
            key={idx}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-cyan-400 flex items-center justify-center transition"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title={item.label}
          >
            {item.icon ? (
              <img src={typeof item.icon === 'string' ? item.icon : item.icon.url} alt={item.label} className="w-5 h-5 object-contain" />
            ) : (
              <FiExternalLink size={20} />
            )}
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
