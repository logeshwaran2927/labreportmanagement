import { useState, type FormEvent } from 'react';
import { Upload, FileText, User, Tag, Calendar, Stethoscope, ClipboardList, Check } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useRouter } from '@/context/RouterContext';
import { DashboardLayout } from '@/components/DashboardLayout';
import { showToast } from '@/components/Toast';
import type { LabReport } from '@/types';

export function UploadReport() {
  const { patients, uploadReport, user } = useApp();
  const { navigate } = useRouter();

  const [form, setForm] = useState({
    patientId: '',
    testName: '',
    category: '',
    status: 'Completed' as LabReport['status'],
    collectedDate: new Date().toISOString().slice(0, 10),
    reportDate: new Date().toISOString().slice(0, 10),
    technician: user?.name ?? '',
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [paramRows, setParamRows] = useState([
    { name: '', value: '', unit: '', range: '', flag: 'Normal' as 'Normal' | 'High' | 'Low' },
  ]);

  const categories = ['Hematology', 'Biochemistry', 'Pathology', 'Endocrinology', 'Microbiology', 'Immunology'];

  const updateParam = (idx: number, field: string, value: string) => {
    setParamRows((prev) =>
      prev.map((p, i) => (i === idx ? { ...p, [field]: value } : p))
    );
  };

  const addParam = () => {
    setParamRows((prev) => [...prev, { name: '', value: '', unit: '', range: '', flag: 'Normal' }]);
  };

  const removeParam = (idx: number) => {
    setParamRows((prev) => prev.filter((_, i) => i !== idx));
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!form.patientId) e.patientId = 'Please select a patient';
    if (!form.testName.trim()) e.testName = 'Test name is required';
    if (!form.category) e.category = 'Please select a category';
    if (!form.technician.trim()) e.technician = 'Technician name is required';
    if (!form.reportDate) e.reportDate = 'Report date is required';
    if (!form.collectedDate) e.collectedDate = 'Collection date is required';
    if (paramRows.length === 0 || paramRows.every((p) => !p.name.trim())) {
      e.parameters = 'At least one test parameter is required';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast('error', 'Please fill in all required fields.');
      return;
    }

    const patient = patients.find((p) => p.id === form.patientId);
    if (!patient) {
      showToast('error', 'Selected patient not found.');
      return;
    }

    const validParams = paramRows.filter((p) => p.name.trim());

    uploadReport({
      patientId: patient.id,
      patientName: patient.name,
      testName: form.testName.trim(),
      category: form.category,
      status: form.status,
      reportDate: form.reportDate,
      collectedDate: form.collectedDate,
      technician: form.technician.trim(),
      notes: form.notes.trim() || 'No additional notes.',
      parameters: validParams,
    });

    showToast('success', `Report uploaded successfully for ${patient.name}.`);
    navigate('/staff-dashboard');
  };

  const inputClass = (field: string) =>
    `w-full pl-10 pr-4 py-2.5 rounded-xl border bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
      errors[field]
        ? 'border-red-300 focus:ring-red-200'
        : 'border-slate-200 focus:border-sky-400 focus:ring-sky-100'
    }`;

  return (
    <DashboardLayout title="Upload Report">
      <div className="mb-6">
        <p className="text-slate-500 text-sm">Upload a new laboratory report for a patient.</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        {/* Patient & Test Info */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-sky-500" />
            Report Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Patient *</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <select
                  value={form.patientId}
                  onChange={(e) => setForm({ ...form, patientId: e.target.value })}
                  className={inputClass('patientId')}
                >
                  <option value="">Select a patient...</option>
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.id} - {p.name} ({p.gender}, {p.age}y)
                    </option>
                  ))}
                </select>
              </div>
              {errors.patientId && <p className="text-xs text-red-500 mt-1">{errors.patientId}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Test Name *</label>
              <div className="relative">
                <ClipboardList className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={form.testName}
                  onChange={(e) => setForm({ ...form, testName: e.target.value })}
                  placeholder="e.g. Complete Blood Count"
                  className={inputClass('testName')}
                />
              </div>
              {errors.testName && <p className="text-xs text-red-500 mt-1">{errors.testName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Category *</label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className={inputClass('category')}
                >
                  <option value="">Select category...</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Collected Date *</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="date"
                  value={form.collectedDate}
                  onChange={(e) => setForm({ ...form, collectedDate: e.target.value })}
                  className={inputClass('collectedDate')}
                />
              </div>
              {errors.collectedDate && <p className="text-xs text-red-500 mt-1">{errors.collectedDate}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Report Date *</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="date"
                  value={form.reportDate}
                  onChange={(e) => setForm({ ...form, reportDate: e.target.value })}
                  className={inputClass('reportDate')}
                />
              </div>
              {errors.reportDate && <p className="text-xs text-red-500 mt-1">{errors.reportDate}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Status *</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as LabReport['status'] })}
                className={inputClass('status')}
              >
                <option value="Completed">Completed</option>
                <option value="Processing">Processing</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Technician *</label>
              <div className="relative">
                <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={form.technician}
                  onChange={(e) => setForm({ ...form, technician: e.target.value })}
                  placeholder="e.g. Dr. Alan Carter"
                  className={inputClass('technician')}
                />
              </div>
              {errors.technician && <p className="text-xs text-red-500 mt-1">{errors.technician}</p>}
            </div>
          </div>
        </div>

        {/* Parameters */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-sky-500" />
            Test Parameters
          </h3>
          {errors.parameters && <p className="text-xs text-red-500 mb-3">{errors.parameters}</p>}
          <div className="space-y-3">
            {paramRows.map((param, idx) => (
              <div key={idx} className="grid grid-cols-1 sm:grid-cols-6 gap-2 items-start p-3 rounded-xl bg-slate-50">
                <input
                  type="text"
                  value={param.name}
                  onChange={(e) => updateParam(idx, 'name', e.target.value)}
                  placeholder="Parameter name"
                  className="sm:col-span-2 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-400"
                />
                <input
                  type="text"
                  value={param.value}
                  onChange={(e) => updateParam(idx, 'value', e.target.value)}
                  placeholder="Value"
                  className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-400"
                />
                <input
                  type="text"
                  value={param.unit}
                  onChange={(e) => updateParam(idx, 'unit', e.target.value)}
                  placeholder="Unit"
                  className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-400"
                />
                <input
                  type="text"
                  value={param.range}
                  onChange={(e) => updateParam(idx, 'range', e.target.value)}
                  placeholder="Ref. range"
                  className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-400"
                />
                <div className="flex gap-1">
                  <select
                    value={param.flag}
                    onChange={(e) => updateParam(idx, 'flag', e.target.value)}
                    className="flex-1 px-2 py-2 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-400"
                  >
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Low">Low</option>
                  </select>
                  {paramRows.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeParam(idx)}
                      className="px-2 py-2 rounded-lg text-red-400 hover:bg-red-50 transition-colors text-sm"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addParam}
            className="mt-3 flex items-center gap-1.5 text-sm font-medium text-sky-600 hover:text-sky-700"
          >
            + Add Parameter
          </button>
        </div>

        {/* Notes */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-800 mb-3">Doctor's Notes</h3>
          <textarea
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            placeholder="Enter clinical notes or recommendations..."
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-400 resize-none"
          />
        </div>

        {/* Submit */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 text-white font-semibold hover:bg-sky-600 transition-colors shadow-lg shadow-sky-200"
          >
            <Upload className="w-4 h-4" />
            Upload Report
          </button>
          <button
            type="button"
            onClick={() => navigate('/staff-dashboard')}
            className="px-6 py-3 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
}
