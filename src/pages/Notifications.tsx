import { Bell, FileText, Info, Calendar, CheckCheck, Mail } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { DashboardLayout } from '@/components/DashboardLayout';
import { showToast } from '@/components/Toast';
import { useState } from 'react';

export function Notifications() {
  const { user, notifications, markNotificationRead } = useApp();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  if (!user) return null;

  const myNotifications = notifications
    .filter((n) => {
      if (user.role === 'staff') return n.role === 'staff';
      return n.userId === user.id && n.role === 'patient';
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const display = filter === 'unread' ? myNotifications.filter((n) => !n.read) : myNotifications;
  const unreadCount = myNotifications.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    myNotifications.forEach((n) => {
      if (!n.read) markNotificationRead(n.id);
    });
    showToast('success', 'All notifications marked as read.');
  };

  const handleMarkRead = (id: string) => {
    markNotificationRead(id);
  };

  const typeIcon = (type: string) => {
    switch (type) {
      case 'report': return FileText;
      case 'system': return Info;
      case 'appointment': return Calendar;
      default: return Bell;
    }
  };

  const typeColor = (type: string) => {
    switch (type) {
      case 'report': return { bg: 'bg-sky-50', icon: 'text-sky-500' };
      case 'system': return { bg: 'bg-amber-50', icon: 'text-amber-500' };
      case 'appointment': return { bg: 'bg-green-50', icon: 'text-green-500' };
      default: return { bg: 'bg-slate-50', icon: 'text-slate-500' };
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) +
      ' at ' + date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  return (
    <DashboardLayout title="Notifications">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <p className="text-slate-500 text-sm">
          {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}.` : 'You are all caught up!'}
        </p>
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-100 rounded-lg p-0.5">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                filter === 'all' ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-500'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                filter === 'unread' ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-500'
              }`}
            >
              Unread ({unreadCount})
            </button>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-sky-600 hover:bg-sky-50 transition-colors"
            >
              <CheckCheck className="w-4 h-4" />
              Mark all read
            </button>
          )}
        </div>
      </div>

      {display.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Mail className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">No notifications</p>
          <p className="text-sm text-slate-400 mt-1">
            {filter === 'unread' ? 'You have no unread notifications.' : 'Notifications will appear here.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {display.map((notif) => {
            const Icon = typeIcon(notif.type);
            const colors = typeColor(notif.type);
            return (
              <div
                key={notif.id}
                className={`bg-white rounded-2xl border p-4 transition-all ${
                  notif.read ? 'border-slate-200' : 'border-sky-200 bg-sky-50/30'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-5 h-5 ${colors.icon}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-slate-800">{notif.title}</h3>
                      {!notif.read && (
                        <span className="w-2 h-2 rounded-full bg-sky-500 shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{notif.message}</p>
                    <p className="text-xs text-slate-400 mt-2">{formatDate(notif.date)}</p>
                  </div>
                  {!notif.read && (
                    <button
                      onClick={() => handleMarkRead(notif.id)}
                      className="text-xs font-medium text-sky-600 hover:text-sky-700 shrink-0 mt-1"
                    >
                      Mark read
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
}
