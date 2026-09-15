import {
  FileText,
  User,
  Mail,
  Phone,
  Calendar,
  Droplet,
  MapPin,
  Clock,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useRouter } from '@/context/RouterContext';
import { DashboardLayout } from '@/components/DashboardLayout';
import type { LabReport } from '@/types';

export function PatientDashboard() {
  const { user, currentPatient, reports } = useApp();
  const { navigate } = useRouter();

  if (!currentPatient) {
    return (
      <DashboardLayout title="Dashboard">
        <div className="text-center py-20 text-slate-500">Loading patient information...</div>
      </DashboardLayout>
    );
  }

  const myReports = reports.filter((r) => r.patientId === currentPatient.id);
  const completedReports = myReports.filter((r) => r.status === 'Completed');
  const pendingReports = myReports.filter((r) => r.status !== 'Completed');
  const recentReports = myReports.slice(0, 4);

  const statusBadge = (status: LabReport['status']) => {
    const styles = {
      Completed: 'bg-green-100 text-green-700',
      Pending: 'bg-amber-100 text-amber-700',
      Processing: 'bg-sky-100 text-sky-700',
    };
    return styles[status];
  };

  const infoItems = [
    { icon: User, label: 'Patient ID', value: currentPatient.id },
    { icon: Calendar, label: 'Age', value: `${currentPatient.age} years` },
    { icon: User, label: 'Gender', value: currentPatient.gender },
    { icon: Droplet, label: 'Blood Group', value: currentPatient.bloodGroup },
    { icon: Phone, label: 'Phone', value: currentPatient.phone },
    { icon: Mail, label: 'Email', value: currentPatient.email },
    { icon: MapPin, label: 'Address', value: currentPatient.address },
    { icon: Calendar, label: 'Registered', value: currentPatient.registeredDate },
  ];

  const statCards = [
    { label: 'Total Reports', value: myReports.length, icon: FileText, color: 'sky' },
    { label: 'Completed', value: completedReports.length, icon: TrendingUp, color: 'green' },
    { label: 'Pending/Processing', value: pendingReports.length, icon: Clock, color: 'amber' },
  ];

  return (
    <DashboardLayout title="My Dashboard">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-sky-500 to-sky-600 rounded-2xl p-6 sm:p-8 text-white mb-6 shadow-lg">
        <h2 className="text-xl sm:text-2xl font-bold mb-1">Welcome back, {currentPatient.name}</h2>
        <p className="text-sky-100 text-sm">Here's an overview of your health records and lab reports.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white rounded-2xl p-5 border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-${stat.color}-50 flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-500`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient info */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800">Patient Information</h3>
          </div>
          <div className="p-5 space-y-3">
            {infoItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-sky-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-slate-400">{item.label}</p>
                    <p className="text-sm font-medium text-slate-700 truncate">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent reports */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-semibold text-slate-800">Recent Lab Reports</h3>
            <button
              onClick={() => navigate('/my-reports')}
              className="text-sm font-medium text-sky-600 hover:text-sky-700"
            >
              View All
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {recentReports.length === 0 ? (
              <div className="p-8 text-center">
                <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-sm text-slate-500">No reports available yet.</p>
              </div>
            ) : (
              recentReports.map((report) => (
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
                    <p className="text-xs text-slate-400">{report.category} • {report.reportDate}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium shrink-0 ${statusBadge(report.status)}`}>
                    {report.status}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
