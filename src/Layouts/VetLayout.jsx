import { CalendarDays, ClipboardPlus, LayoutDashboard, Stethoscope, User } from 'lucide-react';
import { DashboardLayout } from './OwnerLayout';

const vetLinks = [
  [LayoutDashboard, 'Overview', '/vet'],
  [CalendarDays, 'Appointments', '/vet/appointments'],
  [Stethoscope, 'Patients', '/vet/patients'],
  [ClipboardPlus, 'Treatments & RX', '/vet/treatment'],
  [User, 'Clinic Profile', '/vet/profile']
];

export default function VetLayout() {
  return (
    <DashboardLayout
      title="Veterinarian Portal"
      roleLabel="Veterinarian"
      roleColor="teal"
      links={vetLinks}
    />
  );
}
