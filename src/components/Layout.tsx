import { Activity, LogIn, Home, Info, Phone, UserCog } from 'lucide-react';
import { useRouter } from '@/context/RouterContext';

export function PublicNavbar() {
  const { route, navigate } = useRouter();

  const links = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'About', path: '/about', icon: Info },
    { label: 'Contact', path: '/contact', icon: Phone },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-sky-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center group-hover:bg-sky-600 transition-colors">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <span className="block text-sm font-bold text-slate-800 leading-tight">
                Lab Report
              </span>
              <span className="block text-xs text-sky-500 leading-tight">
                Management System
              </span>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  route === link.path
                    ? 'text-sky-600 bg-sky-50'
                    : 'text-slate-600 hover:text-sky-600 hover:bg-sky-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/patient-login')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-sky-600 hover:bg-sky-50 transition-colors"
            >
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline">Patient Login</span>
            </button>
            <button
              onClick={() => navigate('/staff-login')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 transition-colors"
            >
              <UserCog className="w-4 h-4" />
              <span className="hidden sm:inline">Staff Login</span>
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <nav className="md:hidden flex items-center gap-1 pb-3 -mt-1">
          {links.map((link) => (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                route === link.path
                  ? 'text-sky-600 bg-sky-50'
                  : 'text-slate-600 hover:bg-sky-50'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  const { navigate } = useRouter();
  return (
    <footer className="bg-slate-800 text-slate-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white">LRMS</span>
            </div>
            <p className="text-sm text-slate-400">
              A comprehensive lab report management system for efficient patient and laboratory data handling.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Quick Links</h4>
            <div className="flex flex-col gap-2 text-sm">
              <button onClick={() => navigate('/')} className="text-left hover:text-sky-400 transition-colors">Home</button>
              <button onClick={() => navigate('/about')} className="text-left hover:text-sky-400 transition-colors">About Us</button>
              <button onClick={() => navigate('/contact')} className="text-left hover:text-sky-400 transition-colors">Contact</button>
              <button onClick={() => navigate('/patient-login')} className="text-left hover:text-sky-400 transition-colors">Patient Login</button>
              <button onClick={() => navigate('/staff-login')} className="text-left hover:text-sky-400 transition-colors">Staff Login</button>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Contact Info</h4>
            <div className="flex flex-col gap-2 text-sm text-slate-400">
              <span>123 Healthcare Blvd, Springfield</span>
              <span>Phone: (555) 123-4567</span>
              <span>Email: info@hospital-lab.com</span>
              <span>Hours: 24/7 Emergency Lab Services</span>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-700 mt-8 pt-6 text-center text-sm text-slate-500">
          &copy; 2024 Lab Report Management System. College CSE Project Prototype.
        </div>
      </div>
    </footer>
  );
}
