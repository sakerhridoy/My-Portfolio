import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  Layout,
  LayoutDashboard,
  FolderKanban,
  Inbox,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ShoppingBag,

  CreditCard,
  Quote,
  HelpCircle,
  Newspaper,
  Briefcase,
  Award,
  History,
  Settings,
  FileText,
  Users,
} from 'lucide-react';
import { useAuth } from '../auth/useAuth';
import { useAdminBase } from '../hooks/useAdminBase';

const buildNav = base => ({
  navItems: [
    { to: base, label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: `${base}/projects`, label: 'Projects', icon: FolderKanban },
    { to: `${base}/leads`, label: 'Leads', icon: Inbox },
  ],
  navSections: [
    {
      title: 'Content',
      items: [
        { to: `${base}/digital-products`, label: 'Digital Products', icon: ShoppingBag },

        { to: `${base}/services`, label: 'Services', icon: Layout },
        { to: `${base}/plans`, label: 'Plans', icon: CreditCard },
        { to: `${base}/testimonials`, label: 'Testimonials', icon: Quote },
        { to: `${base}/faqs`, label: 'FAQs', icon: HelpCircle },
        { to: `${base}/blog`, label: 'Blog', icon: Newspaper },
        { to: `${base}/experience`, label: 'Experience', icon: Briefcase },
        { to: `${base}/achievements`, label: 'Achievements', icon: Award },
        { to: `${base}/timeline`, label: 'Timeline', icon: History },
      ],
    },
    {
      title: 'Site',
      items: [
        { to: `${base}/settings`, label: 'Settings', icon: Settings },
        { to: `${base}/resume`, label: 'Resume', icon: FileText },
      ],
    },
    {
      title: 'Access',
      items: [{ to: `${base}/users`, label: 'Users', icon: Users }],
    },
  ],
});

const linkClasses = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
    isActive
      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-400/30'
      : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
  }`;

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const base = useAdminBase();
  const [open, setOpen] = useState(false);

  const { navItems, navSections } = buildNav(base);
  const liveSiteHref = user?.slug ? `/${user.slug}` : '/';

  const handleLogout = () => {
    logout();
    navigate(`${base}/login`, { replace: true });
  };

  const SidebarContent = (
    <div className="flex flex-col h-full">
      <div className="px-5 py-6">
        <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-400/80 font-semibold">Control Panel</p>
        <h1 className="text-xl font-extrabold text-white mt-1 truncate">{user?.name || 'SakerHridoy'}</h1>
      </div>

      <nav className="flex-1 px-3 py-1 space-y-1.5 overflow-y-auto">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} className={linkClasses} onClick={() => setOpen(false)}>
            <Icon size={18} />
            {label}
          </NavLink>
        ))}

        {navSections.map(({ title, items }) => (
          <div key={title} className="pt-4">
            <p className="px-4 pb-2 text-[10px] uppercase tracking-[0.25em] text-gray-500 font-semibold">{title}</p>
            <div className="space-y-1.5">
              {items.map(({ to, label, icon: Icon, end }) => (
                <NavLink key={to} to={to} end={end} className={linkClasses} onClick={() => setOpen(false)}>
                  <Icon size={18} />
                  {label}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="px-3 pb-5 space-y-1.5">
        <a
          href={liveSiteHref}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <ExternalLink size={18} />
          View live site
        </a>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400/90 hover:text-red-300 hover:bg-red-500/10 transition-colors"
        >
          <LogOut size={18} />
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#05070b] text-white flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 border-r border-white/5 bg-black/40 backdrop-blur-xl">
        {SidebarContent}
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-72 bg-[#080b11] border-r border-white/10">
            <button
              className="absolute top-5 right-4 text-gray-400 hover:text-white"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
            {SidebarContent}
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-4 px-5 sm:px-8 py-4 border-b border-white/5 bg-[#05070b]/80 backdrop-blur-xl">
          <button
            className="lg:hidden text-gray-300 hover:text-white"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          <div className="hidden lg:block text-sm text-gray-500">Manage your portfolio content and leads</div>

          <div className="flex items-center gap-3">
            <div className="text-right leading-tight">
              <p className="text-sm font-semibold text-white">{user?.name || 'Admin'}</p>
              <p className="text-[11px] uppercase tracking-wider text-cyan-400/80">{user?.role || 'admin'}</p>
            </div>
            <div className="h-9 w-9 rounded-full bg-linear-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-black font-bold">
              {(user?.name || 'A').charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <main className="flex-1 px-5 sm:px-8 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
