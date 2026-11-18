import { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Plus, Trash2 } from 'lucide-react';
import api from '../api';
import MediaUploadField from '../components/MediaUploadField';

const inputClasses =
  'w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition';

const labelClasses = 'block text-sm font-medium text-gray-300 mb-2';

const emptyForm = {
  heroTitle: '',
  heroSubtitle: '',
  profession: '',
  siteTitle: '',
  aboutShort: '',
  contactSubtitle: '',
  aboutImage: { url: '', publicId: '' },
  email: '',
  phone: '',
  whatsapp: '',
  location: '',
  resumeUrl: '',
  profileImage: { url: '', publicId: '' },
  logo: { url: '', publicId: '' },
  logoUrl: '',
  siteName: '',
  footerText: '',
  seoTitle: '',
  seoDescription: '',
  tabTitle: '',
  favicon: { url: '', publicId: '' },
  socials: {
    github: '',
    linkedin: '',
    twitter: '',
    facebook: '',
    instagram: '',
  },
  socialLinks: [],
  ogImage: { url: '', publicId: '' },
  bubbleIcons: [],
  aboutCards: [],
  themePreset: 'cyan',
  themeMode: '',

};

const socialKeys = ['github', 'linkedin', 'twitter', 'facebook', 'instagram'];

const TextField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  textarea,
  rows = 4,
}) => (
  <div>
    <label className={labelClasses} htmlFor={name}>
      {label}
    </label>
    {textarea ? (
      <textarea
        id={name}
        rows={rows}
        value={value}
        onChange={e => onChange(name, e.target.value)}
        placeholder={placeholder}
        className={`${inputClasses} resize-none`}
      />
    ) : (
      <input
        id={name}
        value={value}
        onChange={e => onChange(name, e.target.value)}
        placeholder={placeholder}
        className={inputClasses}
      />
    )}
  </div>
);

const Section = ({
  title,
  onSave,
  saving,
  saveLabel = 'Save Section',
  children,
}) => (
  <div className="space-y-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8">
    <div className="flex items-center justify-between gap-4">
      <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-300">
        {title}
      </h3>
      {onSave && (
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="flex items-center gap-1.5 px-4 py-1.5 bg-cyan-400 text-black font-bold rounded-lg hover:bg-cyan-300 transition disabled:opacity-50 text-xs sm:text-sm"
        >
          {saving && <Loader2 className="animate-spin" size={14} />}
          {saving ? 'Saving...' : saveLabel}
        </button>
      )}
    </div>
    {children}
  </div>
);

const SettingsForm = () => {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [savingSection, setSavingSection] = useState(null);
  const [error, setError] = useState('');
  const [savedMessage, setSavedMessage] = useState('');

  const getUrl = val => (typeof val === 'string' ? val : val?.url || '');
  const getImage = val =>
    typeof val === 'object' && val !== null
      ? { url: val.url || '', publicId: val.publicId || '' }
      : { url: val || '', publicId: '' };

  useEffect(() => {
    let active = true;
    api.settings
      .get()
      .then(data => {
        if (!active || !data) return;
        setForm({
          heroTitle: data.heroTitle || '',
          heroSubtitle: data.heroSubtitle || '',
          profession: data.profession || data.heroSubtitle || '',
          siteTitle: data.siteTitle || data.tabTitle || data.siteName || '',
          aboutShort: data.aboutShort || '',
          contactSubtitle: data.contactSubtitle || '',
          aboutImage: getImage(data.aboutImage),
          email: data.email || '',
          phone: data.phone || '',
          whatsapp: data.whatsapp || '',
          location: data.location || '',
          resumeUrl: data.resumeUrl || '',
          aboutCards: Array.isArray(data.aboutCards) ? data.aboutCards : [],
          socialLinks: Array.isArray(data.socialLinks)
            ? data.socialLinks.map(link => ({
                label: link.label || '',
                url: link.url || '',
                icon: getImage(link.icon),
              }))
            : [],
          profileImage: getImage(data.profileImage),
          logo: getImage(data.logo),
          logoUrl: data.logoUrl || getUrl(data.logo),
          siteName: data.siteName || '',
          footerText: data.footerText || '',
          seoTitle: data.seoTitle || '',
          seoDescription: data.seoDescription || '',
          tabTitle: data.tabTitle || data.siteTitle || '',
          favicon: getImage(data.favicon),
          socials: {
            github: data.socials?.github || '',
            linkedin: data.socials?.linkedin || '',
            twitter: data.socials?.twitter || '',
            facebook: data.socials?.facebook || '',
            instagram: data.socials?.instagram || '',
          },
          ogImage: getImage(data.ogImage),
          bubbleIcons: Array.isArray(data.bubbleIcons)
            ? data.bubbleIcons.map(item => getImage(item))
            : [],
          themePreset: data.themePreset || 'cyan',
        });
      })
      .catch(err => {
        if (active) setError(err.message || 'Failed to load settings');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const saveSection = async (sectionKey, payload, label = 'Settings') => {
    setSavingSection(sectionKey);
    setSavedMessage('');
    setError('');
    try {
      await api.settings.update(payload);
      setSavedMessage(`${label} saved.`);
    } catch (err) {
      setError(err.message || 'Failed to save settings');
    } finally {
      setSavingSection(null);
    }
  };

  const setField = (name, value) =>
    setForm(prev => ({ ...prev, [name]: value }));

  const setSocial = (key, value) =>
    setForm(prev => ({ ...prev, socials: { ...prev.socials, [key]: value } }));

  const addSocialLink = () => {
    setForm(prev => ({
      ...prev,
      socialLinks: [
        ...(prev.socialLinks || []),
        { label: '', url: '', icon: { url: '', publicId: '' } },
      ],
    }));
  };

  const removeSocialLink = index => {
    setForm(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index),
    }));
  };

  const updateSocialLink = (index, field, value) => {
    setForm(prev => {
      const links = [...(prev.socialLinks || [])];
      links[index] = { ...links[index], [field]: value };
      return { ...prev, socialLinks: links };
    });
  };

  const submitAll = async event => {
    event.preventDefault();
    const payload = {
      heroTitle: form.heroTitle.trim(),
      heroSubtitle: (form.profession || form.heroSubtitle).trim(),
      profession: form.profession.trim(),
      siteTitle: form.siteTitle.trim(),
      aboutShort: form.aboutShort.trim(),
      contactSubtitle: form.contactSubtitle.trim(),
      aboutImage: getImage(form.aboutImage),
      profileImage: getImage(form.profileImage),
      logo: getImage(form.logo),
      logoUrl: form.logo?.url || form.logoUrl || '',
      favicon: getImage(form.favicon),
      email: form.email.trim(),
      phone: form.phone.trim(),
      whatsapp: form.whatsapp.trim(),
      location: form.location.trim(),
      resumeUrl: form.resumeUrl.trim(),
      siteName: (form.siteTitle || form.siteName).trim(),
      footerText: form.footerText.trim(),
      seoTitle: form.seoTitle.trim(),
      seoDescription: form.seoDescription.trim(),
      tabTitle: (form.siteTitle || form.tabTitle).trim(),
      socials: {
        github: form.socials.github.trim(),
        linkedin: form.socials.linkedin.trim(),
        twitter: form.socials.twitter.trim(),
        facebook: form.socials.facebook.trim(),
        instagram: form.socials.instagram.trim(),
      },
      socialLinks: Array.isArray(form.socialLinks)
        ? form.socialLinks.map(link => ({
            label: link.label || '',
            url: link.url || '',
            icon: getImage(link.icon),
          }))
        : [],
      ogImage: getImage(form.ogImage),
      bubbleIcons: Array.isArray(form.bubbleIcons)
        ? form.bubbleIcons.filter(item => item?.url).map(item => getImage(item))
        : [],
      aboutCards: Array.isArray(form.aboutCards)
        ? form.aboutCards.map(item => ({
            title: item.title?.trim() || '',
            subtitle: item.subtitle?.trim() || '',
          }))
        : [],
      themePreset: form.themePreset || 'cyan',
    };
    await saveSection('all', payload, 'All settings');
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto flex items-center justify-center py-24 text-gray-400">
        <Loader2 className="animate-spin mr-2" size={20} />
        Loading settings...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Site Settings
        </h2>
        <p className="text-gray-400 mt-1 text-sm">
          Manage each section independently without overwriting other settings.
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {savedMessage && (
        <div className="flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-300">
          <CheckCircle2 size={16} />
          {savedMessage}
        </div>
      )}

      <form onSubmit={submitAll} className="space-y-6">
        <Section
          title="Branding & Identity"
          saveLabel="Save Branding"
          onSave={() =>
            saveSection(
              'branding',
              {
                profession: form.profession.trim(),
                siteTitle: form.siteTitle.trim(),
                logo: getImage(form.logo),
                logoUrl: form.logo?.url || form.logoUrl || '',
                favicon: getImage(form.favicon),
                siteName: (form.siteTitle || form.siteName).trim(),
                tabTitle: (form.siteTitle || form.tabTitle).trim(),
              },
              'Branding & Identity',
            )
          }
          saving={savingSection === 'branding'}
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <TextField
              label="Profession"
              name="profession"
              value={form.profession}
              onChange={(name, val) => {
                setField('profession', val);
                if (
                  !form.heroSubtitle ||
                  form.heroSubtitle === form.profession
                ) {
                  setField('heroSubtitle', val);
                }
              }}
            />
            <TextField
              label="Site Title"
              name="siteTitle"
              value={form.siteTitle}
              onChange={(name, val) => {
                setField('siteTitle', val);
                if (!form.tabTitle || form.tabTitle === form.siteTitle) {
                  setField('tabTitle', val);
                }
                if (!form.siteName || form.siteName === form.siteTitle) {
                  setField('siteName', val);
                }
              }}
            />
          </div>
          <div className="grid lg:grid-cols-2 gap-6 pt-2">
            <MediaUploadField
              label="Site Logo"
              value={form.logo}
              onChange={next => {
                setField('logo', next);
                setField('logoUrl', next?.url || '');
              }}
            />
            <MediaUploadField
              label="Favicon"
              value={form.favicon}
              onChange={next => setField('favicon', next)}
            />
          </div>
        </Section>

        <Section
          title="Profile & Hero"
          saveLabel="Save Profile & Hero"
          onSave={() =>
            saveSection(
              'hero',
              {
                profileImage: getImage(form.profileImage),
                heroTitle: form.heroTitle.trim(),
                heroSubtitle: form.heroSubtitle.trim(),
                bubbleIcons: Array.isArray(form.bubbleIcons)
                  ? form.bubbleIcons
                      .filter(item => item?.url)
                      .map(item => getImage(item))
                  : [],
              },
              'Profile & Hero',
            )
          }
          saving={savingSection === 'hero'}
        >
          <MediaUploadField
            label="Profile picture"
            value={form.profileImage}
            onChange={next => setField('profileImage', next)}
          />
          <div className="grid sm:grid-cols-2 gap-5">
            <TextField
              label="Hero title"
              name="heroTitle"
              value={form.heroTitle}
              onChange={setField}
              placeholder="Saker Hridoy"
            />
            <TextField
              label="Hero subtitle"
              name="heroSubtitle"
              value={form.heroSubtitle}
              onChange={setField}
              placeholder="Full-stack developer"
            />
          </div>

          <div className="pt-4 border-t border-white/10 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Hero Floating Bubble Icons
            </p>
            {form.bubbleIcons.map((icon, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10"
              >
                <div className="flex-1">
                  <MediaUploadField
                    label={`Bubble Icon #${index + 1}`}
                    value={icon}
                    onChange={next => {
                      const updated = [...form.bubbleIcons];
                      updated[index] = next;
                      setField('bubbleIcons', updated);
                    }}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const updated = form.bubbleIcons.filter(
                      (_, i) => i !== index,
                    );
                    setField('bubbleIcons', updated);
                  }}
                  className="p-3 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setField('bubbleIcons', [
                  ...form.bubbleIcons,
                  { url: '', publicId: '' },
                ])
              }
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition text-sm font-medium"
            >
              <Plus size={16} /> Add Bubble Icon
            </button>
          </div>
        </Section>

        <Section
          title="About"
          saveLabel="Save About"
          onSave={() =>
            saveSection(
              'about',
              {
                aboutShort: form.aboutShort.trim(),
                aboutImage: getImage(form.aboutImage),
                aboutCards: Array.isArray(form.aboutCards)
                  ? form.aboutCards.map(item => ({
                      title: item.title?.trim() || '',
                      subtitle: item.subtitle?.trim() || '',
                    }))
                  : [],
              },
              'About',
            )
          }
          saving={savingSection === 'about'}
        >
          <TextField
            label="Short bio"
            name="aboutShort"
            value={form.aboutShort}
            onChange={setField}
            textarea
          />
          <MediaUploadField
            label="About section image"
            value={form.aboutImage}
            onChange={next => setField('aboutImage', next)}
          />
          <div className="pt-4 border-t border-white/10 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              About Highlight Cards
            </p>
            {form.aboutCards.map((card, index) => (
              <div
                key={index}
                className="bg-[#0b1120] border border-white/10 rounded-xl p-4 flex flex-col gap-3"
              >
                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    value={card.title}
                    onChange={e => {
                      const newCards = [...form.aboutCards];
                      newCards[index].title = e.target.value;
                      setForm(prev => ({ ...prev, aboutCards: newCards }));
                    }}
                    placeholder="Title (e.g. UI)"
                    className={inputClasses}
                  />
                  <input
                    value={card.subtitle}
                    onChange={e => {
                      const newCards = [...form.aboutCards];
                      newCards[index].subtitle = e.target.value;
                      setForm(prev => ({ ...prev, aboutCards: newCards }));
                    }}
                    placeholder="Subtitle (e.g. Interface Design)"
                    className={inputClasses}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newCards = form.aboutCards.filter(
                      (_, i) => i !== index,
                    );
                    setForm(prev => ({ ...prev, aboutCards: newCards }));
                  }}
                  className="self-end p-2.5 bg-red-500/15 text-red-400 hover:bg-red-500/25 rounded-lg transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setForm(prev => ({
                  ...prev,
                  aboutCards: [
                    ...(prev.aboutCards || []),
                    { title: '', subtitle: '' },
                  ],
                }))
              }
              className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition text-sm font-medium"
            >
              <Plus size={16} /> Add Card
            </button>
          </div>
        </Section>

        <Section
          title="Contact"
          saveLabel="Save Contact"
          onSave={() =>
            saveSection(
              'contact',
              {
                email: form.email.trim(),
                phone: form.phone.trim(),
                whatsapp: form.whatsapp.trim(),
                location: form.location.trim(),
                resumeUrl: form.resumeUrl.trim(),
                siteName: form.siteName.trim(),
                contactSubtitle: form.contactSubtitle.trim(),
              },
              'Contact',
            )
          }
          saving={savingSection === 'contact'}
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <TextField
                label="Contact subtitle"
                name="contactSubtitle"
                value={form.contactSubtitle}
                onChange={setField}
                placeholder="Let's Build Something Together"
              />
            </div>
            <TextField
              label="Email"
              name="email"
              value={form.email}
              onChange={setField}
              placeholder="you@example.com"
            />
            <TextField
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={setField}
              placeholder="+1 555 000 0000"
            />
            <TextField
              label="WhatsApp"
              name="whatsapp"
              value={form.whatsapp}
              onChange={setField}
              placeholder="+1 555 000 0000"
            />
            <TextField
              label="Location"
              name="location"
              value={form.location}
              onChange={setField}
              placeholder="City, Country"
            />
            <TextField
              label="Resume URL"
              name="resumeUrl"
              value={form.resumeUrl}
              onChange={setField}
              placeholder="https://..."
            />
            <TextField
              label="Site name"
              name="siteName"
              value={form.siteName}
              onChange={setField}
              placeholder="SakerHridoy"
            />
          </div>
        </Section>

        <Section
          title="Footer"
          saveLabel="Save Footer"
          onSave={() =>
            saveSection(
              'footer',
              { footerText: form.footerText.trim() },
              'Footer',
            )
          }
          saving={savingSection === 'footer'}
        >
          <TextField
            label="Footer text"
            name="footerText"
            value={form.footerText}
            onChange={setField}
            textarea
            rows={3}
          />
        </Section>

        <Section
          title="SEO & Browser Tab"
          saveLabel="Save SEO"
          onSave={() =>
            saveSection(
              'seo',
              {
                seoTitle: form.seoTitle.trim(),
                seoDescription: form.seoDescription.trim(),
                ogImage: getImage(form.ogImage),
                tabTitle: form.tabTitle.trim(),
              },
              'SEO & Browser Tab',
            )
          }
          saving={savingSection === 'seo'}
        >
          <TextField
            label="SEO title"
            name="seoTitle"
            value={form.seoTitle}
            onChange={setField}
            placeholder="Page title"
          />
          <TextField
            label="SEO description"
            name="seoDescription"
            value={form.seoDescription}
            onChange={setField}
            textarea
            rows={3}
          />
          <MediaUploadField
            label="Open Graph image"
            value={form.ogImage}
            onChange={next => setField('ogImage', next)}
          />
          <TextField
            label="Browser tab title"
            name="tabTitle"
            value={form.tabTitle}
            onChange={setField}
            placeholder="SakerHridoy - webDeveloper"
          />
        </Section>

        <Section
          title="Social Links"
          saveLabel="Save Social Links"
          onSave={() =>
            saveSection(
              'socials',
              {
                socials: {
                  github: form.socials.github.trim(),
                  linkedin: form.socials.linkedin.trim(),
                  twitter: form.socials.twitter.trim(),
                  facebook: form.socials.facebook.trim(),
                  instagram: form.socials.instagram.trim(),
                },
                socialLinks: Array.isArray(form.socialLinks)
                  ? form.socialLinks.map(link => ({
                      label: link.label || '',
                      url: link.url || '',
                      icon: getImage(link.icon),
                    }))
                  : [],
              },
              'Social Links',
            )
          }
          saving={savingSection === 'socials'}
        >
          <div className="grid sm:grid-cols-2 gap-5">
            {socialKeys.map(key => (
              <TextField
                key={key}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                name={key}
                value={form.socials[key]}
                onChange={setSocial}
                placeholder={`https://${key}.com/...`}
              />
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Custom Social Links & Icons
            </p>
            {form.socialLinks.map((link, index) => (
              <div
                key={index}
                className="bg-[#0b1120] border border-white/10 rounded-xl p-4 flex flex-col gap-3"
              >
                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    value={link.label}
                    onChange={e =>
                      updateSocialLink(index, 'label', e.target.value)
                    }
                    placeholder="Platform (e.g. Behance)"
                    className={inputClasses}
                  />
                  <input
                    value={link.url}
                    onChange={e =>
                      updateSocialLink(index, 'url', e.target.value)
                    }
                    placeholder="Profile URL"
                    className={inputClasses}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <MediaUploadField
                      label="Custom Icon"
                      value={link.icon}
                      onChange={next => updateSocialLink(index, 'icon', next)}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSocialLink(index)}
                    className="mt-6 p-2.5 bg-red-500/15 text-red-400 hover:bg-red-500/25 rounded-lg transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addSocialLink}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition text-sm font-medium"
            >
              <Plus size={16} /> Add Social Link
            </button>
          </div>
        </Section>

        <Section
          title="Theme & Appearance"
          onSave={() =>
            saveSection(
              'appearance',
              { themePreset: form.themePreset, themeMode: form.themeMode },
              'Theme & Appearance',
            )
          }
          saving={savingSection === 'appearance'}
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClasses}>Theme Preset</label>
              <select
                value={form.themePreset || 'cyan'}
                onChange={e =>
                  setForm({ ...form, themePreset: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-[#0b1120] border border-white/15 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition"
              >
                <option value="cyan">Cyber Cyan</option>
                <option value="violet">Midnight Violet</option>
                <option value="gold">Champagne Gold</option>
              </select>
            </div>
            <div>
              <label className={labelClasses}>Default Color Mode</label>
              <select
                value={form.themeMode || 'dark'}
                onChange={e =>
                  setForm({ ...form, themeMode: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-[#0b1120] border border-white/15 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition"
              >
                <option value="dark">Dark Mode (3D Cyber)</option>
                <option value="light">Light Mode (Frosted Porcelain)</option>
              </select>
            </div>
          </div>
        </Section>
      </form>
    </div>
  );
};

export default SettingsForm;
