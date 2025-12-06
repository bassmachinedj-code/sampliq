import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search, Filter, ChevronRight, Music2, Settings, Bell,
  LogOut, Home, History, Heart, HelpCircle, X,
  Sun, Moon, ChevronDown, Menu,
  Package, Folder, Star
} from 'lucide-react';
import { cn } from '../utils/helpers';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { SampleCard } from '../components/SampleCard';
import { useNotifications } from '../context/NotificationsContext';
import { NotificationsPanel } from '../components/NotificationsPanel';

function Sidebar({ activeSection, onSectionChange, isOpen, onClose }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onClose();
    navigate('/');
  };

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'favorites', icon: Heart, label: 'Favorites' },
    { id: 'history', icon: History, label: 'History' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 bottom-0 w-64 bg-surface-950 border-r border-surface-800/50 z-50 flex flex-col transition-transform duration-300",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
      <div className="p-5 border-b border-surface-800/50">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center">
            <Music2 className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-lg text-white">Sampliq</span>
        </Link>
      </div>

      <div className="p-4">
        <Link to="/" className="btn btn-primary w-full justify-center">
          <Search className="w-4 h-4" />
          <span>New Search</span>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.id}>
              {item.link ? (
                <Link
                  to={item.link}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                    activeSection === item.id
                      ? 'bg-surface-800/70 text-white'
                      : 'text-surface-400 hover:text-white hover:bg-surface-800/50'
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              ) : (
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                    activeSection === item.id
                      ? 'bg-surface-800/70 text-white'
                      : 'text-surface-400 hover:text-white hover:bg-surface-800/50'
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <h4 className="px-3 text-xs font-semibold text-surface-500 uppercase tracking-wider mb-2">
            Collections
          </h4>
          <ul className="space-y-1">
            {['Lo-Fi Project', 'Trap Beats', 'Ambient Textures'].map((collection) => (
              <li key={collection}>
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-surface-400 hover:text-white hover:bg-surface-800/50 transition-colors">
                  <Folder className="w-4 h-4" />
                  <span>{collection}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="p-3 border-t border-surface-800/50">
        <Link to="/pricing" className="btn btn-primary w-full justify-center mb-3">
          <span>Upgrade Plan</span>
        </Link>
        <ul className="space-y-1">
          <li>
            <Link
              to="/billing"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-surface-400 hover:text-white hover:bg-surface-800/50 transition-colors"
            >
              <Package className="w-5 h-5" />
              <span>Billing</span>
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-surface-400 hover:text-white hover:bg-surface-800/50 transition-colors"
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-surface-400 hover:text-white hover:bg-surface-800/50 transition-colors"
            >
              <HelpCircle className="w-5 h-5" />
              <span>Help</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="p-4 border-t border-surface-800/50">
        <div className="space-y-2">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-900/50 border border-surface-800/50">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-accent-purple flex items-center justify-center text-white font-semibold text-sm">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">John Doe</p>
              <p className="text-xs text-surface-500 truncate">Pro Plan</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-500/30 transition-colors font-medium"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
    </>
  );
}

function TopBar({ showNotifications, setShowNotifications, onMenuClick }) {
  const { theme } = useTheme();
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { unreadCount } = useNotifications();

  const handleLogout = () => {
    logout();
    setShowAccountMenu(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-30 bg-surface-950/80 backdrop-blur-xl border-b border-surface-800/50">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 text-surface-400 hover:text-white rounded-lg hover:bg-surface-800/50 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link to="/" className="flex items-center gap-2 lg:hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center">
              <Music2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-white">Sampliq</span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/pricing" className="btn btn-primary btn-sm hidden md:flex">Upgrade</Link>
          <button
            className="p-2 text-surface-400 hover:text-white rounded-lg hover:bg-surface-800/50 transition-colors"
            title="Theme switch coming soon"
            aria-disabled="true"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
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
          <div className="w-px h-6 bg-surface-800" />
          <div className="relative">
            <button
              onClick={() => setShowAccountMenu(!showAccountMenu)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-surface-800/50 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-500 to-accent-purple flex items-center justify-center text-white text-xs font-semibold">
                JD
              </div>
              <span className="hidden md:inline text-sm text-white font-medium">John Doe</span>
              <ChevronDown className="w-4 h-4 text-surface-400 hidden md:inline" />
            </button>
            {showAccountMenu && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-surface-900 border border-surface-700 rounded-xl shadow-xl py-2 z-50">
                <div className="px-4 py-3 border-b border-surface-800">
                  <p className="text-sm font-medium text-white">John Doe</p>
                  <p className="text-xs text-surface-400">Pro Plan</p>
                </div>
                <Link
                  to="/settings"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-surface-300 hover:text-white hover:bg-surface-800/50 transition-colors"
                  onClick={() => setShowAccountMenu(false)}
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </Link>
                <Link
                  to="/pricing"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-surface-300 hover:text-white hover:bg-surface-800/50 transition-colors"
                  onClick={() => setShowAccountMenu(false)}
                >
                  <Star className="w-4 h-4" />
                  <span>Upgrade Plan</span>
                </Link>
                <div className="border-t border-surface-800 my-2"></div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-surface-300 hover:text-white hover:bg-surface-800/50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function ModalShell({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full max-w-lg card p-6 z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 text-surface-400 hover:text-white rounded-lg hover:bg-surface-800/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState('home');
  const [recentSamples, setRecentSamples] = useState([
    { id: '1', name: 'Deep 808 Kick - Trap Essential', bpm: 140, key: 'C', platform: 'Splice', genre: 'Trap', category: 'Drum', starred: true, query: 'kick trap', date: '2025-12-05', filters: { genre: 'Trap', bpm: '140' } },
    { id: '2', name: 'Lo-Fi Piano Chords - Dusty', bpm: 85, key: 'Am', platform: 'Loopcloud', genre: 'Lo-Fi Hip-Hop', category: 'Keys', starred: false, query: 'lo-fi piano', date: '2025-12-05', filters: { mood: 'Chill', bpm: '80-90' } },
    { id: '3', name: 'Ambient Pad - Ethereal', bpm: 120, key: 'F', platform: 'LANDR', genre: 'Ambient', category: 'Pad', starred: true, query: 'ambient pads atmospheric', date: '2025-12-04', filters: { genre: 'Ambient' } },
    { id: '4', name: 'Trap Hi-Hat Roll - Fast', bpm: 145, key: '-', platform: 'Splice', genre: 'Trap', category: 'Drum', starred: false, query: 'trap hi-hats', date: '2025-12-04', filters: { genre: 'Trap' } },
    { id: '5', name: 'Vocal Chop - RnB Female', bpm: 95, key: 'Eb', platform: 'Sounds.com', genre: 'RnB', category: 'Vocal', starred: false, query: 'vocal chops RnB', date: '2025-12-03', filters: { genre: 'RnB', category: 'Vocal' } },
  ]);
  const [filterSettings, setFilterSettings] = useState({ onlyStarred: false, platform: 'all' });
  const [searchHistory, setSearchHistory] = useState([
    { id: 'h1', query: '808 kick trap', date: '2025-12-05T10:00:00Z', filters: { genre: 'Trap', bpmMin: 130, bpmMax: 150, key: 'C', mood: 'Dark', type: 'One-Shot' }, providers: ['Splice', 'Loopcloud'], results: 42 },
    { id: 'h2', query: 'lo-fi piano', date: '2025-12-04T17:30:00Z', filters: { genre: 'Lo-Fi Hip-Hop', bpmMin: 80, bpmMax: 95, mood: 'Chill', key: 'Am', type: 'Loop' }, providers: ['Loopcloud'], results: 28 },
    { id: 'h3', query: 'ambient pads atmospheric', date: '2025-12-04T08:15:00Z', filters: { genre: 'Ambient', bpmMin: 60, bpmMax: 90, mood: 'Atmospheric', type: 'Loop' }, providers: ['LANDR', 'Sounds.com'], results: 33 },
    { id: 'h4', query: 'vocal chops rnb', date: '2025-12-03T13:45:00Z', filters: { genre: 'RnB', bpmMin: 90, bpmMax: 105, mood: 'Emotional', type: 'One-Shot' }, providers: ['Sounds.com'], results: 19 },
  ]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  // Auto-login quando entra nel dashboard
  useEffect(() => {
    if (!isAuthenticated) {
      login();
    }
  }, [isAuthenticated, login]);

  const allProviders = ['Splice', 'Loopcloud', 'LANDR', 'Sounds.com', 'Noiiz', 'Producer Loops'];

  const formatHistoryDate = (dateStr) => {
    const date = new Date(dateStr);
    if (Number.isNaN(date)) return dateStr;
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const formatHistoryTime = (dateStr) => {
    const date = new Date(dateStr);
    if (Number.isNaN(date)) return '';
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  const rerunSearch = (entry) => {
    const params = new URLSearchParams();
    if (entry.query) params.set('q', entry.query);
    if (entry.filters?.genre) params.set('genre', entry.filters.genre);
    if (entry.filters?.mood) params.set('mood', entry.filters.mood);
    if (entry.filters?.key) params.set('key', entry.filters.key);
    if (entry.filters?.type) params.set('type', entry.filters.type);
    if (entry.filters?.bpmMin) params.set('bpmMin', entry.filters.bpmMin);
    if (entry.filters?.bpmMax) params.set('bpmMax', entry.filters.bpmMax);
    if (entry.providers?.length) {
      if (entry.providers.length < allProviders.length) {
        params.set('providers', entry.providers.join(','));
      }
    }
    navigate(`/search?${params.toString()}`);
  };

  const toggleStar = (id) => {
    setRecentSamples(recentSamples.map(s => s.id === id ? { ...s, starred: !s.starred } : s));
  };

  const platformOptions = ['all', ...new Set(recentSamples.map((sample) => sample.platform))];
  const filteredSamples = recentSamples.filter((sample) => {
    if (filterSettings.onlyStarred && !sample.starred) return false;
    if (filterSettings.platform !== 'all' && filterSettings.platform !== '' && sample.platform !== filterSettings.platform) return false;
    return true;
  });

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <>
            <div className="mb-8">
              <h1 className="text-2xl font-display font-bold text-white mb-2">Welcome back, John</h1>
              <p className="text-surface-400">Find your next sound or continue where you left off.</p>
            </div>

            <section className="mb-10">
              <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link to="/?focus=search" className="card card-hover p-5 group">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center mb-4">
                    <Search className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">New Search</h3>
                  <p className="text-sm text-surface-400">Find samples across all platforms</p>
                </Link>
                <button onClick={() => setActiveSection('favorites')} className="card card-hover p-5 group text-left">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-purple to-violet-500 flex items-center justify-center mb-4">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">Favorites</h3>
                  <p className="text-sm text-surface-400">View your saved samples</p>
                </button>
                <button onClick={() => setActiveSection('history')} className="card card-hover p-5 group text-left">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-cyan to-blue-500 flex items-center justify-center mb-4">
                    <History className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">History</h3>
                  <p className="text-sm text-surface-400">Recent searches and downloads</p>
                </button>
                <Link to="/settings" className="card card-hover p-5 group">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-emerald to-teal-500 flex items-center justify-center mb-4">
                    <Settings className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">Settings</h3>
                  <p className="text-sm text-surface-400">Manage your account</p>
                </Link>
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Recent Samples</h2>
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="btn btn-ghost btn-sm"
                >
                  <Filter className="w-4 h-4" />
                  <span className="hidden sm:inline">Filter</span>
                </button>
              </div>

              {filteredSamples.length === 0 ? (
                <div className="card p-6 text-center text-surface-400">
                  No samples match the current filters.
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredSamples.map((sample) => (
                    <SampleCard key={sample.id} sample={sample} onToggleStar={toggleStar} />
                  ))}
                </div>
              )}

              <div className="mt-6 text-center">
                <button className="btn btn-ghost" onClick={() => setActiveSection('history')}>
                  View All History
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </section>
          </>
        );

      case 'favorites': {
        const favoriteSamples = filteredSamples.filter(s => s.starred);
        return (
          <div>
            <h1 className="text-2xl font-display font-bold text-white mb-6">Favorites</h1>
            {favoriteSamples.length === 0 ? (
              <div className="card p-12 text-center">
                <div className="w-16 h-16 rounded-2xl bg-surface-800/50 flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-surface-500" />
                </div>
                <p className="text-white font-semibold mb-2">No favorites yet</p>
                <p className="text-surface-400 text-sm">Your favorite samples will appear here</p>
              </div>
            ) : (
              <div className="space-y-2">
                {favoriteSamples.map((sample) => (
                  <SampleCard key={sample.id} sample={sample} onToggleStar={toggleStar} />
                ))}
              </div>
            )}
          </div>
        );
      }

      case 'history': {
        const groupedHistory = searchHistory.reduce((acc, entry) => {
          const label = formatHistoryDate(entry.date);
          if (!acc[label]) acc[label] = [];
          acc[label].push(entry);
          return acc;
        }, {});

        return (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-display font-bold text-white">Search History</h1>
                <p className="text-sm text-surface-400 mt-1">{searchHistory.length} saved searches</p>
              </div>
              <button
                onClick={() => setSearchHistory([])}
                className="btn btn-ghost btn-sm text-red-400 hover:text-red-300 hover:bg-red-500/10"
              >
                <X className="w-4 h-4" />
                Clear History
              </button>
            </div>

            {searchHistory.length === 0 ? (
              <div className="card p-12 text-center">
                <div className="w-16 h-16 rounded-2xl bg-surface-800/50 flex items-center justify-center mx-auto mb-4">
                  <History className="w-8 h-8 text-surface-500" />
                </div>
                <p className="text-white font-semibold mb-2">No search history yet</p>
                <p className="text-surface-400 text-sm">Your recently searched prompts will appear here</p>
              </div>
            ) : (
              <div className="space-y-6">
                {Object.entries(groupedHistory).map(([dateLabel, entries]) => (
                  <div key={dateLabel} className="space-y-3">
                    <div className="flex items-center gap-3 mb-4">
                      <h2 className="text-sm font-semibold text-white">{dateLabel}</h2>
                      <div className="flex-1 h-px bg-surface-800"></div>
                      <span className="text-xs text-surface-500">{entries.length} searches</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {entries.map((entry) => {
                        const bpmText = entry.filters?.bpmMin || entry.filters?.bpmMax
                          ? `${entry.filters.bpmMin || 'min'} - ${entry.filters.bpmMax || 'max'} BPM`
                          : null;
                        return (
                          <div key={entry.id} className="card p-5 space-y-3">
                            <div className="flex items-start justify-between gap-3">
                              <div className="space-y-1">
                                <p className="text-xs text-surface-500">{formatHistoryTime(entry.date)}</p>
                                <h3 className="text-lg font-semibold text-white">{entry.query}</h3>
                                {entry.providers?.length > 0 && (
                                  <p className="text-xs text-surface-500">
                                    Providers: {entry.providers.join(', ')}
                                  </p>
                                )}
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                <span className="text-xs px-2 py-1 rounded-full bg-surface-800 text-surface-200">
                                  {entry.results} results
                                </span>
                                <button
                                  className="btn btn-secondary btn-sm"
                                  onClick={() => rerunSearch(entry)}
                                >
                                  Search again
                                </button>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {entry.filters?.genre && (
                                <span className="px-3 py-1 rounded-full bg-surface-800/60 text-surface-200 text-xs">
                                  Genre: {entry.filters.genre}
                                </span>
                              )}
                              {entry.filters?.mood && (
                                <span className="px-3 py-1 rounded-full bg-surface-800/60 text-surface-200 text-xs">
                                  Mood: {entry.filters.mood}
                                </span>
                              )}
                              {entry.filters?.key && (
                                <span className="px-3 py-1 rounded-full bg-surface-800/60 text-surface-200 text-xs">
                                  Key: {entry.filters.key}
                                </span>
                              )}
                              {entry.filters?.type && (
                                <span className="px-3 py-1 rounded-full bg-surface-800/60 text-surface-200 text-xs">
                                  Type: {entry.filters.type}
                                </span>
                              )}
                              {bpmText && (
                                <span className="px-3 py-1 rounded-full bg-surface-800/60 text-surface-200 text-xs">
                                  {bpmText}
                                </span>
                              )}
                              {entry.providers?.length > 0 && entry.providers.length < allProviders.length && (
                                <span className="px-3 py-1 rounded-full bg-surface-800/60 text-surface-200 text-xs">
                                  Providers: {entry.providers.join(', ')}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center justify-between">
                              <button
                                className="btn btn-ghost btn-sm"
                                onClick={() => rerunSearch(entry)}
                              >
                                Reuse prompt
                              </button>
                              <button
                                className="text-xs text-surface-500 hover:text-red-300"
                                onClick={() => setSearchHistory((items) => items.filter((item) => item.id !== entry.id))}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      }

      default:
        return (
          <div className="card p-12 text-center">
            <h2 className="text-xl font-semibold text-white mb-2">Coming Soon</h2>
            <p className="text-surface-400">This section is under development</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-surface-950">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={(section) => {
          setActiveSection(section);
          setIsMobileMenuOpen(false);
        }}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <div className="lg:pl-64">
        <TopBar
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
          onMenuClick={() => setIsMobileMenuOpen(true)}
        />
        <main className="p-4 md:p-6">
          <div className="flex justify-end mb-4 md:hidden">
            <Link to="/pricing" className="btn btn-primary btn-sm">Upgrade</Link>
          </div>
          {renderContent()}
        </main>
      </div>

      {isFilterOpen && (
        <ModalShell title="Filter samples" onClose={() => setIsFilterOpen(false)}>
          <div className="space-y-4">
            <label className="flex items-center gap-3 text-sm text-surface-300">
              <input
                type="checkbox"
                checked={filterSettings.onlyStarred}
                onChange={(e) => setFilterSettings({ ...filterSettings, onlyStarred: e.target.checked })}
                className="rounded border-surface-700 text-brand-500"
              />
              Show only favorites
            </label>
            <div>
              <p className="text-xs text-surface-500 mb-2">Platform</p>
              <div className="flex flex-wrap gap-2">
                {platformOptions.map((platform) => (
                  <button
                    key={platform}
                    onClick={() => setFilterSettings({ ...filterSettings, platform })}
                    className={cn(
                      'px-3 py-2 rounded-lg text-sm border transition-colors',
                      filterSettings.platform === platform
                        ? 'bg-brand-500/15 border-brand-500/40 text-brand-400'
                        : 'border-surface-700/50 text-surface-300 hover:text-white hover:border-surface-600'
                    )}
                  >
                    {platform === 'all' ? 'All platforms' : platform}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="btn btn-ghost"
                onClick={() => setFilterSettings({ onlyStarred: false, platform: 'all' })}
              >
                Reset
              </button>
              <button className="btn btn-primary" onClick={() => setIsFilterOpen(false)}>
                Apply filters
              </button>
            </div>
          </div>
        </ModalShell>
      )}

      <NotificationsPanel open={showNotifications} onClose={() => setShowNotifications(false)} />
    </div>
  );
}
