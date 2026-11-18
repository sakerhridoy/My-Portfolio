import './App.css';
import { Fragment, lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useParams, useLocation } from 'react-router-dom';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import Hero from './Components/Hero';
import Navbar from './Components/Navbar';
import Plans from './Components/Plans';
import Project from './Components/Projects';
import Service from './Components/Service';
import ThankYou from './Components/Thankyou';
import About from './Components/About';
import Experience from './Components/Experience';
import Timeline from './Components/Timeline';
import Testimonials from './Components/Testimonials';
import FAQ from './Components/FAQ';
import Resume from './Components/Resume';
import Achievements from './Components/Achievements';
import GitHubActivity from './Components/GitHubActivity';
import Blog from './Components/Blog';
import DocumentMeta from './Components/DocumentMeta';
import AiChatConfig from './Components/AiChatConfig';
import AiAssistant from './Components/AiAssistant';
import DigitalProducts from './Components/DigitalProducts';
const ProductDetails = lazy(() => import('./Pages/ProductDetails'));


import { HelmetProvider, Helmet } from 'react-helmet-async';
import { useSite } from './site/SiteContext';

const SeoHead = () => {
  const { settings } = useSite();
  if (!settings) return null;
  const getStr = (val) => (typeof val === 'string' ? val : val?.url || '');
  return (
    <Helmet>
      <title>{settings.siteTitle || 'Portfolio'}</title>
    </Helmet>
  );
};

import { AuthProvider } from './admin/auth/AuthContext';
import { SiteProvider } from './site/SiteContext';
import { resources } from './admin/config/resources';

const ProtectedRoute = lazy(() => import('./admin/auth/ProtectedRoute'));
const AdminLayout = lazy(() => import('./admin/layout/AdminLayout'));
const Login = lazy(() => import('./admin/pages/Login'));
const Dashboard = lazy(() => import('./admin/pages/Dashboard'));
const ProjectsList = lazy(() => import('./admin/pages/ProjectsList'));
const ProjectForm = lazy(() => import('./admin/pages/ProjectForm'));
const LeadsInbox = lazy(() => import('./admin/pages/LeadsInbox'));
const ResourceManager = lazy(() => import('./admin/pages/ResourceManager'));
const SettingsForm = lazy(() => import('./admin/pages/SettingsForm'));
const ResumeForm = lazy(() => import('./admin/pages/ResumeForm'));
const DigitalProductsManager = lazy(() => import('./admin/pages/DigitalProducts/DigitalProductsManager'));
const UsersList = lazy(() => import('./admin/pages/UsersList'));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); }, [pathname]);
  return null;
};

import GlobalBackground from './Components/Three/Scenes/GlobalBackground';

const PublicLayout = () => (
  <>
    <GlobalBackground />
    <Navbar />
    <Outlet />
    <Footer />
    <AiAssistant />
  </>
);

const HomePage = () => (
  <>
    <Hero />
    <About />
    <Experience />
    <Timeline />
    <Achievements />
    <Service />
    <Project />
    <DigitalProducts />
    <GitHubActivity />
    <Blog />
    <Testimonials />
    <FAQ />
    <Plans />
    <Resume />
    <Contact />
  </>
);

const buildAdminRoutes = () => (
  <Route element={<AdminLayout />}>
    <Route index element={<Dashboard />} />
    <Route path="projects" element={<ProjectsList />} />
    <Route path="projects/new" element={<ProjectForm />} />
    <Route path="projects/:id/edit" element={<ProjectForm />} />
    <Route path="leads" element={<LeadsInbox />} />
    {resources.map((r) => (
      <Fragment key={r.key}>
        <Route path={r.key} element={<ResourceManager resourceKey={r.key} mode="list" />} />
        <Route path={`${r.key}/new`} element={<ResourceManager resourceKey={r.key} mode="form" />} />
        <Route path={`${r.key}/:id/edit`} element={<ResourceManager resourceKey={r.key} mode="form" />} />
      </Fragment>
    ))}
    <Route path="digital-products" element={<DigitalProductsManager />} />
    <Route path="settings" element={<SettingsForm />} />
    <Route path="resume" element={<ResumeForm />} />
    <Route path="users" element={<UsersList />} />
  </Route>
);

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <AuthProvider>
          <SiteProvider>
            <SeoHead />
            <DocumentMeta />
            <AiChatConfig />
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/admin/login" element={<Login />} />
                <Route path="/admin" element={<ProtectedRoute />}>{buildAdminRoutes()}</Route>
                <Route path="/:username/admin/login" element={<Login />} />
                <Route path="/:username/admin" element={<ProtectedRoute />}>{buildAdminRoutes()}</Route>
                <Route element={<PublicLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/:username" element={<HomePage />} />
                  <Route path="/thankyou" element={<ThankYou />} />
                  <Route path="/products/:id" element={<ProductDetails />} />
                  <Route path="/:username/products/:id" element={<ProductDetails />} />
                  
                  <Route path="/:username/products/:id" element={<ProductDetails />} />
                  <Route path="/:username/thankyou" element={<ThankYou />} />
                </Route>
              </Routes>
            </Suspense>
          </SiteProvider>
        </AuthProvider>
      </Router>
    </HelmetProvider>
  );
}
export default App;
