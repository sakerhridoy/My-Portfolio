import { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Plus, Trash2 } from 'lucide-react';
import api from '../api';
import MediaUploadField from '../components/MediaUploadField';

const inputClasses =
  'w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition';

const labelClasses = 'block text-sm font-medium text-gray-300 mb-2';

const repeatableGroups = [
  {
    key: 'experience',
    label: 'Experience',
    fields: [
      { name: 'title', label: 'Title', placeholder: 'Role or company' },
      { name: 'period', label: 'Period', placeholder: '2022 — Present' },
      { name: 'description', label: 'Description', placeholder: 'What you did...', textarea: true },
    ],
  },
  {
    key: 'education',
    label: 'Education',
    fields: [
      { name: 'title', label: 'Title', placeholder: 'Degree or program' },
      { name: 'period', label: 'Period', placeholder: '2018 — 2022' },
      { name: 'description', label: 'Description', placeholder: 'Details...', textarea: true },
    ],
  },
  {
    key: 'stats',
    label: 'Stats',
    fields: [
      { name: 'label', label: 'Label', placeholder: 'Projects shipped' },
      { name: 'value', label: 'Value', placeholder: '50+' },
      { name: 'description', label: 'Description', placeholder: 'Optional detail', textarea: true },
    ],
  },
];

const initialForm = () => ({
  intro: '',
  resumeFile: { url: '', publicId: '' },
  experience: [],
  education: [],
  stats: [],
});

const emptyRow = (group) => group.fields.reduce((row, field) => ({ ...row, [field.name]: '' }), {});

const cleanRows = (rows, fields) =>
  rows
    .map((row) => fields.reduce((out, name) => ({ ...out, [name]: (row[name] || '').trim() }), {}))
    .filter((row) => fields.some((name) => row[name]));

const Section = ({ title, action, children }) => (
  <div className="space-y-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8">
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-300">{title}</h3>
      {action}
    </div>
    {children}
  </div>
);

const RepeatableGroup = ({ group, rows, onChange }) => {
  const addRow = () => onChange([...rows, emptyRow(group)]);
  const removeRow = (index) => onChange(rows.filter((_, i) => i !== index));
  const updateRow = (index, name, value) =>
    onChange(rows.map((row, i) => (i === index ? { ...row, [name]: value } : row)));

  return (
    <Section
      title={group.label}
      action={
        <button
          type="button"
          onClick={addRow}
          className="flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <Plus size={14} />
          Add row
        </button>
      }
    >
      {rows.length === 0 && <p className="text-xs text-gray-500">No rows yet. Click “Add row” to create one.</p>}
      <div className="space-y-4">
        {rows.map((row, index) => (
          <div key={index} className="rounded-xl border border-white/10 bg-black/20 p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-gray-500">Row {index + 1}</span>
              <button
                type="button"
                onClick={() => removeRow(index)}
                className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                aria-label="Remove row"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {group.fields.map((field) => {
                const id = `${group.key}-${index}-${field.name}`;
                return (
                  <div key={field.name} className={field.textarea ? 'sm:col-span-2' : ''}>
                    <label className={labelClasses} htmlFor={id}>
                      {field.label}
                    </label>
                    {field.textarea ? (
                      <textarea
                        id={id}
                        rows={3}
                        value={row[field.name] || ''}
                        onChange={(e) => updateRow(index, field.name, e.target.value)}
                        placeholder={field.placeholder}
                        className={`${inputClasses} resize-none`}
                      />
                    ) : (
                      <input
                        id={id}
                        value={row[field.name] || ''}
                        onChange={(e) => updateRow(index, field.name, e.target.value)}
                        placeholder={field.placeholder}
                        className={inputClasses}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

const ResumeForm = () => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let active = true;
    api.resume
      .get()
      .then((data) => {
        if (!active || !data) return;
        setForm({
          intro: data.intro || '',
          resumeFile: { url: data.resumeFile?.url || '', publicId: data.resumeFile?.publicId || '' },
          experience: (data.experience || []).map((row) => ({
            title: row.title || '',
            period: row.period || '',
            description: row.description || '',
          })),
          education: (data.education || []).map((row) => ({
            title: row.title || '',
            period: row.period || '',
            description: row.description || '',
          })),
          stats: (data.stats || []).map((row) => ({
            label: row.label || '',
            value: row.value || '',
            description: row.description || '',
          })),
        });
      })
      .catch((err) => {
        if (active) setError(err.message || 'Failed to load resume');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const setGroup = (key, rows) => setForm((prev) => ({ ...prev, [key]: rows }));
  const setIntro = (value) => setForm((prev) => ({ ...prev, intro: value }));
  const setResumeFile = (value) => setForm((prev) => ({ ...prev, resumeFile: value }));

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setSaved(false);
    const payload = {
      intro: form.intro.trim(),
      resumeFile: { 
        url: form.resumeFile.url || '', 
        publicId: form.resumeFile.publicId || '',
        originalName: form.resumeFile.originalName || ''
      },
      experience: cleanRows(
        form.experience,
        repeatableGroups[0].fields.map((field) => field.name)
      ),
      education: cleanRows(
        form.education,
        repeatableGroups[1].fields.map((field) => field.name)
      ),
      stats: cleanRows(
        form.stats,
        repeatableGroups[2].fields.map((field) => field.name)
      ),
    };

    setSaving(true);
    try {
      await api.resume.update(payload);
      setSaved(true);
    } catch (err) {
      setError(err.message || 'Failed to save resume');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto flex items-center justify-center py-24 text-gray-400">
        <Loader2 className="animate-spin mr-2" size={20} />
        Loading resume...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Resume</h2>
        <p className="text-gray-400 mt-1 text-sm">Maintain your resume intro, experience, education and stats.</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {saved && (
        <div className="flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-300">
          <CheckCircle2 size={16} />
          Resume saved.
        </div>
      )}

      <form onSubmit={submit} className="space-y-6">
        <Section title="Intro">
          <div>
            <label className={labelClasses} htmlFor="intro">
              Intro
            </label>
            <textarea
              id="intro"
              rows={4}
              value={form.intro}
              onChange={(e) => setIntro(e.target.value)}
              placeholder="A short introduction for your resume..."
              className={`${inputClasses} resize-none`}
            />
          </div>
        </Section>

        <Section title="Resume file">
          <MediaUploadField
            label="Resume PDF"
            kind="file"
            value={form.resumeFile}
            onChange={setResumeFile}
            help="Upload your resume as a PDF. Visitors can download it from the Resume section."
          />
        </Section>

        {repeatableGroups.map((group) => (
          <RepeatableGroup
            key={group.key}
            group={group}
            rows={form[group.key]}
            onChange={(rows) => setGroup(group.key, rows)}
          />
        ))}

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-400 text-black font-bold hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50"
          >
            {saving && <Loader2 className="animate-spin" size={16} />}
            Save resume
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResumeForm;
