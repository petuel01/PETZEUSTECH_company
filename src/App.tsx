import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ZeusAIAssistant } from './components/ZeusAIAssistant';
import { TechSnowBackground } from './components/TechSnowBackground';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Projects } from './pages/Projects';
import { Blog } from './pages/Blog';
import { Contact } from './pages/Contact';
import { BookService } from './pages/BookService';
import { CustomerDashboard } from './pages/CustomerDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { Academy } from './pages/Academy';
import { User } from './types';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { motion, AnimatePresence } from 'motion/react';

function AppContent() {
  const { isDark } = useTheme();
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [pageParam, setPageParam] = useState<string | undefined>(undefined);
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('petzeustech_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Secret URL listener for Admin access (not exposed on public navbar)
  React.useEffect(() => {
    const handleUrlCheck = () => {
      const hash = window.location.hash.toLowerCase();
      const search = new URLSearchParams(window.location.search);
      const path = window.location.pathname.toLowerCase();

      if (
        hash === '#admin-portal' || 
        hash === '#portal' || 
        hash === '#admin' || 
        hash === '#login' ||
        search.get('portal') === 'admin' ||
        search.get('admin') === 'access' ||
        search.get('admin') === 'petuel' ||
        path.includes('admin-portal')
      ) {
        setCurrentPage('signin');
      }
    };

    handleUrlCheck();
    window.addEventListener('hashchange', handleUrlCheck);
    return () => window.removeEventListener('hashchange', handleUrlCheck);
  }, []);

  const handleNavigate = (page: string, param?: string) => {
    setCurrentPage(page);
    setPageParam(param);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('petzeustech_user', JSON.stringify(user));
    if (user.role === 'admin') {
      handleNavigate('admin-dashboard');
    } else {
      handleNavigate('customer-dashboard');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('petzeustech_user');
    handleNavigate('home');
  };

  // Render the current view
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'about':
        return <About onNavigate={handleNavigate} />;
      case 'services':
        return <Services onNavigate={handleNavigate} initialDepartment={pageParam} />;
      case 'projects':
        return <Projects onNavigate={handleNavigate} initialProjectId={pageParam} />;
      case 'academy':
        return <Academy onNavigate={handleNavigate} />;
      case 'blog':
        return <Blog onNavigate={handleNavigate} />;
      case 'contact':
        return <Contact />;
      case 'book':
        return (
          <BookService 
            initialSelection={pageParam} 
            currentUser={currentUser} 
            onNavigate={handleNavigate} 
          />
        );
      case 'customer-dashboard':
        return <CustomerDashboard currentUser={currentUser} onNavigate={handleNavigate} />;
      case 'admin-dashboard':
        return <AdminDashboard currentUser={currentUser} onNavigate={handleNavigate} />;
      case 'signin':
        return <SignIn onSuccess={handleLoginSuccess} onNavigate={handleNavigate} />;
      case 'signup':
        return <SignUp onSuccess={handleLoginSuccess} onNavigate={handleNavigate} />;
      case 'privacy':
        return <PrivacyPolicy onNavigate={handleNavigate} />;
      case 'terms':
        return <TermsOfService onNavigate={handleNavigate} />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans relative transition-colors duration-300 ${
      isDark 
        ? 'bg-[#070817] text-slate-100 selection:bg-purple-600 selection:text-white' 
        : 'bg-[#f8fafc] text-slate-900 selection:bg-purple-500 selection:text-white'
    }`}>
      {/* Global Tech Snowfall Animated Canvas & Tech Background Switcher */}
      <TechSnowBackground />

      {/* Navigation Bar with Light/Dark Mode Switcher */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Content Area with Smooth Slide and Fade Animations */}
      <main className="flex-1 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage + (pageParam || '')}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-full"
          >
            {renderCurrentPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Interactive ZeusAI Tech Consultation Assistant */}
      <ZeusAIAssistant
        onNavigateToBook={(dept, serv) => {
          const param = dept && serv ? `${dept} - ${serv}` : dept;
          handleNavigate('book', param);
        }}
      />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
