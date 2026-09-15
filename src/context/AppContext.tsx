import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Patient, LabReport, Notification, AuthUser } from '@/types';
import { mockPatients, mockReports, mockNotifications, staffCredentials } from '@/data/mockData';

interface AppContextValue {
  user: AuthUser | null;
  patients: Patient[];
  reports: LabReport[];
  notifications: Notification[];
  loginPatient: (email: string, password: string) => { success: boolean; error?: string };
  loginStaff: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  uploadReport: (report: Omit<LabReport, 'id'>) => void;
  markNotificationRead: (id: string) => void;
  currentPatient: Patient | null;
}

const AppContext = createContext<AppContextValue | null>(null);

const STORAGE_KEY = 'lrms_data_v1';
const AUTH_KEY = 'lrms_auth_v1';

interface StoredData {
  patients: Patient[];
  reports: LabReport[];
  notifications: Notification[];
}

function loadData(): StoredData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as StoredData;
      return {
        patients: parsed.patients ?? mockPatients,
        reports: parsed.reports ?? mockReports,
        notifications: parsed.notifications ?? mockNotifications,
      };
    }
  } catch {
    // fall through to defaults
  }
  return { patients: mockPatients, reports: mockReports, notifications: mockNotifications };
}

function saveData(data: StoredData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [data, setData] = useState<StoredData>(() => loadData());

  useEffect(() => {
    const raw = localStorage.getItem(AUTH_KEY);
    if (raw) {
      try {
        setUser(JSON.parse(raw) as AuthUser);
      } catch {
        localStorage.removeItem(AUTH_KEY);
      }
    }
  }, []);

  useEffect(() => {
    saveData(data);
  }, [data]);

  const loginPatient = useCallback(
    (email: string, password: string): { success: boolean; error?: string } => {
      const patient = data.patients.find(
        (p) => p.email.toLowerCase() === email.toLowerCase() && p.password === password
      );
      if (!patient) return { success: false, error: 'Invalid email or password. Please try again.' };
      const authUser: AuthUser = {
        role: 'patient',
        id: patient.id,
        name: patient.name,
        email: patient.email,
      };
      setUser(authUser);
      localStorage.setItem(AUTH_KEY, JSON.stringify(authUser));
      return { success: true };
    },
    [data.patients]
  );

  const loginStaff = useCallback(
    (email: string, password: string): { success: boolean; error?: string } => {
      if (
        email.toLowerCase() === staffCredentials.email.toLowerCase() &&
        password === staffCredentials.password
      ) {
        const authUser: AuthUser = {
          role: 'staff',
          id: staffCredentials.id,
          name: staffCredentials.name,
          email: staffCredentials.email,
        };
        setUser(authUser);
        localStorage.setItem(AUTH_KEY, JSON.stringify(authUser));
        return { success: true };
      }
      return { success: false, error: 'Invalid staff credentials. Please try again.' };
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(AUTH_KEY);
  }, []);

  const uploadReport = useCallback((report: Omit<LabReport, 'id'>) => {
    setData((prev) => {
      const id = 'R' + String(prev.reports.length + 1).padStart(3, '0');
      const newReport: LabReport = { ...report, id };
      const newNotif: Notification = {
        id: 'N' + String(prev.notifications.length + 1).padStart(3, '0'),
        userId: report.patientId,
        role: 'patient',
        title: 'New Report Available',
        message: `Your ${report.testName} report is now available for viewing.`,
        date: new Date().toISOString(),
        read: false,
        type: 'report',
      };
      return {
        ...prev,
        reports: [newReport, ...prev.reports],
        notifications: [newNotif, ...prev.notifications],
      };
    });
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    }));
  }, []);

  const currentPatient =
    user?.role === 'patient' ? data.patients.find((p) => p.id === user.id) ?? null : null;

  const value: AppContextValue = {
    user,
    patients: data.patients,
    reports: data.reports,
    notifications: data.notifications,
    loginPatient,
    loginStaff,
    logout,
    uploadReport,
    markNotificationRead,
    currentPatient,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
