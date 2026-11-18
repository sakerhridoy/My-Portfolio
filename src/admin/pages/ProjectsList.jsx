import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Pencil, Trash2, Star, AlertCircle } from 'lucide-react';
import api from '../api';
import { useAdminBase } from '../hooks/useAdminBase';

const statusBadge = {
  published: 'bg-green-500/15 text-green-300 border-green-400/30',
  draft: 'bg-white/10 text-gray-400 border-white/20',
};

const ProjectsList = () => {
  const navigate = useNavigate();
  const base = useAdminBase();
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState(null);
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    setError('');
    api.projects
      .list({ status: status || 'all', search: search || undefined, page, limit: 10, sort: 'order' })
      .then(({ items: rows, meta: pageMeta }) => {
        setItems(rows);
        setMeta(pageMeta);
      })
      .catch((err) => setError(err.message || 'Failed to load projects'))
      .finally(() => setLoading(false));
  }, [status, search, page]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    setPage(1);
  }, [status, search]);

  const handleDelete = async (project) => {
    const confirmed = window.confirm(`Delete "${project.title}"? This cannot be undone.`);
    if (!confirmed) return;
    setDeletingId(project._id);
    try {
      await api.projects.remove(project._id);
      load();
    } catch (err) {
      setError(err.message || 'Failed to delete project');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Projects</h2>
          <p className="text-gray-400 mt-1 text-sm">Create, edit and organize the projects shown on your site.</p>
        </div>
        <button
          onClick={() => navigate(`${base}/projects/new`)}
          className="flex items-center gap-2 px-5 py-3 rounded-lg bg-cyan-400 text-black font-bold hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-500/20"
        >
          <Plus size={18} />
          New Project
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full pl-11 pr-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition"
          />
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-cyan-400 transition"
        >
          <option className="bg-[#0b0f14]" value="">All statuses</option>
          <option className="bg-[#0b0f14]" value="published">Published</option>
          <option className="bg-[#0b0f14]" value="draft">Draft</option>
        </select>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-white/5">
                <th className="px-6 py-4 font-medium">Project</th>
                <th className="px-4 py-4 font-medium">Category</th>
                <th className="px-4 py-4 font-medium">Status</th>
                <th className="px-4 py-4 font-medium text-center">Featured</th>
                <th className="px-4 py-4 font-medium text-center">Order</th>
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
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                    No projects yet. Click “New Project” to add your first one.
                  </td>
                </tr>
              ) : (
                items.map((project) => (
                  <tr key={project._id} className="hover:bg-white/[0.03] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-11 w-16 shrink-0 rounded-lg overflow-hidden bg-white/5 border border-white/10">
                          {project.images?.[0]?.url ? (
                            <img src={project.images[0].url} alt="" className="h-full w-full object-cover" />
                          ) : null}
                        </div>
                        <span className="font-medium text-white line-clamp-2">{project.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-gray-400">{project.category || '—'}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`text-[11px] uppercase tracking-wider px-3 py-1 rounded-full border ${
                          statusBadge[project.status] || statusBadge.draft
                        }`}
                      >
                        {project.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      {project.featured ? (
                        <Star size={16} className="inline text-yellow-400 fill-yellow-400" />
                      ) : (
                        <span className="text-gray-600">—</span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-center text-gray-400">{project.order}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => navigate(`${base}/projects/${project._id}/edit`)}
                          className="p-2 rounded-lg text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10 transition-colors"
                          aria-label="Edit project"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(project)}
                          disabled={deletingId === project._id}
                          className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-40"
                          aria-label="Delete project"
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
    </div>
  );
};

export default ProjectsList;
