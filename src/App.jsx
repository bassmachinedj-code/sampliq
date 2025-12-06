import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import PricingPage from './pages/PricingPage';
import DashboardPage from './pages/DashboardPage';
import SearchPage from './pages/SearchPage';
import LoginPage from './pages/LoginPage';
import ContactPage from './pages/ContactPage';
import SettingsPage from './pages/SettingsPage';
import BillingPage from './pages/BillingPage';

function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="billing" element={<BillingPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
