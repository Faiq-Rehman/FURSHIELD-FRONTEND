import { Route, Routes } from 'react-router-dom';
import PublicLayout from '../Layouts/PublicLayout';
import OwnerLayout from '../Layouts/OwnerLayout';
import VetLayout from '../Layouts/VetLayout';
import ShelterLayout from '../Layouts/ShelterLayout';
import AdminLayout from '../Layouts/AdminLayout';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';

// Public Pages
import Home from '../Pages/Public/Home';
import Products from '../Pages/Public/Products';
import ProductDetails from '../Pages/Public/ProductDetails';
import Adoptions from '../Pages/Public/Adoptions';
import AdoptionDetails from '../Pages/Public/AdoptionDetails';
import Vets from '../Pages/Public/Vets';
import VetDetails from '../Pages/Public/VetDetails';
import Shelters from '../Pages/Public/Shelters';
import ShelterDetails from '../Pages/Public/ShelterDetails';
import Care from '../Pages/Public/Care';
import About from '../Pages/Public/About';
import Contact from '../Pages/Public/Contact';
import Login from '../Pages/Auth/Login';
import Register from '../Pages/Auth/Register';

// Dedicated Admin Login Page
import AdminLogin from '../Pages/Admin/AdminLogin';

// Owner Pages
import OwnerDashboard from '../Pages/Owner/OwnerDashboard';
import MyPets from '../Pages/Owner/MyPets';
import AddPet from '../Pages/Owner/AddPet';
import EditPet from '../Pages/Owner/EditPet';
import PetDetails from '../Pages/Owner/PetDetails';
import HealthRecords from '../Pages/Owner/HealthRecords';
import Appointments from '../Pages/Owner/Appointments';
import AppointmentDetails from '../Pages/Owner/AppointmentDetails';
import Cart from '../Pages/Owner/Cart';
import Orders from '../Pages/Owner/Orders';
import OrderDetails from '../Pages/Owner/OrderDetails';
import Profile from '../Pages/Owner/Profile';

// Vet Pages
import VetDashboard from '../Pages/Vet/VetDashboard';
import VetAppointments from '../Pages/Vet/Appointments';
import VetAppointmentDetails from '../Pages/Vet/AppointmentDetails';
import VetPatients from '../Pages/Vet/Patients';
import VetPatientDetails from '../Pages/Vet/PatientDetails';
import VetTreatment from '../Pages/Vet/Treatment';
import VetAvailability from '../Pages/Vet/Availability';
import VetProfile from '../Pages/Vet/Profile';

// Shelter Pages
import ShelterDashboard from '../Pages/Shelter/ShelterDashboard';
import ShelterPets from '../Pages/Shelter/ShelterPets';
import ShelterAddPet from '../Pages/Shelter/AddPet';
import ShelterEditPet from '../Pages/Shelter/EditPet';
import AdoptionRequests from '../Pages/Shelter/AdoptionRequests';
import ShelterProfile from '../Pages/Shelter/Profile';

// Admin Pages
import AdminDashboard from '../Pages/Admin/AdminDashboard';
import AdminProducts from '../Pages/Admin/AdminProducts';
import AdminShelters from '../Pages/Admin/AdminShelters';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Standalone Separate Admin Login Page */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Public Site Layout & Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/adoptions" element={<Adoptions />} />
        <Route path="/adoptions/:id" element={<AdoptionDetails />} />
        <Route path="/vets" element={<Vets />} />
        <Route path="/vets/:id" element={<VetDetails />} />
        <Route path="/shelters" element={<Shelters />} />
        <Route path="/shelters/:id" element={<ShelterDetails />} />
        <Route path="/care" element={<Care />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Pet Owner Protected Routes */}
      <Route element={<ProtectedRoute role="owner" />}>
        <Route element={<OwnerLayout />}>
          <Route path="/owner" element={<OwnerDashboard />} />
          <Route path="/owner/pets" element={<MyPets />} />
          <Route path="/owner/pets/add" element={<AddPet />} />
          <Route path="/owner/pets/:id" element={<PetDetails />} />
          <Route path="/owner/pets/:id/edit" element={<EditPet />} />
          <Route path="/owner/health-records" element={<HealthRecords />} />
          <Route path="/owner/appointments" element={<Appointments />} />
          <Route path="/owner/appointments/:id" element={<AppointmentDetails />} />
          <Route path="/owner/orders" element={<Orders />} />
          <Route path="/owner/orders/:id" element={<OrderDetails />} />
          <Route path="/owner/profile" element={<Profile />} />
        </Route>
      </Route>

      <Route path="/cart" element={<PublicLayout />}>
        <Route index element={<Cart />} />
      </Route>

      {/* Veterinarian Protected Routes */}
      <Route element={<ProtectedRoute role="vet" />}>
        <Route element={<VetLayout />}>
          <Route path="/vet" element={<VetDashboard />} />
          <Route path="/vet/appointments" element={<VetAppointments />} />
          <Route path="/vet/appointments/:id" element={<VetAppointmentDetails />} />
          <Route path="/vet/patients" element={<VetPatients />} />
          <Route path="/vet/patients/:id" element={<VetPatientDetails />} />
          <Route path="/vet/treatment" element={<VetTreatment />} />
          <Route path="/vet/availability" element={<VetAvailability />} />
          <Route path="/vet/profile" element={<VetProfile />} />
        </Route>
      </Route>

      {/* Animal Shelter Protected Routes */}
      <Route element={<ProtectedRoute role="shelter" />}>
        <Route element={<ShelterLayout />}>
          <Route path="/shelter" element={<ShelterDashboard />} />
          <Route path="/shelter/pets" element={<ShelterPets />} />
          <Route path="/shelter/add-pet" element={<ShelterAddPet />} />
          <Route path="/shelter/pets/:id/edit" element={<ShelterEditPet />} />
          <Route path="/shelter/requests" element={<AdoptionRequests />} />
          <Route path="/shelter/profile" element={<ShelterProfile />} />
        </Route>
      </Route>

      {/* Dedicated Admin Protected Routes */}
      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/shelters" element={<AdminShelters />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Route>
      </Route>

      <Route path="*" element={<Home />} />
    </Routes>
  );
}
