import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  AlertCircle,
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Loader2,
  Pencil,
  Plus,
  Search,
  Trash2,
} from 'lucide-react';
import api from '../api';
import { getResource } from '../config/resources';
import MediaUploadField from '../components/MediaUploadField';
import { useAdminBase } from '../hooks/useAdminBase';

const inputClasses =
  'w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition';

const labelClasses = 'block text-sm font-medium text-gray-300 mb-2';

const statusPill = {
  published: 'bg-green-500/15 text-green-300 border-green-400/30',
  approved: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  pending: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  rejected: 'bg-red-500/15 text-red-300 border-red-500/30',
  draft: 'bg-white/10 text-gray-400 border-white/20',
};

const wideTypes = ['textarea', 'stringList', 'image'];

const isWide = type => wideTypes.includes(type);

const moveItem = (list, from, to) => {
  const next = [...list];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
};

const buildInitialValue = field => {
  switch (field.type) {
    case 'boolean':
      return Boolean(field.default);
    case 'number':
      return field.default ?? 0;
    case 'stringList':
      return Array.isArray(field.default) ? [...field.default] : [];
    case 'image':
      return { url: '', publicId: '' };
    default:
      return field.default ?? '';
  }
};

const buildInitialForm = resource => {
  const form = {};
  resource.fields.forEach(field => {
    form[field.name] = buildInitialValue(field);
  });
  return form;
};

const normalizeValue = (field, raw) => {
  switch (field.type) {
    case 'boolean':
      return Boolean(raw);
    case 'number':
      return raw === undefined || raw === null || raw === ''
        ? (field.default ?? 0)
        : Number(raw);
    case 'stringList':
      return Array.isArray(raw) ? raw.map(item => String(item)) : [];
    case 'iconSelect':
      return typeof raw === 'object' && raw !== null
        ? { url: raw.url, publicId: raw.publicId || '' }
        : String(raw || field.default || '');
    case 'date':
      return raw ? String(raw).slice(0, 10) : '';
    default:
      return raw === undefined || raw === null ? '' : String(raw);
  }
};

const normalizeForm = (resource, item) => {
  const form = {};
  resource.fields.forEach(field => {
    form[field.name] = normalizeValue(field, item?.[field.name]);
  });
  return form;
};

const buildPayload = (resource, form) => {
  const payload = {};
  resource.fields.forEach(field => {
    const value = form[field.name];
    switch (field.type) {
      case 'boolean':
        payload[field.name] = Boolean(value);
        break;
      case 'number':
        payload[field.name] = Number(value) || 0;
        break;
      case 'stringList':
        payload[field.name] = (Array.isArray(value) ? value : [])
          .map(item => String(item).trim())
          .filter(Boolean);
        break;
      case 'iconSelect':
        payload[field.name] =
          value && value.url
            ? { url: value.url, publicId: value.publicId || '' }
            : value || field.default || '';
        break;
      case 'select':
        payload[field.name] = value || field.default || '';
        break;
      default:
        payload[field.name] =
          typeof value === 'string' ? value.trim() : (value ?? '');
    }
  });
  return payload;
};

const missingRequired = (resource, form) =>
  resource.fields.filter(field => {
    if (!field.required) return false;
    const value = form[field.name];
    if (field.type === 'stringList') {
      return (
        !Array.isArray(value) ||
        value.filter(item => String(item).trim()).length === 0
      );
    }
    if (field.type === 'image') return !(value && value.url);
    return value === undefined || value === null || String(value).trim() === '';
  });

const searchableText = (resource, item) =>
  [
    ...resource.fields
      .filter(field => field.type === 'text' || field.type === 'textarea')
      .map(field => item[field.name]),
    item.email,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

const renderCell = (field, item) => {
  const value = item[field.name];
  if (field.type === 'boolean') {
    return (
      <span
        className={`text-[11px] uppercase tracking-wider px-3 py-1 rounded-full border ${
          value ? statusPill.published : statusPill.draft
        }`}
      >
        {value ? 'Yes' : 'No'}
      </span>
    );
  }
  if (field.type === 'select' || field.name === 'status') {
    const normalized = String(value || 'approved').toLowerCase();
    const label =
      normalized === 'pending'
        ? 'Pending Review'
        : normalized === 'approved'
          ? 'Approved'
          : value || '—';
    return (
      <span
        className={`text-[11px] uppercase tracking-wider px-3 py-1 rounded-full border ${
          statusPill[normalized] || statusPill.draft
        }`}
      >
        {label}
      </span>
    );
  }
  if (field.type === 'image') {
    return value?.url ? (
      <img
        src={value.url}
        alt=""
        className="h-10 w-16 rounded-lg object-cover border border-white/10"
      />
    ) : (
      <span className="text-gray-600">—</span>
    );
  }
  if (field.type === 'date') {
    return (
      <span className="text-gray-400 whitespace-nowrap">
        {value ? String(value).slice(0, 10) : '—'}
      </span>
    );
  }
  if (value === undefined || value === null || value === '') {
    return <span className="text-gray-600">—</span>;
  }
  return <span className="text-gray-300">{String(value)}</span>;
};

const Field = ({ field, value, onChange }) => {
  const inputId = `field-${field.name}`;
  const label = `${field.label}${field.required ? ' *' : ''}`;

  if (field.type === 'boolean') {
    return (
      <label className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 border border-white/10 cursor-pointer">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={e => onChange(field.name, e.target.checked)}
          className="h-4 w-4 accent-cyan-400"
        />
        <span className="text-sm text-gray-300">{field.label}</span>
      </label>
    );
  }

  if (field.type === 'iconSelect') {
    return (
      <div className="space-y-3">
        <label className={labelClasses}>{label}</label>
        <div className="flex items-center gap-4">
          <select
            value={typeof value === 'string' ? value : 'custom'}
            onChange={e => {
              const val = e.target.value;
              onChange(
                field.name,
                val === 'custom' ? { url: '', publicId: '' } : val,
              );
            }}
            className={`${inputClasses} bg-[#0b1120] text-white`}
            style={{ backgroundColor: '#0b1120', color: '#ffffff' }}
          >
            {field.options.map(opt => (
              <option
                key={opt.value}
                value={opt.value}
                className="bg-[#0b1120] text-white"
                style={{ backgroundColor: '#0b1120', color: '#ffffff' }}
              >
                {opt.label}
              </option>
            ))}
            <option
              value="custom"
              className="bg-[#0b1120] text-white"
              style={{ backgroundColor: '#0b1120', color: '#ffffff' }}
            >
              Custom Icon (Upload)
            </option>
          </select>
        </div>

        {(typeof value === 'object' ||
          (typeof value === 'string' && value.startsWith('http'))) && (
          <MediaUploadField
            label="Upload Icon"
            value={
              typeof value === 'object' ? value : { url: value, publicId: '' }
            }
            onChange={next => onChange(field.name, next)}
          />
        )}
      </div>
    );
  }

  if (field.type === 'stringList') {
    const list = Array.isArray(value) ? value : [];
    const replace = next => onChange(field.name, next);
    return (
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-300">{label}</span>
          <button
            type="button"
            onClick={() => replace([...list, ''])}
            className="flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <Plus size={14} />
            Add
          </button>
        </div>
        <div className="space-y-2">
          {list.length === 0 && (
            <p className="text-xs text-gray-500">
              No items yet. Click “Add” to create one.
            </p>
          )}
          {list.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                value={item}
                onChange={e => {
                  const next = [...list];
                  next[index] = e.target.value;
                  replace(next);
                }}
                placeholder={field.placeholder || 'Item'}
                className={inputClasses}
              />
              <button
                type="button"
                disabled={index === 0}
                onClick={() => replace(moveItem(list, index, index - 1))}
                className="shrink-0 p-2.5 rounded-lg text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10 disabled:opacity-30 transition-colors"
                aria-label="Move up"
              >
                <ChevronUp size={16} />
              </button>
              <button
                type="button"
                disabled={index === list.length - 1}
                onClick={() => replace(moveItem(list, index, index + 1))}
                className="shrink-0 p-2.5 rounded-lg text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10 disabled:opacity-30 transition-colors"
                aria-label="Move down"
              >
                <ChevronDown size={16} />
              </button>
              <button
                type="button"
                onClick={() => replace(list.filter((_, i) => i !== index))}
                className="shrink-0 p-2.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                aria-label="Remove"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
        {field.help && (
          <p className="text-xs text-gray-500 mt-2">{field.help}</p>
        )}
      </div>
    );
  }

  return (
    <div>
      <label className={labelClasses} htmlFor={inputId}>
        {label}
      </label>
      {field.type === 'textarea' ? (
        <textarea
          id={inputId}
          rows={4}
          value={value ?? ''}
          onChange={e => onChange(field.name, e.target.value)}
          placeholder={field.placeholder}
          className={`${inputClasses} resize-none`}
        />
      ) : field.type === 'select' ? (
        <select
          id={inputId}
          value={value ?? ''}
          onChange={e => onChange(field.name, e.target.value)}
          className={inputClasses}
        >
          {(field.options || []).map(option => (
            <option
              key={option.value}
              className="bg-[#0b0f14]"
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={inputId}
          type={
            field.type === 'number'
              ? 'number'
              : field.type === 'date'
                ? 'date'
                : 'text'
          }
          value={value ?? ''}
          onChange={e => onChange(field.name, e.target.value)}
          placeholder={field.placeholder}
          className={inputClasses}
        />
      )}
      {field.help && <p className="text-xs text-gray-500 mt-2">{field.help}</p>}
    </div>
  );
};

const ResourceList = ({ resource }) => {
  const navigate = useNavigate();
  const base = useAdminBase();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deletingId, setDeletingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [reloadToken, setReloadToken] = useState(0);

  const isTestimonials = resource.resource === 'testimonials';

  const baseColumns = resource.columns.map(
    key =>
      resource.fields.find(field => field.name === key) || {
        name: key,
        label: key,
        type: 'text',
      },
  );
  const columnFields =
    isTestimonials && !baseColumns.some(col => col.name === 'status')
      ? [...baseColumns, { name: 'status', label: 'Status', type: 'select' }]
      : baseColumns;

  const colCount = columnFields.length + 1;

  useEffect(() => {
    let active = true;
    if (!api[resource.resource]) {
      setError(`API module for ${resource.resource} is not initialized.`);
      setLoading(false);
      return;
    }
    api[resource.resource]
      .list({ status: 'all', limit: 100, sort: 'order' })
      .then(({ items: rows }) => {
        if (!active) return;
        setItems(rows || []);
        setLoading(false);
      })
      .catch(err => {
        if (!active) return;
        setError(
          err.message || `Failed to load ${resource.label.toLowerCase()}`,
        );
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [resource, reloadToken]);

  const handleStatusUpdate = async (id, nextStatus) => {
    setUpdatingId(id);
    setError('');
    try {
      if (api[resource.resource]?.updateStatus) {
        await api[resource.resource].updateStatus(id, nextStatus);
      } else {
        await api[resource.resource].update(id, { status: nextStatus });
      }
      setItems(prev =>
        prev.map(row => (row.id === id ? { ...row, status: nextStatus } : row)),
      );
    } catch (err) {
      setError(err.message || 'Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async item => {
    const name = item[resource.titleField] || 'this item';
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setDeletingId(item.id);
    setError('');
    try {
      if (!api[resource.resource])
        throw new Error(`API module for ${resource.resource} is missing.`);
      await api[resource.resource].remove(item.id);
      setReloadToken(token => token + 1);
    } catch (err) {
      setError(err.message || 'Failed to delete item');
    } finally {
      setDeletingId(null);
    }
  };

  const pendingCount = isTestimonials
    ? items.filter(item => item.status === 'pending').length
    : 0;

  const term = search.trim().toLowerCase();
  const visible = items.filter(item => {
    if (isTestimonials && statusFilter !== 'all') {
      const normalizedStatus = item.status || 'approved';
      if (normalizedStatus !== statusFilter) return false;
    }
    if (term && !searchableText(resource, item).includes(term)) return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {resource.label}
          </h2>
          <p className="text-gray-400 mt-1 text-sm">
            Create, edit and organize your {resource.label.toLowerCase()}.
          </p>
        </div>
        <button
          onClick={() => navigate(`${base}/${resource.key}/new`)}
          className="flex items-center gap-2 px-5 py-3 rounded-lg bg-cyan-400 text-black font-bold hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-500/20"
        >
          <Plus size={18} />
          New {resource.label.replace(/s$/, '')}
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative max-w-md flex-1">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            size={16}
          />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={`Search ${resource.label.toLowerCase()}...`}
            className="w-full pl-11 pr-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition"
          />
        </div>

        {isTestimonials && (
          <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
            {[
              { key: 'all', label: 'All' },
              { key: 'pending', label: `Pending (${pendingCount})` },
              { key: 'approved', label: 'Approved' },
            ].map(tab => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setStatusFilter(tab.key)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                  statusFilter === tab.key
                    ? 'bg-cyan-400 text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-white/5">
                {columnFields.map(field => (
                  <th
                    key={field.name}
                    className="px-4 py-4 font-medium first:pl-6"
                  >
                    {field.label}
                  </th>
                ))}
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td
                    colSpan={colCount}
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    Loading...
                  </td>
                </tr>
              ) : visible.length === 0 ? (
                <tr>
                  <td
                    colSpan={colCount}
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    {items.length === 0
                      ? `No ${resource.label.toLowerCase()} yet. Click “New” to add your first one.`
                      : 'No matching items.'}
                  </td>
                </tr>
              ) : (
                visible.map(item => (
                  <tr
                    key={item.id}
                    className="hover:bg-white/[0.03] transition-colors"
                  >
                    {columnFields.map(field => (
                      <td
                        key={field.name}
                        className="px-4 py-4 align-middle first:pl-6"
                      >
                        {field.name === resource.titleField ? (
                          <div>
                            <span className="font-medium text-white block">
                              {renderCell(field, item)}
                            </span>
                            {isTestimonials && item.email && (
                              <span className="text-xs text-cyan-400/80">
                                {item.email}
                              </span>
                            )}
                          </div>
                        ) : (
                          renderCell(field, item)
                        )}
                      </td>
                    ))}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {isTestimonials && item.status === 'pending' && (
                          <button
                            type="button"
                            onClick={() =>
                              handleStatusUpdate(item.id, 'approved')
                            }
                            disabled={updatingId === item.id}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 text-xs font-semibold transition-colors disabled:opacity-40"
                          >
                            <Check size={14} />
                            Approve
                          </button>
                        )}
                        <button
                          onClick={() =>
                            navigate(`${base}/${resource.key}/${item.id}/edit`)
                          }
                          className="p-2 rounded-lg text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10 transition-colors"
                          aria-label={`Edit ${resource.label}`}
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
                          disabled={deletingId === item.id}
                          className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-40"
                          aria-label={`Delete ${resource.label}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const ResourceForm = ({ resource }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const base = useAdminBase();
  const isEdit = Boolean(id);
  const listPath = `${base}/${resource.key}`;

  const [form, setForm] = useState(() => buildInitialForm(resource));
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isEdit) return undefined;
    let active = true;
    api[resource.resource]
      .get(id)
      .then(item => {
        if (!active) return;
        setForm(normalizeForm(resource, item));
        setLoading(false);
      })
      .catch(err => {
        if (!active) return;
        setError(err.message || 'Failed to load item');
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [id, isEdit, resource]);

  const updateField = (name, value) =>
    setForm(prev => ({ ...prev, [name]: value }));

  const submit = async event => {
    event.preventDefault();
    setError('');
    const missing = missingRequired(resource, form);
    if (missing.length) {
      setError(
        `Please fill in: ${missing.map(field => field.label).join(', ')}`,
      );
      return;
    }
    setSaving(true);
    try {
      const payload = buildPayload(resource, form);
      if (isEdit) {
        await api[resource.resource].update(id, payload);
      } else {
        await api[resource.resource].create(payload);
      }
      setSaved(true);
      setTimeout(() => navigate(listPath), 800);
    } catch (err) {
      setError(err.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto flex items-center justify-center py-24 text-gray-400">
        <Loader2 className="animate-spin mr-2" size={20} />
        Loading...
      </div>
    );
  }

  if (saved) {
    return (
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center py-24 text-center">
        <CheckCircle2 className="text-green-400 mb-3" size={40} />
        <h2 className="text-xl font-bold text-white">
          {isEdit ? 'Changes saved' : 'Created'}
        </h2>
        <p className="text-gray-400 mt-1 text-sm">
          Redirecting back to {resource.label.toLowerCase()}...
        </p>
        <button
          onClick={() => navigate(listPath)}
          className="mt-6 px-6 py-3 rounded-lg border border-white/10 text-white hover:bg-white/5 transition-colors"
        >
          Back to {resource.label}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button
        onClick={() => navigate(listPath)}
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={16} />
        Back to {resource.label.toLowerCase()}
      </button>

      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          {isEdit
            ? `Edit ${resource.label.replace(/s$/, '')}`
            : `New ${resource.label.replace(/s$/, '')}`}
        </h2>
        <p className="text-gray-400 mt-1 text-sm">
          {isEdit
            ? 'Update the details below.'
            : `Add a new entry to ${resource.label.toLowerCase()}.`}
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      <form
        onSubmit={submit}
        className="space-y-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8"
      >
        <div className="grid sm:grid-cols-2 gap-5">
          {resource.fields.map(field => (
            <div
              key={field.name}
              className={isWide(field.type) ? 'sm:col-span-2' : ''}
            >
              <Field
                field={field}
                value={form[field.name]}
                onChange={updateField}
              />
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-400 text-black font-bold hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50"
          >
            {saving && <Loader2 className="animate-spin" size={16} />}
            {isEdit ? 'Save changes' : 'Create'}
          </button>
          <button
            type="button"
            onClick={() => navigate(listPath)}
            className="px-6 py-3 rounded-lg border border-white/10 text-white hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const ResourceManager = ({ resourceKey, mode = 'list' }) => {
  const resource = getResource(resourceKey);

  if (!resource) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          <AlertCircle size={16} />
          Unknown resource “{resourceKey}”.
        </div>
      </div>
    );
  }

  return mode === 'form' ? (
    <ResourceForm resource={resource} />
  ) : (
    <ResourceList resource={resource} />
  );
};

export default ResourceManager;