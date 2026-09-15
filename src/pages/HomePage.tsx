import {
  Activity,
  FileText,
  Users,
  Shield,
  Clock,
  Download,
  Stethoscope,
  Microscope,
  HeartPulse,
  ArrowRight,
} from 'lucide-react';
import { useRouter } from '@/context/RouterContext';
import { PublicNavbar, Footer } from '@/components/Layout';

export function HomePage() {
  const { navigate } = useRouter();

  const features = [
    {
      icon: FileText,
      title: 'Digital Reports',
      desc: 'Access lab reports online anytime, anywhere. No more paper records.',
    },
    {
      icon: Shield,
      title: 'Secure Access',
      desc: 'Separate patient and staff portals with role-based authentication.',
    },
    {
      icon: Clock,
      title: 'Quick Turnaround',
      desc: 'Get notified as soon as your lab results are ready for viewing.',
    },
    {
      icon: Download,
      title: 'Easy Download',
      desc: 'Download and print your reports with a single click.',
    },
  ];

  const stats = [
    { value: '5,000+', label: 'Reports Generated' },
    { value: '1,200+', label: 'Patients Served' },
    { value: '24/7', label: 'Lab Service' },
    { value: '15+', label: 'Test Categories' },
  ];

  const services = [
    { icon: HeartPulse, title: 'Hematology', desc: 'Complete blood counts and blood disorder analysis.' },
    { icon: Microscope, title: 'Biochemistry', desc: 'Lipid profiles, liver function, and glucose testing.' },
    { icon: Stethoscope, title: 'Pathology', desc: 'Urine analysis, tissue examination, and more.' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicNavbar />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-sky-500 via-sky-600 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-sky-300 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-sm font-medium mb-6">
              <Activity className="w-4 h-4" />
              College CSE Project Prototype
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Lab Report Management System
            </h1>
            <p className="text-lg sm:text-xl text-sky-100 mb-8 leading-relaxed">
              A modern digital platform for managing laboratory reports. Patients can
              view and download results, while staff can upload and manage reports efficiently.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/patient-login')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-sky-600 font-semibold hover:bg-sky-50 transition-all shadow-lg hover:shadow-xl"
              >
                Patient Portal
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('/staff-login')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-700 text-white font-semibold hover:bg-sky-800 transition-all border border-sky-400"
              >
                Staff Portal
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-sky-600">{stat.value}</p>
                <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-3">Key Features</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Everything you need to manage lab reports digitally, designed for both patients and healthcare staff.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center mb-4 group-hover:bg-sky-500 transition-colors">
                    <Icon className="w-6 h-6 text-sky-500 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-3">Our Lab Services</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Comprehensive laboratory testing across multiple medical disciplines.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <div key={i} className="p-8 rounded-2xl bg-white border border-slate-200 hover:shadow-xl transition-all text-center">
                  <div className="w-16 h-16 rounded-2xl bg-sky-500 flex items-center justify-center mx-auto mb-5">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">{service.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{service.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-3xl p-8 sm:p-12 text-center text-white">
            <Users className="w-12 h-12 mx-auto mb-4 opacity-90" />
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Ready to Access Your Reports?</h2>
            <p className="text-sky-100 mb-6 max-w-xl mx-auto">
              Log in to the patient portal to view your lab results, or staff portal to manage reports.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => navigate('/patient-login')}
                className="px-6 py-3 rounded-xl bg-white text-sky-600 font-semibold hover:bg-sky-50 transition-colors"
              >
                Login as Patient
              </button>
              <button
                onClick={() => navigate('/staff-login')}
                className="px-6 py-3 rounded-xl bg-sky-700 text-white font-semibold hover:bg-sky-800 transition-colors border border-sky-400"
              >
                Login as Staff
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
