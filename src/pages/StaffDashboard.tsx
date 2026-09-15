import { useState, type FormEvent } from 'react';
import {
  LayoutDashboard,
  FileText,
  Users,
  Clock,
  TrendingUp,
  Upload,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useRouter } from '@/context/RouterContext';
import { DashboardLayout } from '@/components/DashboardLayout';

export function StaffDashboard() {
  const { user, patients, reports } = useApp();
  const { navigate } = useRouter();

  const completedReports = reports.filter((r) => r.status === 'Completed');
  const processingReports = reports.filter((r) => r.status === 'Processing' || r.status === 'Pending');
  const recentUploads = reports.slice(0, 5);

  const statCards = [
    { label: 'Total Patients', value: patients.length, icon: Users, color: 'sky' },
    { label: 'Total Reports', value: reports.length, icon: FileText, color: 'blue' },
    { label: 'Completed', value: completedReports.length, icon: TrendingUp, color: 'green' },
    { label: 'Processing', value: processingReports.length, icon: Clock, color: 'amber' },
  ];

  const categoryStats = reports.reduce<Record<string, number>>((acc, r) => {
    acc[r.category] = (acc[r.category] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <DashboardLayout title="Staff Dashboard">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl p-6 sm:p-8 text-white mb-6 shadow-lg">
        <h2 className="text-xl sm:text-2xl font-bold mb-1">Welcome, {user?.name}</h2>
        <p className="text-blue-100 text-sm">Manage patient reports and laboratory data from here.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white rounded-2xl p-5 border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-${stat.color}-50 flex items-center justify-center shrink-0`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-500`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick actions */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => navigate('/upload-report')}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-sky-50 hover:bg-sky-100 transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Upload className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-slate-700">Upload Report</span>
            </button>
            <button
              onClick={() => navigate('/patient-management')}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-slate-700">Manage Patients</span>
            </button>
            <button
              onClick={() => navigate('/notifications')}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-amber-50 hover:bg-amber-100 transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-slate-700">Notifications</span>
            </button>
          </div>
        </div>

        {/* Category breakdown */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-800 mb-4">Reports by Category</h3>
          <div className="space-y-3">
            {Object.entries(categoryStats).map(([cat, count]) => {
              const maxCount = Math.max(...Object.values(categoryStats));
              const pct = (count / maxCount) * 100;
              return (
                <div key={cat}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-slate-600">{cat}</span>
                    <span className="text-sm font-semibold text-slate-800">{count}</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-sky-500 transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent uploads */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden mt-6">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800">Recently Uploaded Reports</h3>
          <button
            onClick={() => navigate('/patient-management')}
            className="text-sm font-medium text-sky-600 hover:text-sky-700"
          >
            View All
          </button>
        </div>
        <div className="divide-y divide-slate-100">
          {recentUploads.length === 0 ? (
            <div className="p-8 text-center">
              <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm text-slate-500">No reports uploaded yet.</p>
            </div>
          ) : (
            recentUploads.map((report) => (
              <button
                key={report.id}
                onClick={() => navigate(`/report/${report.id}`)}
                className="w-full flex items-center gap-4 p-4 hover:bg-sky-50/50 transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-sky-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">{report.testName}</p>
                  <p className="text-xs text-slate-400">{report.patientName} • {report.category} • {report.reportDate}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium shrink-0 ${
                  report.status === 'Completed' ? 'bg-green-100 text-green-700' :
                  report.status === 'Processing' ? 'bg-sky-100 text-sky-700' :
                  'bg-amber-100 text-amber-700'
                }`}>
                  {report.status}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
