import { useState, type FormEvent } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  User,
  Activity,
} from 'lucide-react';
import { PublicNavbar, Footer } from '@/components/Layout';
import { showToast } from '@/components/Toast';

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) {
      e.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Please enter a valid email';
    }
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.message.trim()) {
      e.message = 'Message is required';
    } else if (form.message.trim().length < 10) {
      e.message = 'Message must be at least 10 characters';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast('error', 'Please fix the errors in the form.');
      return;
    }
    showToast('success', 'Your message has been sent. We will get back to you soon!');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    { icon: Phone, label: 'Phone', value: '(555) 123-4567', sub: 'Mon-Fri 8am-8pm' },
    { icon: Mail, label: 'Email', value: 'info@hospital-lab.com', sub: '24/7 email support' },
    { icon: MapPin, label: 'Address', value: '123 Healthcare Blvd, Springfield', sub: 'Main Building, Floor 3' },
    { icon: Clock, label: 'Hours', value: '24/7 Emergency Lab', sub: 'Routine: Mon-Sun 7am-10pm' },
  ];

  const inputClass = (field: string) =>
    `w-full pl-10 pr-4 py-2.5 rounded-xl border bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
      errors[field]
        ? 'border-red-300 focus:ring-red-200'
        : 'border-slate-200 focus:border-sky-400 focus:ring-sky-100'
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicNavbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-sky-500 to-blue-700 text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6">
            <MessageSquare className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Get in Touch</h1>
          <p className="text-lg text-sky-100 max-w-2xl mx-auto">
            Have questions about your lab reports? We're here to help.
          </p>
        </div>
      </section>

      {/* Contact info cards */}
      <section className="py-12 -mt-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((info, i) => {
              const Icon = info.icon;
              return (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow text-center">
                  <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-sky-500" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-800">{info.label}</h3>
                  <p className="text-sm text-slate-600 mt-1">{info.value}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{info.sub}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-sky-500 to-sky-600 p-6 text-white">
              <h2 className="text-xl font-bold">Send Us a Message</h2>
              <p className="text-sky-100 text-sm mt-1">Fill out the form below and we'll respond within 24 hours.</p>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Your Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="John Doe"
                      className={inputClass('name')}
                    />
                  </div>
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      className={inputClass('email')}
                    />
                  </div>
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Subject *</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="Regarding my lab report..."
                  className={inputClass('subject')}
                />
                {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Message *</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Type your message here..."
                  rows={5}
                  className={`w-full px-4 py-2.5 rounded-xl border bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all resize-none ${
                    errors.message
                      ? 'border-red-300 focus:ring-red-200'
                      : 'border-slate-200 focus:border-sky-400 focus:ring-sky-100'
                  }`}
                />
                {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
              </div>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 text-white font-semibold hover:bg-sky-600 transition-colors shadow-lg shadow-sky-200"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-sky-50 flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-8 h-8 text-sky-500" />
              </div>
              <p className="text-slate-600 font-semibold">123 Healthcare Blvd, Springfield</p>
              <p className="text-sm text-slate-400 mt-1">Main Hospital Building, Laboratory Floor 3</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
