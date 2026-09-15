import {
  ArrowLeft,
  FileText,
  Calendar,
  User,
  Stethoscope,
  Download,
  Printer,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useRouter } from '@/context/RouterContext';
import { DashboardLayout } from '@/components/DashboardLayout';
import { showToast } from '@/components/Toast';

export function ReportDetails() {
  const { reports, user } = useApp();
  const { params, navigate } = useRouter();

  const report = reports.find((r) => r.id === params.id);

  if (!report) {
    return (
      <DashboardLayout title="Report Details">
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <AlertCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-600 font-semibold">Report not found</p>
          <button
            onClick={() => navigate('/my-reports')}
            className="mt-4 px-4 py-2 rounded-lg bg-sky-500 text-white text-sm font-medium hover:bg-sky-600 transition-colors"
          >
            Back to Reports
          </button>
        </div>
      </DashboardLayout>
    );
  }

  // Access control: patient can only see their own reports
  if (user?.role === 'patient' && report.patientId !== user.id) {
    return (
      <DashboardLayout title="Report Details">
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <AlertCircle className="w-10 h-10 text-red-300 mx-auto mb-3" />
          <p className="text-slate-700 font-semibold">Access Denied</p>
          <p className="text-sm text-slate-400 mt-1">You can only view your own reports.</p>
        </div>
      </DashboardLayout>
    );
  }

  const statusColors = {
    Completed: 'bg-green-100 text-green-700 border-green-200',
    Pending: 'bg-amber-100 text-amber-700 border-amber-200',
    Processing: 'bg-sky-100 text-sky-700 border-sky-200',
  };

  const flagIcon = (flag: string) => {
    if (flag === 'High') return <TrendingUp className="w-3.5 h-3.5 text-red-500" />;
    if (flag === 'Low') return <TrendingDown className="w-3.5 h-3.5 text-amber-500" />;
    return <CheckCircle className="w-3.5 h-3.5 text-green-500" />;
  };

  const flagBadge = (flag: string) => {
    if (flag === 'High') return 'bg-red-50 text-red-600';
    if (flag === 'Low') return 'bg-amber-50 text-amber-600';
    return 'bg-green-50 text-green-600';
  };

  const infoItems = [
    { icon: FileText, label: 'Report ID', value: report.id },
    { icon: User, label: 'Patient', value: report.patientName },
    { icon: Stethoscope, label: 'Category', value: report.category },
    { icon: Calendar, label: 'Report Date', value: report.reportDate },
    { icon: Calendar, label: 'Collected Date', value: report.collectedDate },
    { icon: User, label: 'Technician', value: report.technician },
  ];

  const handleDownload = () => {
    const content = [
      '========================================',
      '     LABORATORY REPORT',
      '========================================',
      '',
      `Report ID:    ${report.id}`,
      `Patient:      ${report.patientName}`,
      `Test Name:    ${report.testName}`,
      `Category:     ${report.category}`,
      `Status:       ${report.status}`,
      `Report Date:  ${report.reportDate}`,
      `Collected:    ${report.collectedDate}`,
      `Technician:   ${report.technician}`,
      '',
      '----------------------------------------',
      'PARAMETERS',
      '----------------------------------------',
      ...report.parameters.map((p) => `  ${p.name}: ${p.value} ${p.unit} (Range: ${p.range}) [${p.flag}]`),
      '',
      '----------------------------------------',
      'NOTES',
      '----------------------------------------',
      `  ${report.notes}`,
      '',
      '========================================',
    ].join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `report_${report.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('success', 'Report downloaded successfully.');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <DashboardLayout title="Report Details">
      <button
        onClick={() => navigate(user?.role === 'staff' ? '/patient-management' : '/my-reports')}
        className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-sky-600 transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Reports
      </button>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        {/* Report header */}
        <div className="bg-gradient-to-r from-sky-500 to-sky-600 p-6 text-white">
          <div className="flex items-start justify-between flex-wrap gap-3">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{report.testName}</h2>
                <p className="text-sky-100 text-sm mt-0.5">{report.category}</p>
              </div>
            </div>
            <span className={`px-3 py-1.5 rounded-full text-sm font-semibold border ${statusColors[report.status]}`}>
              {report.status}
            </span>
          </div>
        </div>

        {/* Info grid */}
        <div className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            {infoItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm">
                    <Icon className="w-4 h-4 text-sky-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-400">{item.label}</p>
                    <p className="text-sm font-semibold text-slate-700 truncate">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Parameters table */}
          <div className="mb-6">
            <h3 className="font-semibold text-slate-800 mb-3">Test Parameters</h3>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-4 py-3 font-semibold text-slate-700">Parameter</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-700">Value</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-700 hidden sm:table-cell">Unit</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-700 hidden sm:table-cell">Reference Range</th>
                    <th className="text-center px-4 py-3 font-semibold text-slate-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {report.parameters.map((param, i) => (
                    <tr key={i} className="hover:bg-sky-50/30 transition-colors">
                      <td className="px-4 py-3 font-medium text-slate-700">{param.name}</td>
                      <td className="px-4 py-3 text-slate-800 font-semibold">{param.value}</td>
                      <td className="px-4 py-3 text-slate-500 hidden sm:table-cell">{param.unit}</td>
                      <td className="px-4 py-3 text-slate-500 hidden sm:table-cell">{param.range}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${flagBadge(param.flag)}`}>
                          {flagIcon(param.flag)}
                          {param.flag}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Notes */}
          <div className="mb-6">
            <h3 className="font-semibold text-slate-800 mb-2">Doctor's Notes</h3>
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
              <p className="text-sm text-amber-800 leading-relaxed">{report.notes}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={handleDownload}
              disabled={report.status !== 'Completed'}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 text-white text-sm font-semibold hover:bg-sky-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" />
              Download Report
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-sm font-semibold hover:bg-slate-200 transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
