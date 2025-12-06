import { Link } from 'react-router-dom';
import {
  ArrowLeft, CreditCard, Download, ShieldCheck, Receipt, CheckCircle2, Crown, Calendar, Clock3
} from 'lucide-react';

export default function BillingPage() {
  const invoices = [
    { id: 'INV-1042', date: 'Dec 05, 2025', amount: '$4.99', status: 'Paid' },
    { id: 'INV-1041', date: 'Nov 05, 2025', amount: '$4.99', status: 'Paid' },
    { id: 'INV-1040', date: 'Oct 05, 2025', amount: '$4.99', status: 'Paid' },
  ];

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
                <h1 className="text-xl font-display font-bold text-white">Billing</h1>
                <p className="text-sm text-surface-400">Manage your subscription and invoices</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="btn btn-secondary btn-sm">Update payment</button>
              <button className="btn btn-primary btn-sm">Download statement</button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Current Plan */}
        <div className="card p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Pro Plan</h2>
                <p className="text-surface-400 text-sm">Unlimited searches, all platforms, advanced filters.</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="px-2 py-1 rounded-full bg-brand-500/15 text-brand-300 text-xs font-semibold">Active</span>
                  <span className="text-sm text-white font-semibold">$4.99/mo</span>
                  <span className="text-xs text-surface-500">or save 20% billed annually</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="btn btn-secondary btn-sm">Change plan</button>
              <button className="btn btn-ghost btn-sm text-red-400 hover:text-red-300">Cancel renewal</button>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mt-6">
            <div className="p-4 rounded-lg bg-surface-900/40 border border-surface-800/60">
              <p className="text-xs text-surface-500 mb-1">Renewal date</p>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-surface-400" />
                <p className="text-white text-sm">Jan 05, 2026</p>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-surface-900/40 border border-surface-800/60">
              <p className="text-xs text-surface-500 mb-1">Next charge</p>
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-surface-400" />
                <p className="text-white text-sm">$4.99</p>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-surface-900/40 border border-surface-800/60">
              <p className="text-xs text-surface-500 mb-1">Usage</p>
              <div className="flex items-center gap-2">
                <Clock3 className="w-4 h-4 text-surface-400" />
                <p className="text-white text-sm">Unlimited searches</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment method + receipts */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="card p-6 space-y-4 lg:col-span-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-surface-800 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-surface-300" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Visa ending in 4242</p>
                  <p className="text-xs text-surface-500">Expires 08/27 · Billing address: US</p>
                </div>
              </div>
              <button className="btn btn-secondary btn-sm">Update</button>
            </div>
            <div className="flex items-center gap-3 text-xs text-surface-500">
              <ShieldCheck className="w-4 h-4" />
              Payments are secured with 256-bit encryption and PSD2 compliant.
            </div>
          </div>

          <div className="card p-6 space-y-3">
            <div className="flex items-center gap-3 mb-2">
              <Receipt className="w-5 h-5 text-surface-300" />
              <div>
                <p className="text-white font-semibold text-sm">Invoices</p>
                <p className="text-xs text-surface-500">Download your receipts</p>
              </div>
            </div>
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between p-3 rounded-lg bg-surface-900/40 border border-surface-800/60"
              >
                <div>
                  <p className="text-sm text-white">{invoice.id}</p>
                  <p className="text-xs text-surface-500">{invoice.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-white">{invoice.amount}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-accent-emerald/15 text-accent-emerald">{invoice.status}</span>
                  <button className="p-2 rounded-lg bg-surface-800 hover:bg-surface-700 transition-colors">
                    <Download className="w-4 h-4 text-surface-300" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support */}
        <div className="card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-accent-emerald" />
            <div>
              <p className="text-white font-semibold text-sm">Need help with billing?</p>
              <p className="text-xs text-surface-500">Chat with us or open a ticket and we’ll reply fast.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn btn-ghost btn-sm">Open ticket</button>
            <button className="btn btn-primary btn-sm">Chat with support</button>
          </div>
        </div>
      </main>
    </div>
  );
}
