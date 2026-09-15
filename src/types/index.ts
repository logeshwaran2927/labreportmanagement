export type Role = 'patient' | 'staff' | null;

export interface Patient {
  id: string;
  name: string;
  email: string;
  password: string;
  age: number;
  gender: string;
  phone: string;
  bloodGroup: string;
  address: string;
  registeredDate: string;
}

export interface LabReport {
  id: string;
  patientId: string;
  patientName: string;
  testName: string;
  category: string;
  status: 'Completed' | 'Pending' | 'Processing';
  reportDate: string;
  collectedDate: string;
  technician: string;
  notes: string;
  parameters: { name: string; value: string; unit: string; range: string; flag: 'Normal' | 'High' | 'Low' }[];
}

export interface Notification {
  id: string;
  userId: string;
  role: Role;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'report' | 'system' | 'appointment';
}

export interface AuthUser {
  role: Role;
  id: string;
  name: string;
  email: string;
}
