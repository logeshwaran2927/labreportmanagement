import { useState } from 'react';
import {
  Search,
  Users,
  FileText,
  Eye,
  Phone,
  Mail,
  Droplet,
  Calendar,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useRouter } from '@/context/RouterContext';
import { DashboardLayout } from '@/components/DashboardLayout';
import type { Patient } from '@/types';

export function PatientManagement() {
  const { patients, reports } = useApp();
  const { navigate } = useRouter();
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      p.bloodGroup.toLowerCase().includes(search.toLowerCase())
  );

  const getPatientReports = (patientId: string) => reports.filter((r) => r.patientId === patientId);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <DashboardLayout title="Patient Management">
      <div className="mb-6">
        <p className="text-slate-500 text-sm">Search patients and view their laboratory reports.</p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, ID, email, or blood group..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-400"
        />
      </div>

      {/* Patient list */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <AlertCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">No patients found</p>
          <p className="text-sm text-slate-400 mt-1">Try a different search term.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((patient) => {
            const patientReports = getPatientReports(patient.id);
            const isExpanded = expandedId === patient.id;
            return (
              <div
                key={patient.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-sky-200 transition-colors"
              >
                {/* Patient header */}
                <button
                  onClick={() => toggleExpand(patient.id)}
                  className="w-full flex items-center gap-4 p-4 hover:bg-sky-50/30 transition-colors text-left"
                >
                  <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-sky-600">{patient.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-slate-800 text-sm">{patient.name}</p>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-xs font-medium text-slate-500">{patient.id}</span>
                      <span className="px-2 py-0.5 rounded-md bg-red-50 text-xs font-medium text-red-600">
                        <Droplet className="w-3 h-3 inline mr-0.5" />
                        {patient.bloodGroup}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {patient.gender}, {patient.age}y • {patient.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-50 text-sky-600">
                      <FileText className="w-3.5 h-3.5" />
                      <span className="text-xs font-semibold">{patientReports.length}</span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </button>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="border-t border-slate-100 p-4 bg-slate-50/50">
                    {/* Patient info grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                      {[
                        { icon: Phone, label: 'Phone', value: patient.phone },
                        { icon: Mail, label: 'Email', value: patient.email },
                        { icon: Calendar, label: 'Registered', value: patient.registeredDate },
                        { icon: Users, label: 'Gender', value: patient.gender },
                      ].map((item, i) => {
                        const Icon = item.icon;
                        return (
                          <div key={i} className="p-3 rounded-xl bg-white border border-slate-100">
                            <div className="flex items-center gap-1.5 mb-1">
                              <Icon className="w-3.5 h-3.5 text-slate-400" />
                              <span className="text-xs text-slate-400">{item.label}</span>
                            </div>
                            <p className="text-sm font-medium text-slate-700 truncate">{item.value}</p>
                          </div>
                        );
                      })}
                    </div>

                    {/* Reports */}
                    <h4 className="text-sm font-semibold text-slate-700 mb-2">Lab Reports ({patientReports.length})</h4>
                    {patientReports.length === 0 ? (
                      <p className="text-sm text-slate-400 py-3 text-center">No reports on file.</p>
                    ) : (
                      <div className="space-y-2">
                        {patientReports.map((report) => (
                          <button
                            key={report.id}
                            onClick={() => navigate(`/report/${report.id}`)}
                            className="w-full flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-100 hover:border-sky-200 hover:bg-sky-50/30 transition-all text-left"
                          >
                            <div className="w-9 h-9 rounded-lg bg-sky-50 flex items-center justify-center shrink-0">
                              <FileText className="w-4 h-4 text-sky-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-slate-700 truncate">{report.testName}</p>
                              <p className="text-xs text-slate-400">{report.category} • {report.reportDate}</p>
                            </div>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${
                              report.status === 'Completed' ? 'bg-green-100 text-green-700' :
                              report.status === 'Processing' ? 'bg-sky-100 text-sky-700' :
                              'bg-amber-100 text-amber-700'
                            }`}>
                              {report.status}
                            </span>
                            <Eye className="w-4 h-4 text-slate-400 shrink-0" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
}
