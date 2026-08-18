import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import Home from '@/pages/Home';
import CitizenDashboard from '@/pages/CitizenDashboard';
import ProjectMapPage from '@/pages/ProjectMapPage';
import ProjectDetails from '@/pages/ProjectDetails';
import FundTracking from '@/pages/FundTracking';
import Analytics from '@/pages/Analytics';
import Feedback from '@/pages/Feedback';
import AdminPortal from '@/pages/AdminPortal';
import Login from '@/pages/Login';
import About from '@/pages/About';
import { AuthProvider } from '@/services/AuthContext';
import { LanguageProvider } from '@/services/LanguageContext';
import { ToastProvider } from '@/services/ToastContext';

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <ToastProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<CitizenDashboard />} />
                <Route path="/map" element={<ProjectMapPage />} />
                <Route path="/projects/:id" element={<ProjectDetails />} />
                <Route path="/funds" element={<FundTracking />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/admin" element={<AdminPortal />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
