import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FolderKanban, Inbox, Sparkles, Archive, ArrowRight } from 'lucide-react';
import api from '../api';
import { useAdminBase } from '../hooks/useAdminBase';
import AnalyticsChart from '../components/AnalyticsChart';

const statusStyles = {
  new: 'bg-cyan-500/15 text-cyan-300 border-cyan-400/30',
  read: 'bg-amber-500/15 text-amber-300 border-amber-400/30',
  replied: 'bg-green-500/15 text-green-300 border-green-400/30',
  archived: 'bg-white/10 text-gray-400 border-white/20',
};

const StatCard = ({ icon: Icon, label, value, accent }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
    <div className="flex items-center justify-between">
      <span className={`h-11 w-11 rounded-xl flex items-center justify-center ${accent}`}>
        <Icon size={20} />
      </span>
    </div>
    <p className="mt-5 text-3xl font-extrabold text-white">{value}</p>
    <p className="text-sm text-gray-400 mt-1">{label}</p>
  </div>
);

const Dashboard = () => {
  const base = useAdminBase();
  const [stats, setStats] = useState({ new: 0, read: 0, replied: 0, archived: 0, total: 0 });
  const [projectCount, setProjectCount] = useState(0);
  const [recent, setRecent] = useState([]);
  const [analyticsData, setAnalyticsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    Promise.all([api.leads.stats(), api.projects.list({ status: 'all', limit: 1 }), api.leads.list({ limit: 5 })])
      .then(([leadStats, projects, leads]) => {
        if (!active) return;
        setStats(leadStats);
        setProjectCount(projects.meta?.total ?? 0);
        setRecent(leads.items);
        // Mocking analytics data
        setAnalyticsData([
            { month: 'Jan', inquiries: leadStats.total, projects: projects.meta?.total ?? 0, testimonials: 0 },
            { month: 'Feb', inquiries: Math.max(0, leadStats.total - 2), projects: Math.max(0, (projects.meta?.total ?? 0) - 1), testimonials: 0 },
        ]);
      })
      .catch((err) => {
        if (active) setError(err.message || 'Failed to load dashboard');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Dashboard</h2>
        <p className="text-gray-400 mt-1 text-sm">An overview of your portfolio content and incoming leads.</p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          icon={FolderKanban}
          label="Total projects"
          value={loading ? '—' : projectCount}
          accent="bg-cyan-500/15 text-cyan-300"
        />
        <StatCard
          icon={Sparkles}
          label="New leads"
          value={loading ? '—' : stats.new}
          accent="bg-purple-500/15 text-purple-300"
        />
        <StatCard
          icon={Inbox}
          label="All leads"
          value={loading ? '—' : stats.total}
          accent="bg-blue-500/15 text-blue-300"
        />

      <AnalyticsChart data={analyticsData} />

        <StatCard
          icon={Archive}
          label="Replied"
          value={loading ? '—' : stats.replied}
          accent="bg-green-500/15 text-green-300"
        />
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <h3 className="font-bold text-white">Recent leads</h3>
          <Link to={`${base}/leads`} className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>

        {loading ? (
          <p className="px-6 py-8 text-sm text-gray-500">Loading...</p>
        ) : recent.length === 0 ? (
          <p className="px-6 py-8 text-sm text-gray-500">No leads yet. New contact form submissions will appear here.</p>
        ) : (
          <ul className="divide-y divide-white/5">
            {recent.map((lead) => (
              <li key={lead.id} className="flex items-center justify-between gap-4 px-6 py-4">
                <div className="min-w-0">
                  <p className="font-medium text-white truncate">{lead.name}</p>
                  <p className="text-xs text-gray-500 truncate">{lead.email}</p>
                </div>
                <span
                  className={`shrink-0 text-[11px] uppercase tracking-wider px-3 py-1 rounded-full border ${
                    statusStyles[lead.status] || statusStyles.new
                  }`}
                >
                  {lead.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
