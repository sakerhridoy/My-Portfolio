import { useCallback, useEffect, useState } from 'react';
import { Search, Trash2, Eye, X, Mail, AlertCircle } from 'lucide-react';
import api from '../api';

const STATUSES = ['all', 'new', 'read', 'replied', 'archived'];

const statusStyles = {
  new: 'bg-cyan-500/15 text-cyan-300 border-cyan-400/30',
  read: 'bg-amber-500/15 text-amber-300 border-amber-400/30',
  replied: 'bg-green-500/15 text-green-300 border-green-400/30',
  archived: 'bg-white/10 text-gray-400 border-white/20',
};

const formatDate = (value) => {
  if (!value) return '—';
  return new Date(value).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const LeadsInbox = () => {
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState(null);
  const [status, setStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    setError('');
    api.leads
      .list({
        status: status === 'all' ? undefined : status,
        search: search || undefined,
        page,
        limit: 10,
      })
      .then(({ items: rows, meta: pageMeta }) => {
        setItems(rows);
        setMeta(pageMeta);
      })
      .catch((err) => setError(err.message || 'Failed to load leads'))
      .finally(() => setLoading(false));
  }, [status, search, page]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    setPage(1);
  }, [status, search]);

  const changeStatus = async (lead, nextStatus) => {
    setBusy(true);
    try {
      const updated = await api.leads.update(lead._id, { status: nextStatus });
      setItems((prev) => prev.map((item) => (item._id === lead._id ? updated : item)));
      setSelected((prev) => (prev && prev._id === lead._id ? updated : prev));
    } catch (err) {
      setError(err.message || 'Failed to update lead');
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async (lead) => {
    if (!window.confirm(`Delete the lead from "${lead.name}"?`)) return;
    setBusy(true);
    try {
      await api.leads.remove(lead._id);
      if (selected?._id === lead._id) setSelected(null);
      load();
    } catch (err) {
      setError(err.message || 'Failed to delete lead');
    } finally {
      setBusy(false);
    }
  };

  const openLead = (lead) => {
    setSelected(lead);
    if (lead.status === 'new') changeStatus(lead, 'read');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Leads</h2>
        <p className="text-gray-400 mt-1 text-sm">Messages submitted through your contact and WhatsApp forms.</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex flex-wrap gap-2">
          {STATUSES.map((item) => (
            <button
              key={item}
              onClick={() => setStatus(item)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium border capitalize transition-all ${
                status === item
                  ? 'bg-cyan-500 text-black border-cyan-500'
                  : 'border-white/10 text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="relative flex-1 min-w-[200px] ml-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email or message..."
            className="w-full pl-11 pr-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-white/5">
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-4 py-4 font-medium">Email</th>
                <th className="px-4 py-4 font-medium">Source</th>
                <th className="px-4 py-4 font-medium">Received</th>
                <th className="px-4 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500">Loading...</td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500">No leads found.</td>
                </tr>
              ) : (
                items.map((lead) => (
                  <tr key={lead._id} className="hover:bg-white/[0.03] transition-colors">
                    <td className="px-6 py-4 font-medium text-white">{lead.name}</td>
                    <td className="px-4 py-4 text-gray-400">{lead.email}</td>
                    <td className="px-4 py-4 text-gray-400 capitalize">{lead.source || 'contact'}</td>
                    <td className="px-4 py-4 text-gray-400 whitespace-nowrap">{formatDate(lead.createdAt)}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`text-[11px] uppercase tracking-wider px-3 py-1 rounded-full border ${
                          statusStyles[lead.status] || statusStyles.new
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openLead(lead)}
                          className="p-2 rounded-lg text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10 transition-colors"
                          aria-label="View lead"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(lead)}
                          className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          aria-label="Delete lead"
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

      {meta && meta.pages > 1 && (
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>
            Page {meta.page} of {meta.pages} · {meta.total} total
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 disabled:opacity-40 transition"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(meta.pages, p + 1))}
              disabled={page >= meta.pages}
              className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 disabled:opacity-40 transition"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {selected && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md px-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-lg bg-[#0b0f14] rounded-2xl border border-white/10 shadow-2xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <span
              className={`inline-block text-[11px] uppercase tracking-wider px-3 py-1 rounded-full border mb-4 ${
                statusStyles[selected.status] || statusStyles.new
              }`}
            >
              {selected.status}
            </span>

            <h3 className="text-xl font-bold text-white">{selected.name}</h3>
            <a href={`mailto:${selected.email}`} className="text-sm text-cyan-400 hover:text-cyan-300">
              {selected.email}
            </a>

            <div className="grid grid-cols-2 gap-4 mt-5 text-sm">
              <div className="rounded-lg bg-white/5 border border-white/10 p-3">
                <p className="text-[10px] uppercase tracking-wider text-gray-500">Project type</p>
                <p className="text-white mt-1">{selected.projectType || '—'}</p>
              </div>
              <div className="rounded-lg bg-white/5 border border-white/10 p-3">
                <p className="text-[10px] uppercase tracking-wider text-gray-500">Budget</p>
                <p className="text-white mt-1">{selected.budget || '—'}</p>
              </div>
            </div>

            <div className="mt-5">
              <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-2">Message</p>
              <p className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed rounded-lg bg-white/5 border border-white/10 p-4">
                {selected.message || 'No message provided.'}
              </p>
            </div>

            <p className="text-xs text-gray-500 mt-4">Received {formatDate(selected.createdAt)}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              <a
                href={`mailto:${selected.email}?subject=${encodeURIComponent('Re: your inquiry')}`}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition-all"
              >
                <Mail size={16} />
                Reply
              </a>
              {['read', 'replied', 'archived'].map((next) => (
                <button
                  key={next}
                  disabled={busy || selected.status === next}
                  onClick={() => changeStatus(selected, next)}
                  className="px-4 py-2.5 rounded-lg border border-white/10 text-white capitalize hover:bg-white/5 disabled:opacity-40 transition-colors"
                >
                  Mark {next}
                </button>
              ))}
              <button
                onClick={() => handleDelete(selected)}
                className="px-4 py-2.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadsInbox;
