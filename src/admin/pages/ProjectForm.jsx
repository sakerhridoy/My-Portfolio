import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, AlertCircle, Loader2 } from 'lucide-react';
import api from '../api';
import MediaUploadField from '../components/MediaUploadField';
import { useAdminBase } from '../hooks/useAdminBase';

const emptyForm = {
  title: '',
  category: '',
  description: '',
  techStack: '',
  images: [{ url: '', publicId: '' }],
  video: { url: '', publicId: '' },
  videoUrl: '',
  liveUrl: '',
  repoUrl: '',
  githubLink: '',
  liveLink: '',
  youtubeLink: '',
  facebookLink: '',
  customLinks: [],
  order: 0,
  featured: false,
  status: 'published',
};

const inputClasses =
  'w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition';

const labelClasses = 'block text-sm font-medium text-gray-300 mb-2';

const ProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const base = useAdminBase();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isEdit) return undefined;
    let active = true;

    api.projects
      .get(id)
      .then((project) => {
        if (!active) return;
        setForm({
          title: project.title || '',
          category: project.category || '',
          description: project.description || '',
          techStack: (project.techStack || []).join(', '),
          images: project.images?.length
            ? project.images.map((img) => ({ url: img.url || '', publicId: img.publicId || '' }))
            : [{ url: '', publicId: '' }],
          video: { url: project.video?.url || '', publicId: project.video?.publicId || '' },
          videoUrl: project.videoUrl || project.youtubeLink || '',
          liveUrl: project.liveUrl || project.liveLink || '',
          repoUrl: project.repoUrl || project.githubLink || '',
          githubLink: project.githubLink || project.repoUrl || '',
          liveLink: project.liveLink || project.liveUrl || '',
          youtubeLink: project.youtubeLink || project.videoUrl || '',
          facebookLink: project.facebookLink || '',
          customLinks: project.customLinks?.length
            ? project.customLinks.map((cl) => ({ label: cl.label || '', url: cl.url || '' }))
            : [],
          order: project.order ?? 0,
          featured: Boolean(project.featured),
          status: project.status || 'published',
        });
      })
      .catch((err) => {
        if (active) setError(err.message || 'Failed to load project');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id, isEdit]);

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const updateImage = (index, value) =>
    setForm((prev) => {
      const images = [...prev.images];
      images[index] = value;
      return { ...prev, images };
    });

  const addImage = () => setForm((prev) => ({ ...prev, images: [...prev.images, { url: '', publicId: '' }] }));

  const removeImage = (index) =>
    setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));

  const addCustomLink = () =>
    setForm((prev) => ({ ...prev, customLinks: [...(prev.customLinks || []), { label: '', url: '' }] }));

  const updateCustomLink = (index, field, value) =>
    setForm((prev) => {
      const customLinks = [...(prev.customLinks || [])];
      customLinks[index] = { ...customLinks[index], [field]: value };
      return { ...prev, customLinks };
    });

  const removeCustomLink = (index) =>
    setForm((prev) => ({
      ...prev,
      customLinks: (prev.customLinks || []).filter((_, i) => i !== index),
    }));

  const submit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.title.trim()) {
      setError('Title is required');
      return;
    }

    const payload = {
      title: form.title.trim(),
      category: form.category.trim(),
      description: form.description.trim(),
      techStack: form.techStack
        .split(',')
        .map((tech) => tech.trim())
        .filter(Boolean),
      images: form.images
        .filter((img) => img.url?.trim())
        .map((img) => ({ url: img.url.trim(), publicId: img.publicId || '' })),
      video: form.video?.url ? { url: form.video.url, publicId: form.video.publicId || '' } : { url: '', publicId: '' },
      videoUrl: (form.youtubeLink || form.videoUrl || '').trim(),
      liveUrl: (form.liveLink || form.liveUrl || '').trim(),
      repoUrl: (form.githubLink || form.repoUrl || '').trim(),
      githubLink: (form.githubLink || form.repoUrl || '').trim(),
      liveLink: (form.liveLink || form.liveUrl || '').trim(),
      youtubeLink: (form.youtubeLink || form.videoUrl || '').trim(),
      facebookLink: (form.facebookLink || '').trim(),
      customLinks: (form.customLinks || [])
        .filter((cl) => cl.label?.trim() || cl.url?.trim())
        .map((cl) => ({ label: cl.label.trim(), url: cl.url.trim() })),
      order: Number(form.order) || 0,
      featured: form.featured,
      status: form.status,
    };

    setSaving(true);
    try {
      if (isEdit) {
        await api.projects.update(id, payload);
      } else {
        await api.projects.create(payload);
      }
      navigate(`${base}/projects`);
    } catch (err) {
      setError(err.message || 'Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto flex items-center justify-center py-24 text-gray-400">
        <Loader2 className="animate-spin mr-2" size={20} />
        Loading project...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button
        onClick={() => navigate(`${base}/projects`)}
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={16} />
        Back to projects
      </button>

      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{isEdit ? 'Edit Project' : 'New Project'}</h2>
        <p className="text-gray-400 mt-1 text-sm">
          {isEdit ? 'Update the details for this project.' : 'Add a new project to your portfolio.'}
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      <form onSubmit={submit} className="space-y-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8">
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClasses} htmlFor="title">Title *</label>
            <input
              id="title"
              value={form.title}
              onChange={(e) => update('title', e.target.value)}
              placeholder="E-commerce Website"
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses} htmlFor="category">Category</label>
            <input
              id="category"
              value={form.category}
              onChange={(e) => update('category', e.target.value)}
              placeholder="React"
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label className={labelClasses} htmlFor="description">Description</label>
          <textarea
            id="description"
            rows={4}
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            placeholder="A short summary of the project..."
            className={`${inputClasses} resize-none`}
          />
        </div>

        <div>
          <label className={labelClasses} htmlFor="techStack">Tech stack</label>
          <input
            id="techStack"
            value={form.techStack}
            onChange={(e) => update('techStack', e.target.value)}
            placeholder="React, Tailwind, Node.js (comma separated)"
            className={inputClasses}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-300">Images</span>
            <button
              type="button"
              onClick={addImage}
              className="flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <Plus size={14} />
              Add image
            </button>
          </div>
          <div className="space-y-4">
            {form.images.map((image, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <MediaUploadField
                    label={`Image ${index + 1}`}
                    value={image}
                    onChange={(next) => updateImage(index, next)}
                  />
                </div>
                {form.images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="shrink-0 mt-8 p-2.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    aria-label="Remove image"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          <MediaUploadField
            label="Video (upload)"
            kind="video"
            value={form.video}
            onChange={(next) => update('video', next)}
          />
          <div>
            <label className={labelClasses} htmlFor="videoUrl">Video link (YouTube / Vimeo / MP4)</label>
            <input
              id="videoUrl"
              value={form.videoUrl}
              onChange={(e) => update('videoUrl', e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
              className={inputClasses}
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClasses} htmlFor="githubLink">GitHub Link (Optional)</label>
            <input
              id="githubLink"
              value={form.githubLink}
              onChange={(e) => {
                update('githubLink', e.target.value);
                update('repoUrl', e.target.value);
              }}
              placeholder="https://github.com/username/project"
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses} htmlFor="liveLink">Live Demo Link (Optional)</label>
            <input
              id="liveLink"
              value={form.liveLink}
              onChange={(e) => {
                update('liveLink', e.target.value);
                update('liveUrl', e.target.value);
              }}
              placeholder="https://example.com"
              className={inputClasses}
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClasses} htmlFor="youtubeLink">YouTube Link (Optional)</label>
            <input
              id="youtubeLink"
              value={form.youtubeLink}
              onChange={(e) => {
                update('youtubeLink', e.target.value);
                update('videoUrl', e.target.value);
              }}
              placeholder="https://youtube.com/watch?v=..."
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses} htmlFor="facebookLink">Facebook Link (Optional)</label>
            <input
              id="facebookLink"
              value={form.facebookLink}
              onChange={(e) => update('facebookLink', e.target.value)}
              placeholder="https://facebook.com/..."
              className={inputClasses}
            />
          </div>
        </div>

        {/* Dynamic Custom Links with "Add Link" button */}
        <div className="space-y-3 pt-2 rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-semibold text-white">Custom Project Links</span>
              <p className="text-xs text-gray-400">Add any custom buttons/links (Figma, Behance, Case Study, Docs, etc.)</p>
            </div>
            <button
              type="button"
              onClick={addCustomLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-bold transition-all shadow shadow-cyan-400/20"
            >
              <Plus size={14} />
              Add Link
            </button>
          </div>

          {(form.customLinks || []).length === 0 ? (
            <p className="text-xs text-gray-500 italic py-2">
              No custom links added yet. Click &quot;Add Link&quot; to add custom buttons for this project.
            </p>
          ) : (
            (form.customLinks || []).map((cl, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <input
                  value={cl.label}
                  onChange={(e) => updateCustomLink(idx, 'label', e.target.value)}
                  placeholder="Button Label (e.g. Figma, Behance)"
                  className="w-1/3 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:border-cyan-400 outline-none"
                />
                <input
                  value={cl.url}
                  onChange={(e) => updateCustomLink(idx, 'url', e.target.value)}
                  placeholder="URL (https://...)"
                  className="flex-1 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:border-cyan-400 outline-none"
                />
                <button
                  type="button"
                  onClick={() => removeCustomLink(idx)}
                  className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  aria-label="Remove link"
                  title="Remove link"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="grid sm:grid-cols-3 gap-5 items-end">
          <div>
            <label className={labelClasses} htmlFor="status">Status</label>
            <select
              id="status"
              value={form.status}
              onChange={(e) => update('status', e.target.value)}
              className={inputClasses}
            >
              <option className="bg-[#0b0f14]" value="published">Published</option>
              <option className="bg-[#0b0f14]" value="draft">Draft</option>
            </select>
          </div>
          <div>
            <label className={labelClasses} htmlFor="order">Order</label>
            <input
              id="order"
              type="number"
              value={form.order}
              onChange={(e) => update('order', e.target.value)}
              className={inputClasses}
            />
          </div>
          <label className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 border border-white/10 cursor-pointer">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => update('featured', e.target.checked)}
              className="h-4 w-4 accent-cyan-400"
            />
            <span className="text-sm text-gray-300">Featured</span>
          </label>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-400 text-black font-bold hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50"
          >
            {saving && <Loader2 className="animate-spin" size={16} />}
            {isEdit ? 'Save changes' : 'Create project'}
          </button>
          <button
            type="button"
            onClick={() => navigate(`${base}/projects`)}
            className="px-6 py-3 rounded-lg border border-white/10 text-white hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
