import { AppProvider, useApp } from '@/context/AppContext';
import { RouterProvider, useRouter } from '@/context/RouterContext';
import { ToastContainer } from '@/components/Toast';
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { PatientDashboard } from '@/pages/PatientDashboard';
import { MyReports } from '@/pages/MyReports';
import { ReportDetails } from '@/pages/ReportDetails';
import { StaffDashboard } from '@/pages/StaffDashboard';
import { UploadReport } from '@/pages/UploadReport';
import { PatientManagement } from '@/pages/PatientManagement';
import { Notifications } from '@/pages/Notifications';
import { AboutPage } from '@/pages/AboutPage';
import { ContactPage } from '@/pages/ContactPage';
import { useEffect } from 'react';

function Router() {
  const { route } = useRouter();
  const { user } = useApp();

  // Guard: dashboard routes require auth
  const patientRoutes = ['/patient-dashboard', '/my-reports'];
  const staffRoutes = ['/staff-dashboard', '/upload-report', '/patient-management'];
  const protectedRoute = [...patientRoutes, ...staffRoutes, '/notifications'];

  useEffect(() => {
    if (protectedRoute.includes(route) && !user) {
      window.location.hash = '/';
    }
    if (patientRoutes.includes(route) && user?.role === 'staff') {
      window.location.hash = '/staff-dashboard';
    }
    if (staffRoutes.includes(route) && user?.role === 'patient') {
      window.location.hash = '/patient-dashboard';
    }
  }, [route, user]);

  // Report details route
  const reportMatch = route.match(/^\/report\/(.+)$/);

  if (route === '/') return <HomePage />;
  if (route === '/patient-login') return <LoginPage role="patient" />;
  if (route === '/staff-login') return <LoginPage role="staff" />;
  if (route === '/patient-dashboard') return <PatientDashboard />;
  if (route === '/my-reports') return <MyReports />;
  if (reportMatch) return <ReportDetails />;
  if (route === '/staff-dashboard') return <StaffDashboard />;
  if (route === '/upload-report') return <UploadReport />;
  if (route === '/patient-management') return <PatientManagement />;
  if (route === '/notifications') return <Notifications />;
  if (route === '/about') return <AboutPage />;
  if (route === '/contact') return <ContactPage />;

  return <HomePage />;
}

function App() {
  return (
    <AppProvider>
      <RouterProvider>
        <Router />
        <ToastContainer />
      </RouterProvider>
    </AppProvider>
  );
}

export default App;
