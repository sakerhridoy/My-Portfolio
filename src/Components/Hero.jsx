import React, { useState } from 'react';
import useGithubData from './UseGithubData';
import HeroBackground from './HeroBackground';
import PremiumSmall3D from './PremiumSmall3D';
import GlowBall from './GlowBall';
import { motion } from 'framer-motion';
import TechLogo3D from './TechLogo3D';
import profilePic from '../assets/profile.png';
import { useSite } from '../site/SiteContext';
import SocialLinks from './SocialLinks';
import { FaRocket, FaCode } from 'react-icons/fa6';
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiRedux,
  SiHtml5,
  SiCss3,
} from 'react-icons/si';

const TypingText = ({ text, speed = 45 }) => {
  const [displayedText, setDisplayedText] = React.useState('');
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    setDisplayedText('');
    setIndex(0);
  }, [text]);

  React.useEffect(() => {
    if (!text) return;
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[index]);
        setIndex(index + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

  return (
    <span className="whitespace-pre-line">
      {displayedText}
      <span className="inline-block w-0.5 h-5 bg-cyan-400 ml-1 animate-pulse align-middle" />
    </span>
  );
};

const ADOBE_SVG =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'><path d='M13.966 22.624l-1.69-4.281H8.122l3.892-9.144 5.662 13.425zM8.884 1.376H0v21.248zm15.116 0h-8.884L24 22.624z'/></svg>";

const Hero = () => {
  const { identity, userProfile, profileData, settings } = useSite();
  const activeProfile = profileData || userProfile;
  const { profile, loading } = useGithubData(identity.githubUser);

  const [avatarTilt, setAvatarTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });

  const heroName =
    activeProfile?.name || identity.heroTitle || 'Creative Developer';
  const heroProfession =
    activeProfile?.profession ||
    identity.heroSubtitle ||
    identity.roleLabel ||
    'Full-Stack Developer';

  const photo =
    settings?.profileImage?.url ||
    profile?.avatar?.url ||
    activeProfile?.profileImage?.url ||
    activeProfile?.logoUrl ||
    identity.profileImage ||
    (identity.useBundledContent ? profilePic : '');

  const isSumaiya =
    window.location.pathname.toLowerCase().includes('sumaiya') ||
    profileData?.slug?.toLowerCase() === 'sumaiya';

  const savedBubbles =
    settings?.bubbleIcons?.filter(b => b?.url) ||
    activeProfile?.bubbleIcons?.filter(b => b?.url) ||
    identity?.bubbleIcons?.filter(b => b?.url) ||
    [];

  const bubbleIcons =
    savedBubbles.length > 0
      ? savedBubbles
      : isSumaiya
        ? [
            { url: 'https://cdn.simpleicons.org/figma/white' },
            { url: ADOBE_SVG },
            { url: 'https://cdn.simpleicons.org/blender/white' },
          ]
        : [
            { url: 'https://cdn.simpleicons.org/react/cyan' },
            { url: 'https://cdn.simpleicons.org/nodedotjs/green' },
            { url: 'https://cdn.simpleicons.org/html5/orange' },
            { url: 'https://cdn.simpleicons.org/javascript/yellow' },
          ];

  const isDeveloper =
    !activeProfile?.profession?.toLowerCase().includes('designer') &&
    !identity.roleLabel?.toLowerCase().includes('designer');

  const handleSectionMouseMove = e => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlight({ x, y });
  };

  const handleAvatarMove = e => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setAvatarTilt({ rotateX: -y * 18, rotateY: x * 18 });
  };

  return (
    <section
      id="home"
      onMouseMove={handleSectionMouseMove}
      className="relative w-full min-h-screen pt-24 md:pt-28 bg-linear-to-br from-[#01040d] via-[#071329] to-[#020817] overflow-hidden"
    >
      {/* Interactive Cursor Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(650px circle at ${spotlight.x}% ${spotlight.y}%, rgba(34, 211, 238, 0.13), transparent 70%)`,
        }}
      />

      {/* 3D Perspective Floor Grid */}
      <div
        className="absolute inset-x-0 bottom-0 h-72 opacity-20 pointer-events-none z-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(56,189,248,0.28) 1px, transparent 1px), linear-gradient(to bottom, rgba(56,189,248,0.28) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
          transform: 'perspective(500px) rotateX(65deg) scale(1.6)',
          transformOrigin: 'center bottom',
        }}
      />

      {/* Three.js 3D Particle & Bloom Field */}
      <HeroBackground />

      {/* 3D Ambient Glow Balls & Floating Shapes */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <GlowBall size="340px" color="cyan" top="8%" left="68%" />
        <GlowBall size="280px" color="purple" top="48%" left="15%" />
        <GlowBall size="220px" color="blue" top="75%" left="55%" />

        <PremiumSmall3D
          size="140px"
          opacity={0.35}
          initialX="8%"
          initialY="20%"
          floatDelay="0s"
        />
        <PremiumSmall3D
          size="110px"
          opacity={0.3}
          initialX="32%"
          initialY="64%"
          floatDelay="1s"
        />
        <PremiumSmall3D
          size="160px"
          opacity={0.4}
          initialX="74%"
          initialY="38%"
          floatDelay="0.5s"
        />
      </div>

      {/* Floating 3D Tech Bubble Icons */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        {bubbleIcons.length > 0 ? (
          bubbleIcons.map((item, index) => (
            <TechLogo3D
              key={index}
              icon={
                <img
                  src={item.url}
                  alt={`bubble-${index}`}
                  onError={e => {
                    e.currentTarget.style.display = 'none';
                  }}
                  className="w-full h-full object-contain"
                />
              }
              size="58px"
              opacity={0.65}
              initialX={`${10 + ((index * 18) % 80)}%`}
              initialY={`${15 + ((index * 15) % 70)}%`}
              floatDelay={`${index * 1.2}s`}
              animationDuration={`${4 + (index % 4) * 2}s`}
            />
          ))
        ) : isDeveloper ? (
          <>
            <TechLogo3D
              icon={<SiReact />}
              size="58px"
              opacity={0.65}
              initialX="10%"
              initialY="20%"
              floatDelay="0s"
              animationDuration="4s"
            />
            <TechLogo3D
              icon={<SiNextdotjs />}
              size="58px"
              opacity={0.65}
              initialX="85%"
              initialY="15%"
              floatDelay="1.2s"
              animationDuration="6s"
            />
            <TechLogo3D
              icon={<SiTailwindcss />}
              size="58px"
              opacity={0.65}
              initialX="15%"
              initialY="70%"
              floatDelay="2.5s"
              animationDuration="8s"
            />
            <TechLogo3D
              icon={<SiRedux />}
              size="58px"
              opacity={0.65}
              initialX="70%"
              initialY="80%"
              floatDelay="0.8s"
              animationDuration="7s"
            />
            <TechLogo3D
              icon={<SiHtml5 />}
              size="58px"
              opacity={0.65}
              initialX="40%"
              initialY="10%"
              floatDelay="0.4s"
              animationDuration="5s"
            />
            <TechLogo3D
              icon={<SiCss3 />}
              size="58px"
              opacity={0.65}
              initialX="50%"
              initialY="60%"
              floatDelay="1.8s"
              animationDuration="6.5s"
            />
          </>
        ) : null}
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-6 lg:px-12 py-12 md:py-20 md:pt-24 min-h-[calc(100vh-7rem)] flex items-center relative z-20">
        <div className="grid md:grid-cols-2 items-center w-full gap-12 md:gap-8 lg:gap-12">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="text-white space-y-6 z-20 order-2 md:order-1 text-center md:text-left"
          >
            {/* Name Heading with 3D Layered Gradient */}
            <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-7xl font-extrabold leading-[1.12] tracking-tight">
              <span className="block text-gray-200 text-2xl sm:text-3xl lg:text-4xl font-semibold mb-1">
                Hi, I'm
              </span>
              <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-300 via-sky-400 to-purple-500 drop-shadow-[0_6px_28px_rgba(34,211,238,0.28)]">
                {heroName}
              </span>
            </h1>

            {/* Typing Subtitle */}
            <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-lg mx-auto md:mx-0 min-h-[56px] leading-relaxed">
              <TypingText text={heroProfession} speed={40} />
            </p>

            {/* Glassmorphic GitHub Metrics Bar */}
            {!loading && profile && identity.githubUser && (
              <div className="inline-flex flex-wrap justify-center md:justify-start gap-3 sm:gap-5 px-5 py-3 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.4)] text-xs sm:text-sm">
                <p className="text-gray-300">
                  <span className="text-cyan-400 font-extrabold text-base">
                    {profile.followers}
                  </span>{' '}
                  Followers
                </p>
                <span className="text-white/15">|</span>
                <p className="text-gray-300">
                  <span className="text-cyan-400 font-extrabold text-base">
                    {profile.following}
                  </span>{' '}
                  Following
                </p>
                <span className="text-white/15">|</span>
                <p className="text-gray-300">
                  <span className="text-cyan-400 font-extrabold text-base">
                    {profile.public_repos}
                  </span>{' '}
                  Repositories
                </p>
              </div>
            )}

            {/* Dynamic Identity Stat Pills */}
            {Array.isArray(identity?.stats) && identity.stats.length > 0 && (
              <div className="flex flex-wrap justify-center md:justify-start gap-2.5">
                {identity.stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-1.5 bg-linear-to-r from-cyan-500/15 to-blue-600/15 backdrop-blur-md border border-cyan-400/30 rounded-full text-cyan-300 text-xs sm:text-sm font-semibold shadow-[0_0_18px_rgba(34,211,238,0.14)]"
                  >
                    {stat.count} {stat.title}
                  </div>
                ))}
              </div>
            )}

            {/* 3D Depth CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 pt-2">
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                href="#contact"
                className="px-8 py-3.5 bg-linear-to-r from-cyan-400 via-sky-500 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 rounded-xl font-extrabold shadow-[0_12px_35px_rgba(34,211,238,0.38)] transition flex items-center justify-center gap-2"
              >
                <FaRocket className="text-sm" /> Hire Me
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                href="#projects"
                className="px-8 py-3.5 border border-cyan-400/45 bg-white/[0.04] backdrop-blur-xl hover:bg-cyan-500/15 hover:border-cyan-400 rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-[0_8px_25px_rgba(0,0,0,0.4)]"
              >
                <FaCode className="text-cyan-400" /> Explore Projects
              </motion.a>
            </div>

            <SocialLinks
              socials={identity.socials}
              socialLinks={identity.socialLinks}
              className="flex items-center justify-center md:justify-start gap-6 pt-3 text-2xl"
            />
          </motion.div>

          {/* Right Column: Ultra-Premium 3D Gyroscope Portal + Available Status Pill */}
          <div
            style={{ perspective: 1300 }}
            className="order-1 md:order-2 relative flex flex-col justify-center items-center md:items-end z-20 py-6 gap-7"
          >
            {/* Status Pill on Right Side Above Portrait */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cyan-500/10 backdrop-blur-xl border border-cyan-400/35 shadow-[0_0_25px_rgba(34,211,238,0.2)] md:mr-6 hero-badge"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-cyan-300">
                Available for Creative Projects
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotateX: avatarTilt.rotateX,
                rotateY: avatarTilt.rotateY,
              }}
              transition={{ type: 'spring', stiffness: 190, damping: 18 }}
              onMouseMove={handleAvatarMove}
              onMouseLeave={() => setAvatarTilt({ rotateX: 0, rotateY: 0 })}
              style={{ transformStyle: 'preserve-3d' }}
              className="relative flex items-center justify-center cursor-pointer"
            >
              {/* Outer 3D Gyroscope Ring 1 */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                className="absolute -inset-7 sm:-inset-9 rounded-full border border-dashed border-cyan-400/45 pointer-events-none"
              />

              {/* Middle 3D Gyroscope Ring 2 */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 28, ease: 'linear' }}
                className="absolute -inset-3.5 sm:-inset-4.5 rounded-full border-2 border-purple-500/35 border-t-cyan-400 border-b-blue-500 pointer-events-none"
              />

              {/* Intense Multi-Color 3D Aura */}
              <div className="absolute -inset-6 rounded-full bg-linear-to-tr from-cyan-500/35 via-blue-600/25 to-purple-600/35 blur-3xl pointer-events-none" />

              {/* Main 3D Beveled Profile Core */}
              <div
                style={{ transform: 'translateZ(20px)' }}
                className="
                  relative w-[240px] sm:w-[290px] md:w-[340px] lg:w-[410px]
                  aspect-square rounded-full
                  bg-linear-to-br from-cyan-400 via-blue-600 to-purple-700
                  p-1.5 shadow-[0_20px_60px_rgba(34,211,238,0.35)]
                "
              >
                <div
                  className="
                    w-full h-full rounded-full
                    bg-[#020617]/85 backdrop-blur-3xl
                    flex items-center justify-center
                    overflow-hidden relative
                  "
                >
                  {/* Glass Reflection Glare */}
                  <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/[0.06] to-white/20 pointer-events-none z-10 rounded-full" />

                  {photo ? (
                    <img
                      src={photo}
                      alt={heroName}
                      className="
                        w-[93%] h-[93%] object-cover
                        rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.75)]
                      "
                    />
                  ) : (
                    <span className="text-5xl sm:text-6xl font-extrabold text-cyan-300">
                      {(heroName || '?').slice(0, 1)}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full h-24 bg-linear-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;