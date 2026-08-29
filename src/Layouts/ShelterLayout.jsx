import { ClipboardList, HeartHandshake, LayoutDashboard, PawPrint, User } from 'lucide-react';
import { DashboardLayout } from './OwnerLayout';

const shelterLinks = [
  [LayoutDashboard, 'Overview', '/shelter'],
  [PawPrint, 'Pet Listings', '/shelter/pets'],
  [HeartHandshake, 'Adoption Requests', '/shelter/requests'],
  [ClipboardList, 'Add New Pet', '/shelter/add-pet'],
  [User, 'Shelter Profile', '/shelter/profile']
];

export default function ShelterLayout() {
  return (
    <DashboardLayout
      title="Shelter Partner Portal"
      roleLabel="Shelter Partner"
      roleColor="amber"
      links={shelterLinks}
    />
  );
}
