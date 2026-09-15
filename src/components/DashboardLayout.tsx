import { type ReactNode, useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { useRouter } from '@/context/RouterContext';
import {
  LayoutDashboard,
  FileText,
  Bell,
  LogOut,
  Users,
  Upload,
  Activity,
  X,
} from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
  icon: typeof LayoutDashboard;
}

const patientNav: NavItem[] = [
  { label: 'Dashboard', path: '/patient-dashboard', icon: LayoutDashboard },
  { label: 'My Reports', path: '/my-reports', icon: FileText },
  { label: 'Notifications', path: '/notifications', icon: Bell },
];

const staffNav: NavItem[] = [
  { label: 'Dashboard', path: '/staff-dashboard', icon: LayoutDashboard },
  { label: 'Upload Report', path: '/upload-report', icon: Upload },
  { label: 'Patient Management', path: '/patient-management', icon: Users },
  { label: 'Notifications', path: '/notifications', icon: Bell },
];

export function DashboardLayout({ children, title }: { children: ReactNode; title: string }) {
  const { user, logout, notifications } = useApp();
  const { route, navigate } = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!user) navigate('/patient-login');
  }, [user, navigate]);

  if (!user) return null;

  const navItems = user.role === 'staff' ? staffNav : patientNav;
  const unreadCount = notifications.filter(
    (n) =>
      (n.userId === user.id || (user.role === 'staff' && n.role === 'staff')) &&
      !n.read
  ).length;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const sidebar = (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 px-5 py-5 border-b border-slate-200">
        <div className="w-9 h-9 rounded-xl bg-sky-500 flex items-center justify-center shrink-0">
          <Activity className="w-5 h-5 text-white" />
        </div>
        <div className="min-w-0">
          <span className="block text-sm font-bold text-slate-800 leading-tight">Lab Report MS</span>
          <span className="block text-xs text-sky-500 leading-tight capitalize">{user.role} Portal</span>
        </div>
      </div>

      <div className="px-4 py-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center shrink-0">
            <span className="text-sm font-bold text-sky-600">
              {user.name.charAt(0)}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate">{user.name}</p>
            <p className="text-xs text-slate-400 truncate">{user.email}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = route === item.path;
          return (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setMobileOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                active
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-200'
                  : 'text-slate-600 hover:bg-sky-50 hover:text-sky-600'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.label === 'Notifications' && unreadCount > 0 && (
                <span className={`px-1.5 py-0.5 text-xs font-bold rounded-full ${
                  active ? 'bg-white text-sky-600' : 'bg-sky-500 text-white'
                }`}>
                  {unreadCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-slate-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-slate-200 flex-col fixed inset-y-0 z-30">
        {sidebar}
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-64 bg-white border-r border-slate-200 flex flex-col">
            {sidebar}
          </div>
          <div
            className="flex-1 bg-slate-900/40"
            onClick={() => setMobileOpen(false)}
          >
            <button className="absolute top-4 right-4 text-white p-1">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
        <div className="sticky top-0 z-20 bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-lg font-bold text-slate-800 flex-1">{title}</h1>
          <button
            onClick={() => navigate('/notifications')}
            className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
