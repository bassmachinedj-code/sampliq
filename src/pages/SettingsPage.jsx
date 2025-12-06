import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User, Lock, CreditCard, Bell, Globe, Palette, Trash2,
  Save, ArrowLeft, CheckCircle2, Shield, Key, Download, ExternalLink
} from 'lucide-react';
import { cn } from '../utils/helpers';
import { useTheme } from '../context/ThemeContext';

function SettingSection({ icon: Icon, title, description, children }) {
  return (
    <div className="card p-6">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-10 h-10 rounded-xl bg-brand-500/15 flex items-center justify-center text-brand-400 flex-shrink-0">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
          <p className="text-sm text-surface-400">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const { theme } = useTheme();
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    username: 'johndoe',
  });
  const [notifications, setNotifications] = useState({
    email: true,
    newSamples: true,
    weeklyDigest: false,
    productUpdates: true,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-surface-950">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-surface-950/80 backdrop-blur-xl border-b border-surface-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/dashboard"
                className="p-2 text-surface-400 hover:text-white rounded-lg hover:bg-surface-800/50 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-xl font-display font-bold text-white">Settings</h1>
                <p className="text-sm text-surface-400">Manage your account and preferences</p>
              </div>
            </div>
            {saved && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-emerald/10 border border-accent-emerald/20 text-accent-emerald"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-sm font-medium">Changes saved</span>
              </motion.div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="space-y-6">
          {/* Profile Section */}
          <SettingSection
            icon={User}
            title="Profile"
            description="Manage your personal information"
          >
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-surface-400 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-surface-400 mb-2">Username</label>
                  <input
                    type="text"
                    value={profile.username}
                    onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                    className="input"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-surface-400 mb-2">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="input"
                />
              </div>
              <button onClick={handleSave} className="btn btn-primary">
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </SettingSection>

          {/* Security Section */}
          <SettingSection
            icon={Shield}
            title="Security"
            description="Keep your account secure"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-surface-800/30 border border-surface-700/50">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-surface-400" />
                  <div>
                    <p className="text-sm font-medium text-white">Password</p>
                    <p className="text-xs text-surface-500">Last changed 3 months ago</p>
                  </div>
                </div>
                <button className="btn btn-secondary btn-sm">Change Password</button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-surface-800/30 border border-surface-700/50">
                <div className="flex items-center gap-3">
                  <Key className="w-5 h-5 text-surface-400" />
                  <div>
                    <p className="text-sm font-medium text-white">Two-Factor Authentication</p>
                    <p className="text-xs text-surface-500">Add an extra layer of security</p>
                  </div>
                </div>
                <button className="btn btn-primary btn-sm">Enable 2FA</button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-surface-800/30 border border-surface-700/50">
                <div className="flex items-center gap-3">
                  <Download className="w-5 h-5 text-surface-400" />
                  <div>
                    <p className="text-sm font-medium text-white">Download Your Data</p>
                    <p className="text-xs text-surface-500">Export all your account data</p>
                  </div>
                </div>
                <button className="btn btn-secondary btn-sm">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
          </SettingSection>

          {/* Subscription Section */}
          <SettingSection
            icon={CreditCard}
            title="Subscription"
            description="Manage your billing and plan"
          >
            <div className="space-y-4">
              <div className="p-6 rounded-xl bg-gradient-to-br from-brand-500/10 to-accent-purple/10 border border-brand-500/20">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Pro Plan</h4>
                    <p className="text-sm text-surface-400">$4.99/month · Save 20% annually · Renews on Jan 15, 2026</p>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-accent-emerald/10 border border-accent-emerald/20 text-accent-emerald text-xs font-medium">
                    Active
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-surface-500 mb-1">Searches</p>
                    <p className="text-lg font-semibold text-white">Unlimited</p>
                  </div>
                  <div>
                    <p className="text-xs text-surface-500 mb-1">Downloads</p>
                    <p className="text-lg font-semibold text-white">Unlimited</p>
                  </div>
                  <div>
                    <p className="text-xs text-surface-500 mb-1">Storage</p>
                    <p className="text-lg font-semibold text-white">100 GB</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link to="/billing" className="btn btn-primary btn-sm">
                    Manage Billing
                  </Link>
                  <Link to="/pricing" className="btn btn-secondary btn-sm">
                    Change Plan
                  </Link>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-surface-800/30 border border-surface-700/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Payment Method</p>
                    <p className="text-xs text-surface-500">Visa ending in 4242</p>
                  </div>
                  <button className="btn btn-ghost btn-sm">Update</button>
                </div>
              </div>
            </div>
          </SettingSection>

          {/* Notifications Section */}
          <SettingSection
            icon={Bell}
            title="Notifications"
            description="Control how we communicate with you"
          >
            <div className="space-y-3">
              {[
                { key: 'email', label: 'Email Notifications', description: 'Receive notifications via email' },
                { key: 'newSamples', label: 'New Sample Alerts', description: 'Get notified when new samples match your preferences' },
                { key: 'weeklyDigest', label: 'Weekly Digest', description: 'Weekly summary of trending samples' },
                { key: 'productUpdates', label: 'Product Updates', description: 'News about new features and improvements' },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between p-4 rounded-lg bg-surface-800/30 border border-surface-700/50"
                >
                  <div>
                    <p className="text-sm font-medium text-white">{item.label}</p>
                    <p className="text-xs text-surface-500">{item.description}</p>
                  </div>
                  <button
                    onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })}
                    className={cn(
                      'relative w-12 h-6 rounded-full transition-colors',
                      notifications[item.key] ? 'bg-brand-500' : 'bg-surface-700'
                    )}
                  >
                    <span
                      className={cn(
                        'absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform',
                        notifications[item.key] && 'transform translate-x-6'
                      )}
                    />
                  </button>
                </div>
              ))}
            </div>
          </SettingSection>

          {/* Preferences Section */}
          <SettingSection
            icon={Palette}
            title="Preferences"
            description="Customize your experience"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-surface-800/30 border border-surface-700/50">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-surface-400" />
                  <div>
                    <p className="text-sm font-medium text-white">Language</p>
                    <p className="text-xs text-surface-500">English (US)</p>
                  </div>
                </div>
                <button className="btn btn-secondary btn-sm">Change</button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-surface-800/30 border border-surface-700/50">
                <div>
                  <p className="text-sm font-medium text-white">Theme</p>
                  <p className="text-xs text-surface-500">Current: {theme === 'dark' ? 'Dark' : 'Light'}</p>
                </div>
                <button className="btn btn-secondary btn-sm opacity-70 cursor-not-allowed" disabled>
                  Coming Soon
                </button>
              </div>
            </div>
          </SettingSection>

          {/* Connected Accounts */}
          <SettingSection
            icon={ExternalLink}
            title="Connected Accounts"
            description="Manage your connected sample platforms"
          >
            <div className="space-y-3">
              {[
                { name: 'Splice', connected: true },
                { name: 'Loopcloud', connected: true },
                { name: 'LANDR', connected: false },
                { name: 'Sounds.com', connected: false },
              ].map((platform) => (
                <div
                  key={platform.name}
                  className="flex items-center justify-between p-4 rounded-lg bg-surface-800/30 border border-surface-700/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-surface-700 flex items-center justify-center text-xs font-medium text-white">
                      {platform.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{platform.name}</p>
                      <p className="text-xs text-surface-500">
                        {platform.connected ? 'Connected' : 'Not connected'}
                      </p>
                    </div>
                  </div>
                  <button
                    className={cn(
                      'btn btn-sm',
                      platform.connected ? 'btn-ghost' : 'btn-primary'
                    )}
                  >
                    {platform.connected ? 'Disconnect' : 'Connect'}
                  </button>
                </div>
              ))}
            </div>
          </SettingSection>

          {/* Danger Zone */}
          <SettingSection
            icon={Trash2}
            title="Danger Zone"
            description="Irreversible account actions"
          >
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-400 mb-1">Delete Account</p>
                  <p className="text-xs text-red-400/70">Permanently delete your account and all data</p>
                </div>
                <button className="px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-colors text-sm font-medium">
                  Delete Account
                </button>
              </div>
            </div>
          </SettingSection>
        </div>
      </main>
    </div>
  );
}
