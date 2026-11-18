import { useEffect, useMemo, useState } from 'react';
import { Plus, Search, Pencil, Trash2, ShieldCheck, UserRound, X } from 'lucide-react';
import api from '../api';
import { useAuth } from '../auth/useAuth';

const ROLE_OPTIONS = [
  { value: 'admin', label: 'Admin' },
  { value: 'editor', label: 'Editor' },
];

const EMPTY_FORM = {
  name: '',
  email: '',
  password: '',
  role: 'editor',
  isActive: true,
  slug: '',
  profession: '',
  siteTitle: '',
  siteFavicon: '',
  logoUrl: '',
};

const formatDate = (value) => {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '—' : date.toLocaleDateString(undefined, { dateStyle: 'medium' });
};

const roleClasses = (role) =>
  role === 'admin'
    ? 'bg-cyan-500/15 text-cyan-300 border-cyan-400/30'
    : 'bg-white/5 text-gray-300 border-white/10';

const UsersList = () => {
  const { user: currentUser } = useAuth();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadToken, setReloadToken] = useState(0);
  const [search, setSearch] = useState('');

  const [modal, setModal] = useState(null); // { mode: 'create' | 'edit', id? }
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');
  const [deletingId, setDeletingId] = useState('');

  useEffect(() => {
    let active = true;

    api.auth
      .listUsers({ limit: 100 })
      .then(({ items }) => {
        if (!active) return;
        setUsers(items || []);
        setError('');
        setLoading(false);
      })
      .catch((err) => {
        if (!active) return;
        setError(err.message);
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [reloadToken]);

  const reload = () => {
    setLoading(true);
    setReloadToken((token) => token + 1);
  };

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return users;
    return users.filter(
      (item) =>
        item.name?.toLowerCase().includes(term) || item.email?.toLowerCase().includes(term)
    );
  }, [users, search]);

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setFormError('');
    setModal({ mode: 'create' });
  };

  const openEdit = (target) => {
    setForm({
      name: target.name || '',
      email: target.email || '',
      password: '',
      role: target.role || 'editor',
      isActive: target.isActive !== false,
      slug: target.slug || '',
      profession: target.profession || '',
      siteTitle: target.siteTitle || '',
      siteFavicon: target.siteFavicon || '',
      logoUrl: target.logoUrl || '',
    });
    setFormError('');
    setModal({ mode: 'edit', id: target.id });
  };

  const closeModal = () => {
    if (saving) return;
    setModal(null);
    setFormError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setFormError('');

    try {
      if (modal.mode === 'create') {
        const payload = {
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
          role: form.role,
          profession: form.profession.trim(),
          siteTitle: form.siteTitle.trim(),
          siteFavicon: form.siteFavicon.trim(),
          logoUrl: form.logoUrl.trim(),
        };
        if (form.slug.trim()) payload.slug = form.slug.trim();
        await api.auth.register(payload);
      } else {
        const payload = {
          name: form.name.trim(),
          role: form.role,
          isActive: form.isActive,
          profession: form.profession.trim(),
          siteTitle: form.siteTitle.trim(),
          siteFavicon: form.siteFavicon.trim(),
          logoUrl: form.logoUrl.trim(),
        };
        if (form.password) payload.password = form.password;
        if (form.slug.trim()) payload.slug = form.slug.trim();
        await api.auth.updateUser(modal.id, payload);
      }

      setModal(null);
      reload();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (target) => {
    const confirmed = window.confirm(`Delete the account for "${target.email}"? This cannot be undone.`);
    if (!confirmed) return;

    setDeletingId(target.id);
    setError('');

    try {
      await api.auth.deleteUser(target.id);
      reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId('');
    }
  };

  const editingSelf = modal?.mode === 'edit' && modal.id === currentUser?.id;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Users</h1>
          <p className="text-sm text-gray-500 mt-1">
            Create accounts and manage dashboard access (admin / editor).
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-sm font-semibold transition-colors"
        >
          <Plus size={18} />
          New user
        </button>
      </div>

      {error && (
        <div className="px-5 py-4 rounded-xl border border-red-500/30 bg-red-500/10 text-sm text-red-300">{error}</div>
      )}

      <div className="relative max-w-sm">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search name or email"
          className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400/50"
        />
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl overflow-hidden">
        {loading ? (
          <p className="p-8 text-sm text-gray-500">Loading users…</p>
        ) : filtered.length === 0 ? (
          <p className="p-8 text-sm text-gray-500">No users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wider text-gray-500 border-b border-white/10">
                  <th className="px-5 py-4 font-semibold">Name</th>
                  <th className="px-5 py-4 font-semibold">Profession</th>
                  <th className="px-5 py-4 font-semibold">Email</th>
                  <th className="px-5 py-4 font-semibold">Slug</th>
                  <th className="px-5 py-4 font-semibold">Role</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 font-semibold">Created</th>
                  <th className="px-5 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => {
                  const isSelf = item.id === currentUser?.id;
                  const isActive = item.isActive !== false;

                  return (
                    <tr key={item.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.03]">
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-2 font-medium text-white">
                          {item.role === 'admin' ? (
                            <ShieldCheck size={15} className="text-cyan-400" />
                          ) : (
                            <UserRound size={15} className="text-gray-500" />
                          )}
                          {item.name}
                          {isSelf && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] border border-cyan-400/30 bg-cyan-500/10 text-cyan-300">
                              you
                            </span>
                          )}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-gray-300">
                        {item.profession ? (
                          <span className="text-xs bg-white/5 border border-white/10 px-2 py-0.5 rounded text-cyan-300">
                            {item.profession}
                          </span>
                        ) : (
                          <span className="text-gray-600 text-xs">—</span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-gray-400">{item.email}</td>
                      <td className="px-5 py-4">
                        {item.slug ? (
                          <span className="font-mono text-xs text-cyan-300">/{item.slug}</span>
                        ) : (
                          <span className="text-gray-600">—</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] border capitalize ${roleClasses(item.role)}`}>
                          {item.role}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[11px] border ${
                            isActive
                              ? 'bg-emerald-500/10 text-emerald-300 border-emerald-400/30'
                              : 'bg-red-500/10 text-red-300 border-red-400/30'
                          }`}
                        >
                          {isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-gray-400">{formatDate(item.createdAt)}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEdit(item)}
                            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                            aria-label={`Edit ${item.name}`}
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(item)}
                            disabled={isSelf || deletingId === item.id}
                            title={isSelf ? 'You cannot delete your own account' : 'Delete user'}
                            className="p-2 rounded-lg text-red-400/90 hover:text-red-300 hover:bg-red-500/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            aria-label={`Delete ${item.name}`}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeModal} />
          <form
            onSubmit={handleSubmit}
            className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#080b11] p-6 space-y-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-white">
                  {modal.mode === 'create' ? 'New user' : 'Edit user'}
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  {modal.mode === 'create'
                    ? 'The account can sign in immediately.'
                    : 'Leave the password blank to keep the current one.'}
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="text-gray-500 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <label className="block space-y-1.5">
              <span className="text-xs uppercase tracking-wider text-gray-500">Name</span>
              <input
                required
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400/50"
              />
            </label>

            <label className="block space-y-1.5">
              <span className="text-xs uppercase tracking-wider text-gray-500">Email</span>
              <input
                required={modal.mode === 'create'}
                type="email"
                disabled={modal.mode === 'edit'}
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400/50 disabled:text-gray-500"
              />
            </label>

            <label className="block space-y-1.5">
              <span className="text-xs uppercase tracking-wider text-gray-500">
                Portfolio slug {modal.mode === 'create' && <span className="text-gray-600 normal-case">(auto from name)</span>}
              </span>
              <input
                value={form.slug}
                onChange={(event) => setForm({ ...form, slug: event.target.value })}
                placeholder="e.g. saker"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400/50"
              />
              <span className="text-[11px] text-gray-500">
                Portfolio URL: /{form.slug.trim() || '<slug>'} {modal.mode === 'edit' ? '• leave unchanged to keep current slug' : ''}
              </span>
            </label>

            <label className="block space-y-1.5">
              <span className="text-xs uppercase tracking-wider text-gray-500">Profession</span>
              <input
                value={form.profession}
                onChange={(event) => setForm({ ...form, profession: event.target.value })}
                placeholder="e.g. Web Developer or UI/UX Designer"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400/50"
              />
            </label>

            <label className="block space-y-1.5">
              <span className="text-xs uppercase tracking-wider text-gray-500">Site Title</span>
              <input
                value={form.siteTitle}
                onChange={(event) => setForm({ ...form, siteTitle: event.target.value })}
                placeholder="e.g. Saker Ahmed Hridoy | Portfolio"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400/50"
              />
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="block space-y-1.5">
                <span className="text-xs uppercase tracking-wider text-gray-500">Logo URL</span>
                <input
                  value={form.logoUrl}
                  onChange={(event) => setForm({ ...form, logoUrl: event.target.value })}
                  placeholder="https://.../logo.png"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400/50"
                />
              </label>

              <label className="block space-y-1.5">
                <span className="text-xs uppercase tracking-wider text-gray-500">Favicon URL</span>
                <input
                  value={form.siteFavicon}
                  onChange={(event) => setForm({ ...form, siteFavicon: event.target.value })}
                  placeholder="https://.../favicon.ico"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400/50"
                />
              </label>
            </div>

            <label className="block space-y-1.5">
              <span className="text-xs uppercase tracking-wider text-gray-500">
                {modal.mode === 'create' ? 'Password' : 'New password (optional)'}
              </span>
              <input
                required={modal.mode === 'create'}
                type="password"
                minLength={6}
                value={form.password}
                onChange={(event) => setForm({ ...form, password: event.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400/50"
              />
            </label>

            <label className="block space-y-1.5">
              <span className="text-xs uppercase tracking-wider text-gray-500">Role</span>
              <select
                value={form.role}
                disabled={editingSelf}
                onChange={(event) => setForm({ ...form, role: event.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400/50 disabled:text-gray-500"
              >
                {ROLE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value} className="bg-[#080b11]">
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            {modal.mode === 'edit' && (
              <label className="flex items-center gap-3 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  disabled={editingSelf}
                  onChange={(event) => setForm({ ...form, isActive: event.target.checked })}
                  className="h-4 w-4 accent-cyan-500"
                />
                Account is active
              </label>
            )}

            {editingSelf && (
              <p className="text-xs text-amber-300/90">You cannot change your own role or deactivate your own account.</p>
            )}

            {formError && (
              <p className="px-4 py-3 rounded-xl border border-red-500/30 bg-red-500/10 text-sm text-red-300">{formError}</p>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={closeModal}
                className="px-5 py-3 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-sm font-semibold transition-colors disabled:opacity-60"
              >
                {saving ? 'Saving…' : modal.mode === 'create' ? 'Create user' : 'Save changes'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UsersList;
