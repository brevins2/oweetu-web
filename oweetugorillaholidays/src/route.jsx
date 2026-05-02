import React, { useEffect } from "react"
import { Route, Routes, Navigate, useLocation } from "react-router-dom"
import SafariDetails from "./pages/SafariDetails"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { AuthProvider, useAuth } from './context/AuthContext';

const Gallery = React.lazy(() => import("./pages/Gallery"));
const Dashboard = React.lazy(() => import("./layout/Dashboard"));
const LoginPage = React.lazy(() => import("./pages/Login"));
const HomePage = React.lazy(() => import("./pages/HomePage"))
const ContactPage = React.lazy(() => import("./pages/ContactPage"))
const AboutPage = React.lazy(() => import("./pages/AboutPage"))
const SafarisPage = React.lazy(() => import("./pages/SafarisPage"))
const DestinationPages = React.lazy(() => import("./pages/DestinationPages"))
const DestinationDetailPage = React.lazy(() => import("./pages/DestinationDetailPage"))
const BookPage = React.lazy(() => import("./pages/BookPage"))
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"))
const CountryPage = React.lazy(() => import("./pages/CountryPage"))

const LazyLoader = ({ children }) => {
  return (
    <React.Suspense fallback={
      <div className="flex justify-center items-center h-screen gap-4 text-gray-500">
        <AiOutlineLoading3Quarters className="animate-spin font-bold text-green-600" size={30} />
      </div>
    }>
      {children}
    </React.Suspense>
  )
}

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <AiOutlineLoading3Quarters className="animate-spin" size={30} />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/access" replace />;
  }

  return children;
};

function AppRoutes() {
  const location = useLocation();

  const getPageTitle = (pathname) => {
    const titles = {
      '/': 'Home',
      '/contact': 'Contact Us',
      '/about': 'About Us',
      '/safaris': 'Safaris',
      '/destinations': 'Destinations',
      '/gallery': 'Gallery',
      '/access': 'Access',
      '/bookings': 'Bookings',
      '/mgt': 'Management'
    };

    if (pathname.startsWith('/safaris/')) {
      return 'Safari Details';
    }
    if (pathname.startsWith('/destinations/')) {
      if (pathname.includes('/country/')) {
        return 'Country Details';
      }
      return 'Destination Details';
    }
    if (pathname.startsWith('/mgt/')) {
      return 'Management Dashboard';
    }

    return titles[pathname] || 'Page Not Found';
  };

  useEffect(() => {
    const pageTitle = getPageTitle(location.pathname);
    document.title = `${pageTitle} - Oweetu Gorilla Holidays`;
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<LazyLoader><HomePage /></LazyLoader>} />
      <Route path="/contact" element={<LazyLoader><ContactPage /></LazyLoader>} />
      <Route path="/about" element={<LazyLoader><AboutPage /></LazyLoader>} />
      <Route path="/safaris" element={<LazyLoader><SafarisPage /></LazyLoader>} />
      <Route path="/destinations" element={<LazyLoader><DestinationPages /></LazyLoader>} />
      <Route path="/destinations/:TAG" element={<LazyLoader><DestinationDetailPage /></LazyLoader>} />
      <Route path="/destinations/country/:country" element={<LazyLoader><CountryPage /></LazyLoader>} />
      <Route path="/safaris/:id" element={<LazyLoader><SafariDetails /></LazyLoader>} />
      <Route path="/bookings" element={<LazyLoader><BookPage /></LazyLoader>} />
      <Route path="/gallery" element={<LazyLoader><Gallery /></LazyLoader>} />
      <Route path="/access" element={<LazyLoader><LoginPage /></LazyLoader>} />

      <Route path="/mgt/*" element={
        <ProtectedRoute>
          <LazyLoader>
            <Dashboard />
          </LazyLoader>
        </ProtectedRoute>
      } />

      <Route path="*" element={<LazyLoader><ErrorPage /></LazyLoader>} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;