import { useState } from 'react';
import { FileText, Search, Download, Eye, AlertCircle, Filter } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useRouter } from '@/context/RouterContext';
import { DashboardLayout } from '@/components/DashboardLayout';
import type { LabReport } from '@/types';

export function MyReports() {
  const { user, reports } = useApp();
  const { navigate } = useRouter();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | LabReport['status']>('all');

  const myReports = reports.filter((r) => r.patientId === user?.id);

  const filtered = myReports.filter((r) => {
    const matchesSearch =
      r.testName.toLowerCase().includes(search.toLowerCase()) ||
      r.category.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || r.status === filter;
    return matchesSearch && matchesFilter;
  });

  const statusBadge = (status: LabReport['status']) => {
    const styles = {
      Completed: 'bg-green-100 text-green-700',
      Pending: 'bg-amber-100 text-amber-700',
      Processing: 'bg-sky-100 text-sky-700',
    };
    return styles[status];
  };

  const filterOptions: ('all' | LabReport['status'])[] = ['all', 'Completed', 'Pending', 'Processing'];

  const handleDownload = (report: LabReport) => {
    const content = generateReportText(report);
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `report_${report.id}_${report.testName.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout title="My Reports">
      <div className="mb-6">
        <p className="text-slate-500 text-sm">View and download all your laboratory reports.</p>
      </div>

      {/* Search and filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by test name or category..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-400"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-400"
          >
            {filterOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt === 'all' ? 'All Reports' : opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Reports list */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <AlertCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">No reports found</p>
          <p className="text-sm text-slate-400 mt-1">Try adjusting your search or filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg hover:border-sky-200 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl bg-sky-50 flex items-center justify-center shrink-0 group-hover:bg-sky-500 transition-colors">
                    <FileText className="w-5 h-5 text-sky-500 group-hover:text-white transition-colors" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-slate-800 text-sm leading-tight">{report.testName}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{report.category}</p>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium shrink-0 ${statusBadge(report.status)}`}>
                  {report.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                <div>
                  <p className="text-slate-400">Report Date</p>
                  <p className="font-medium text-slate-700">{report.reportDate}</p>
                </div>
                <div>
                  <p className="text-slate-400">Technician</p>
                  <p className="font-medium text-slate-700 truncate">{report.technician}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/report/${report.id}`)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-sky-50 text-sky-600 text-sm font-medium hover:bg-sky-100 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button
                  onClick={() => handleDownload(report)}
                  disabled={report.status !== 'Completed'}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-slate-50 text-slate-600 text-sm font-medium hover:bg-slate-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

function generateReportText(report: LabReport): string {
  const lines = [
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
  ];
  report.parameters.forEach((p) => {
    lines.push(`  ${p.name}: ${p.value} ${p.unit} (Range: ${p.range}) [${p.flag}]`);
  });
  lines.push('', '----------------------------------------', 'NOTES', '----------------------------------------');
  lines.push(`  ${report.notes}`, '', '========================================', '  This is a system-generated report.', '========================================');
  return lines.join('\n');
}
