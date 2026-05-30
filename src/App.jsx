import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import IELTS from './pages/IELTS';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import ResetPassword from './pages/ResetPassword';

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow pt-28 md:pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ielts" element={<IELTS />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Routes>
          </main>
          <Footer />
          <Toaster 
            position="bottom-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1e293b',
                color: '#fff',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '12px',
              },
            }}
          />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;