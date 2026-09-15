import {
  Activity,
  Target,
  Eye,
  Users,
  Award,
  Shield,
  Microscope,
  HeartPulse,
  Stethoscope,
  FlaskConical,
  Building2,
} from 'lucide-react';
import { PublicNavbar, Footer } from '@/components/Layout';
import { useRouter } from '@/context/RouterContext';

export function AboutPage() {
  const { navigate } = useRouter();

  const values = [
    { icon: Shield, title: 'Data Security', desc: 'Patient data is protected with role-based access and secure authentication.' },
    { icon: Award, title: 'Quality', desc: 'Accurate and timely lab results you can trust for critical decisions.' },
    { icon: Users, title: 'Patient First', desc: 'Designed with patients in mind for easy access to their health data.' },
  ];

  const team = [
    { icon: Microscope, name: 'Dr. Alan Carter', role: 'Chief Pathologist', desc: 'Over 15 years of experience in clinical pathology.' },
    { icon: FlaskConical, name: 'Dr. Lisa Chen', role: 'Biochemist', desc: 'Specialist in biochemical and metabolic testing.' },
    { icon: HeartPulse, name: 'Dr. James Reed', role: 'Hematologist', desc: 'Expert in blood disorders and hematological analysis.' },
    { icon: Stethoscope, name: 'Dr. Maria Lopez', role: 'Lab Director', desc: 'Oversees all laboratory operations and quality control.' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicNavbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-sky-500 to-blue-700 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6">
            <Activity className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">About Our Lab Report Management System</h1>
          <p className="text-lg text-sky-100 max-w-2xl mx-auto">
            A digital platform designed to streamline laboratory report management for both patients and healthcare staff.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-sky-50 border border-sky-100">
              <div className="w-12 h-12 rounded-xl bg-sky-500 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-3">Our Mission</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                To provide a seamless digital experience for managing laboratory reports, empowering
                patients with easy access to their health data while enabling healthcare staff to
                efficiently upload, manage, and track laboratory results.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-blue-50 border border-blue-100">
              <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-3">Our Vision</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                To digitize and modernize the healthcare laboratory workflow, reducing paper-based
                processes and enabling instant access to critical medical information for better
                patient outcomes and faster clinical decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Core Values</h2>
            <p className="text-slate-500">What drives us to deliver the best service.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((val, i) => {
              const Icon = val.icon;
              return (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 text-center hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 rounded-2xl bg-sky-500 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">{val.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Our Medical Team</h2>
            <p className="text-slate-500">Experienced professionals dedicated to your health.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => {
              const Icon = member.icon;
              return (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 text-center hover:shadow-lg transition-shadow group">
                  <div className="w-16 h-16 rounded-2xl bg-sky-50 flex items-center justify-center mx-auto mb-4 group-hover:bg-sky-500 transition-colors">
                    <Icon className="w-8 h-8 text-sky-500 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-semibold text-slate-800">{member.name}</h3>
                  <p className="text-sm text-sky-600 font-medium mt-0.5">{member.role}</p>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{member.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Facility */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-sky-500 flex items-center justify-center mb-5">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Our Laboratory Facility</h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Our state-of-the-art laboratory is equipped with the latest diagnostic technology and
                staffed by certified professionals. We handle thousands of tests monthly across
                hematology, biochemistry, pathology, and endocrinology.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  24/7 emergency lab services
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  Certified by national health authorities
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  Digital report delivery system
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  Quality-controlled testing procedures
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 p-6 flex flex-col justify-end text-white">
                <p className="text-3xl font-bold">15+</p>
                <p className="text-sm text-sky-100">Test Categories</p>
              </div>
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 p-6 flex flex-col justify-end text-white mt-8">
                <p className="text-3xl font-bold">5K+</p>
                <p className="text-sm text-blue-100">Monthly Tests</p>
              </div>
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-cyan-400 to-cyan-600 p-6 flex flex-col justify-end text-white -mt-8">
                <p className="text-3xl font-bold">99%</p>
                <p className="text-sm text-cyan-100">Accuracy Rate</p>
              </div>
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 p-6 flex flex-col justify-end text-white mt-8">
                <p className="text-3xl font-bold">24/7</p>
                <p className="text-sm text-teal-100">Availability</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Ready to Get Started?</h2>
          <p className="text-slate-500 mb-6">Access your lab reports or log in as staff to manage data.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => navigate('/patient-login')}
              className="px-6 py-3 rounded-xl bg-sky-500 text-white font-semibold hover:bg-sky-600 transition-colors"
            >
              Patient Portal
            </button>
            <button
              onClick={() => navigate('/staff-login')}
              className="px-6 py-3 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors"
            >
              Staff Portal
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
