import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Check, Music2, Zap, ArrowRight, Headphones
} from 'lucide-react';
import { cn } from '../utils/helpers';

function PricingToggle({ isAnnual, setIsAnnual }) {
  return (
    <div className="flex items-center justify-center gap-4 mb-12">
      <span className={cn('text-sm font-medium', !isAnnual ? 'text-white' : 'text-surface-400')}>
        Monthly
      </span>
      <button
        onClick={() => setIsAnnual(!isAnnual)}
        className="relative w-14 h-7 rounded-full bg-surface-800 border border-surface-700 transition-colors"
      >
        <motion.div
          animate={{ x: isAnnual ? 26 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute top-1 w-5 h-5 rounded-full bg-gradient-to-r from-brand-500 to-brand-600"
        />
      </button>
      <span className={cn('text-sm font-medium flex items-center gap-2', isAnnual ? 'text-white' : 'text-surface-400')}>
        Annual
        <span className="badge badge-brand">Save 20%</span>
      </span>
    </div>
  );
}

function PricingCard({ plan, isAnnual, isPopular = false }) {
  const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
  const annualized = Number((plan.annualPrice / 12).toFixed(2));
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        'relative card p-8 flex flex-col',
        isPopular && 'border-brand-500/50 shadow-glow'
      )}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-semibold shadow-glow-sm">
            Most Popular
          </span>
        </div>
      )}

      <div className="mb-6">
        <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mb-4', plan.iconGradient)}>
          <plan.icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
        <p className="text-surface-400 text-sm">{plan.description}</p>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-display font-bold text-white">${price}</span>
          <span className="text-surface-400">/{isAnnual ? 'year' : 'month'}</span>
        </div>
        {isAnnual && plan.monthlyPrice > 0 && (
          <p className="text-sm text-surface-500 mt-1">
            ~${annualized}/month billed annually
          </p>
        )}
      </div>

      <Link
        to="/dashboard"
        className={cn('btn w-full mb-8', isPopular ? 'btn-primary' : 'btn-secondary')}
      >
        {plan.cta}
        <ArrowRight className="w-4 h-4" />
      </Link>

      <div className="flex-1">
        <p className="text-sm font-medium text-surface-300 mb-4">Includes:</p>
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="w-4 h-4 text-accent-emerald mt-0.5 flex-shrink-0" />
              <span className="text-sm text-surface-400">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-surface-800">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="font-medium text-white pr-4">{question}</span>
        <span className={cn('text-surface-500 transition-transform duration-200', isOpen && 'rotate-45')}>
          +
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-surface-400">{answer}</p>
      </motion.div>
    </div>
  );
}

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: 'Free',
      description: 'Everything you need to try Sampliq with limits.',
      icon: Music2,
      iconGradient: 'bg-gradient-to-br from-surface-600 to-surface-700',
      monthlyPrice: 0,
      annualPrice: 0,
      cta: 'Get Started Free',
      features: [
        '100 searches per month',
        'Preview samples in browser',
        'Basic filters only (no advanced filters)',
        'Connect up to 3 providers of your choice',
        'Save favorites and history (7 days)',
      ],
    },
    {
      name: 'Pro',
      description: 'Full access, unlimited searches, all providers.',
      icon: Zap,
      iconGradient: 'bg-gradient-to-br from-brand-500 to-brand-600',
      monthlyPrice: 4.99,
      annualPrice: 47.9,
      cta: 'Upgrade to Pro',
      features: [
        'Unlimited searches',
        'All providers unlocked',
        'Advanced filters & AI search',
        'Unlimited history & favorites',
        'Download queue',
        'Priority support',
        'Collections & sharing',
        'Early access to new features',
      ],
    },
  ];

  const faqs = [
    {
      question: 'Do I need subscriptions to the sample platforms?',
      answer: 'Yes, Sampliq searches across platforms but you need your own subscriptions (Splice, Loopcloud, etc.) to download samples. We help you find them, the platforms provide access.',
    },
    {
      question: 'How many platforms are connected?',
      answer: 'We currently support 15+ major sample platforms including Splice, Loopcloud, LANDR, Sounds.com, Noiiz, and more. We\'re adding new platforms regularly.',
    },
    {
      question: 'Can I preview samples before downloading?',
      answer: 'Yes! You can listen to samples directly in your browser. Our preview feature works across all connected platforms.',
    },
    {
      question: 'Is there a free trial for Pro?',
      answer: 'Yes, we offer a 14-day free trial of Pro with full features. No credit card required to start.',
    },
    {
      question: 'How does the AI search work?',
      answer: 'Our AI understands natural language queries like "dark ambient pad" or "punchy trap kick". It analyzes your search and matches it against millions of samples.',
    },
    {
      question: 'Can I cancel anytime?',
      answer: 'Absolutely. You can cancel your subscription at any time. Monthly plans end at the billing cycle, annual plans are refundable within 30 days.',
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-radial from-brand-500/10 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-display-lg font-display font-bold text-white mb-6"
          >
            Simple, Transparent Pricing
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-surface-400 max-w-2xl mx-auto mb-12"
          >
            Start free, upgrade when you need more. No hidden fees.
          </motion.p>

          <PricingToggle isAnnual={isAnnual} setIsAnnual={setIsAnnual} />
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {plans.map((plan, index) => (
              <PricingCard key={plan.name} plan={plan} isAnnual={isAnnual} isPopular={index === 1} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-surface-900/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-surface-400">
              Have more questions?{' '}
              <a href="#" className="text-brand-400 hover:text-brand-300">Contact us</a>
            </p>
          </div>
          <div className="divide-y divide-surface-800 border-t border-surface-800">
            {faqs.map((faq) => (
              <FAQItem key={faq.question} {...faq} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 to-accent-purple/10" />
            <div className="relative z-10">
              <Headphones className="w-12 h-12 text-brand-400 mx-auto mb-6" />
              <h2 className="text-2xl font-display font-bold text-white mb-4">
                Questions About Enterprise?
              </h2>
              <p className="text-surface-400 mb-8 max-w-lg mx-auto">
                We offer custom solutions for labels, studios, and large production teams.
              </p>
              <Link to="/dashboard" className="btn btn-primary btn-lg">
                <span>Contact Sales</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
