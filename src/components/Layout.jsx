import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Github,
  Twitter, Command, ArrowRight, Music2, Sun, Moon, Bell, Settings, LogOut
} from 'lucide-react';
import { cn } from '../utils/helpers';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationsContext';
import { NotificationsPanel } from './NotificationsPanel';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '/#features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Contact', href: '/contact' },
];

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const { unreadCount } = useNotifications();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-surface-950/85 backdrop-blur-xl border-b border-surface-800/50'
            : 'bg-transparent',
          theme === 'light' && (isScrolled ? 'bg-white/85 border-gray-200/80' : 'bg-white/60')
        )}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center gap-6">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-glow-sm group-hover:shadow-glow transition-shadow duration-300">
                  <Music2 className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -inset-1 rounded-xl bg-brand-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="font-display font-bold text-xl text-white">
                Sampliq
              </span>
            </Link>

            {/* Center Navigation */}
            <div className="flex-1 hidden md:flex items-center justify-center gap-1">
              {navigation.map((item) => {
                const isActive =
                  (item.href === '/' && location.pathname === '/') ||
                  (item.href === '/pricing' && location.pathname === '/pricing') ||
                  (item.href === '/contact' && location.pathname === '/contact') ||
                  (item.href.startsWith('/#') && location.pathname === '/' && location.hash === `#${item.href.split('#')[1]}`);

                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      'px-3 py-2 rounded-lg text-sm font-medium transition-colors border',
                      isActive
                        ? theme === 'light'
                          ? 'bg-white text-gray-900 border-gray-200 shadow-sm'
                          : 'text-white bg-surface-800/60 border-surface-700/60'
                        : theme === 'light'
                          ? 'text-gray-600 border-transparent hover:text-gray-900 hover:bg-gray-100'
                          : 'text-surface-400 border-transparent hover:text-white hover:bg-surface-800/40'
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3 ml-auto">
              {isAuthenticated ? (
                <>
                  {/* Logged in state */}
                  <button
                    onClick={() => setShowNotifications(true)}
                    className="relative p-2 text-surface-400 hover:text-white rounded-lg hover:bg-surface-800/50 transition-colors"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-500 rounded-full" />
                    )}
                  </button>
                  <Link
                    to="/settings"
                    className="p-2 text-surface-400 hover:text-white rounded-lg hover:bg-surface-800/50 transition-colors"
                  >
                    <Settings className="w-5 h-5" />
                  </Link>
                  <Link to="/dashboard" className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-surface-800/50 transition-colors">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-500 to-accent-purple flex items-center justify-center text-white text-xs font-semibold">
                      JD
                    </div>
                    <span className="text-sm text-white hidden sm:inline">John Doe</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-surface-400 hover:text-white rounded-lg hover:bg-surface-800/50 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <>
                  {/* Not logged in state */}
                  <button
                    className="p-2 rounded-lg text-surface-400 hover:text-white hover:bg-surface-800/50 transition-colors"
                    title="Theme switch coming soon"
                    aria-disabled="true"
                  >
                    {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </button>

                  <button className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-800/50 border border-surface-700/50 text-surface-400 text-sm hover:text-white hover:border-surface-600 transition-all duration-200">
                    <Command className="w-3.5 h-3.5" />
                    <span className="text-xs">K</span>
                  </button>

                  <Link to="/login" className="btn btn-ghost text-sm hidden sm:flex">
                    Sign in
                  </Link>

                  <Link to="/dashboard" className="btn btn-primary">
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </>
              )}

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-surface-400 hover:text-white hover:bg-surface-800/50 transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </nav>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className={cn(
                'md:hidden border-t backdrop-blur-xl',
                theme === 'light'
                  ? 'border-gray-200 bg-white/95'
                  : 'border-surface-800/50 bg-surface-950/95'
              )}
            >
              <div
                className={cn(
                  'px-4 py-4 space-y-1 border-b',
                  theme === 'light' ? 'border-gray-200' : 'border-surface-800/40'
                )}
              >
                {navigation.map((item) => {
                  const isActive =
                    (item.href === '/' && location.pathname === '/') ||
                    (item.href === '/pricing' && location.pathname === '/pricing') ||
                    (item.href === '/contact' && location.pathname === '/contact') ||
                    (item.href.startsWith('/#') && location.pathname === '/' && location.hash === `#${item.href.split('#')[1]}`);

                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={cn(
                        'block px-4 py-3 rounded-xl text-base font-medium transition-colors border',
                        isActive
                          ? theme === 'light'
                            ? 'bg-white text-gray-900 border-gray-200 shadow-sm'
                            : 'bg-surface-800/60 text-white border-surface-700/60'
                          : theme === 'light'
                            ? 'text-gray-700 border-transparent hover:bg-gray-100'
                            : 'text-surface-400 border-transparent hover:text-white hover:bg-surface-800/40'
                      )}
                    >
                      <span className="flex items-center gap-2">
                        {item.name}
                        {item.badge && (
                          <span className="badge badge-brand text-2xs">{item.badge}</span>
                        )}
                      </span>
                    </Link>
                  );
                })}
              </div>

              <div className="px-4 py-4 space-y-3">
                <Link to="/login" className="btn btn-outline w-full justify-center">
                  Sign in
                </Link>
                <Link to="/dashboard" className="btn btn-primary w-full justify-center">
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      <NotificationsPanel open={showNotifications} onClose={() => setShowNotifications(false)} />
    </>
  );
}

function Footer() {
  const footerLinks = {
    Product: [
      { name: 'Pricing', href: '/pricing' },
      { name: 'Changelog', href: '#' },
      { name: 'Roadmap', href: '#' },
    ],
    Resources: [
      { name: 'Documentation', href: '#' },
      { name: 'API', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Community', href: '#' },
    ],
    Company: [
      { name: 'About', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Contact', href: '/contact' },
    ],
    Legal: [
      { name: 'Privacy', href: '#' },
      { name: 'Terms', href: '#' },
      { name: 'Licenses', href: '#' },
    ],
  };

  return (
    <footer className="relative border-t border-surface-800/50 bg-surface-950/50">
      <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
            <div className="col-span-2 md:col-span-1">
              <Link to="/" className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center">
                  <Music2 className="w-5 h-5 text-white" />
                </div>
                <span className="font-display font-bold text-lg text-white">Sampliq</span>
              </Link>
              <p className="text-sm text-surface-400 mb-6 max-w-xs">
                Find any sample instantly. Search across all major platforms in one place.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="text-surface-500 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-surface-500 hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>

            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="font-semibold text-white mb-4">{title}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link to={link.href} className="text-sm text-surface-400 hover:text-white transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="py-6 border-t border-surface-800/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-surface-500">© {new Date().getFullYear()} Sampliq. All rights reserved.</p>
            <div className="flex items-center gap-2 text-sm text-surface-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                All systems operational
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
