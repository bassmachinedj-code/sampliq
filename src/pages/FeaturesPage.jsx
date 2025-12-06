import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Search, Zap, Filter, Globe, Headphones, Layers,
  Music2, Disc3, Waves, Package, Clock,
  CheckCircle2, ArrowRight, Download, Heart,
  Sliders, Tag, Music, Share2
} from 'lucide-react';
import { cn } from '../utils/helpers';

function FeatureDetail({ icon: Icon, title, description, features, gradient, reverse = false }) {
  return (
    <div className={cn('grid lg:grid-cols-2 gap-12 items-center', reverse && 'lg:flex-row-reverse')}>
      <motion.div
        initial={{ opacity: 0, x: reverse ? 20 : -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className={cn(reverse && 'lg:order-2')}
      >
        <div className={cn('w-14 h-14 rounded-2xl flex items-center justify-center mb-6', gradient)}>
          <Icon className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">{title}</h3>
        <p className="text-lg text-surface-400 mb-8 leading-relaxed">{description}</p>
        <ul className="space-y-4">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3"
            >
              <CheckCircle2 className="w-5 h-5 text-accent-emerald mt-0.5 flex-shrink-0" />
              <span className="text-surface-300">{feature}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: reverse ? -20 : 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className={cn('relative', reverse && 'lg:order-1')}
      >
        <div className="card p-1 bg-gradient-to-b from-surface-800/50 to-surface-900/50">
          <div className="bg-surface-950 rounded-xl p-8 aspect-[4/3] flex items-center justify-center">
            <div className="w-full max-w-xs space-y-4">
              <div className="h-3 bg-surface-800 rounded-full w-3/4" />
              <div className="h-3 bg-surface-800 rounded-full w-full" />
              <div className="h-3 bg-surface-800 rounded-full w-5/6" />
              <div className="mt-8 grid grid-cols-3 gap-3">
                {[1,2,3].map(i => (
                  <div key={i} className="h-16 bg-surface-800/50 rounded-xl border border-surface-700/50" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function SmallFeature({ icon: Icon, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="card card-hover p-6"
    >
      <div className="w-10 h-10 rounded-xl bg-surface-800 flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-brand-400" />
      </div>
      <h4 className="text-base font-semibold text-white mb-2">{title}</h4>
      <p className="text-sm text-surface-400">{description}</p>
    </motion.div>
  );
}

export default function FeaturesPage() {
  const mainFeatures = [
    {
      icon: Search,
      title: 'Universal Sample Search',
      description: 'One search bar to rule them all. Query across Splice, Loopcloud, LANDR, Sounds.com, Noiiz, and more simultaneously.',
      gradient: 'bg-gradient-to-br from-brand-500 to-brand-600',
      features: [
        'Search 15+ sample platforms at once',
        'Over 50 million samples indexed',
        'Real-time results in milliseconds',
        'No platform switching needed',
      ],
    },
    {
      icon: Zap,
      title: 'AI-Powered Sound Matching',
      description: 'Describe what you hear in your head. Our AI translates your words into the perfect sample matches.',
      gradient: 'bg-gradient-to-br from-accent-purple to-violet-500',
      features: [
        'Natural language search ("dark atmospheric pad")',
        'Reference track matching',
        'Genre-aware recommendations',
        'Learns from your preferences',
      ],
    },
    {
      icon: Filter,
      title: 'Advanced Filtering',
      description: 'Dial in exactly what you need. Filter by BPM, key, genre, mood, instrument, and more.',
      gradient: 'bg-gradient-to-br from-accent-emerald to-teal-500',
      features: [
        'BPM range and key matching',
        'Instrument and genre filters',
        'Mood and energy selectors',
        'Loop length and format options',
      ],
    },
    {
      icon: Headphones,
      title: 'In-Browser Preview',
      description: 'Listen before you leave. Preview any sample directly in your browser without downloads.',
      gradient: 'bg-gradient-to-br from-accent-cyan to-blue-500',
      features: [
        'Instant audio playback',
        'Waveform visualization',
        'A/B comparison mode',
        'Save to preview playlist',
      ],
    },
  ];

  const smallFeatures = [
    { icon: Download, title: 'One-Click Download', description: 'Download directly to your DAW folder.' },
    { icon: Heart, title: 'Favorites Sync', description: 'Your favorites across all platforms.' },
    { icon: Clock, title: 'Search History', description: 'Never lose that perfect sample again.' },
    { icon: Package, title: 'Pack Discovery', description: 'Find complete sample packs easily.' },
    { icon: Sliders, title: 'BPM Detection', description: 'Auto-detect tempo of any sample.' },
    { icon: Tag, title: 'Smart Tags', description: 'AI-generated tags for better search.' },
    { icon: Music, title: 'Key Detection', description: 'Know the key before downloading.' },
    { icon: Share2, title: 'Share Collections', description: 'Share sample lists with collaborators.' },
    { icon: Waves, title: 'Waveform Preview', description: 'Visual preview of every sample.' },
    { icon: Disc3, title: 'Similar Sounds', description: 'Find more like what you love.' },
    { icon: Globe, title: 'Multi-Platform', description: 'Works on desktop and mobile.' },
    { icon: Layers, title: 'Project Organization', description: 'Organize samples by project.' },
  ];

  const platforms = [
    { name: 'Splice', samples: '4M+' },
    { name: 'Loopcloud', samples: '8M+' },
    { name: 'LANDR', samples: '2M+' },
    { name: 'Sounds.com', samples: '5M+' },
    { name: 'Noiiz', samples: '3M+' },
    { name: 'Producer Loops', samples: '1M+' },
    { name: 'Loopmasters', samples: '2M+' },
    { name: 'More coming...', samples: '' },
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-radial from-brand-500/10 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-800/50 border border-surface-700/50 mb-8"
          >
            <Music2 className="w-4 h-4 text-brand-400" />
            <span className="text-sm text-surface-300">Platform Features</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-display-lg font-display font-bold text-white mb-6"
          >
            Built for Music Makers
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-surface-400 max-w-2xl mx-auto"
          >
            Everything you need to find the perfect samples, without the hassle of switching between platforms.
          </motion.p>
        </div>
      </section>

      {/* Connected Platforms */}
      <section className="py-12 border-y border-surface-800/50 bg-surface-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-surface-500 mb-8">Connected Platforms</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {platforms.map((platform) => (
              <div key={platform.name} className="card p-4 text-center">
                <div className="font-semibold text-white mb-1">{platform.name}</div>
                {platform.samples && (
                  <div className="text-sm text-surface-500">{platform.samples} samples</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20 space-y-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {mainFeatures.map((feature, index) => (
            <div key={feature.title} className={cn(index > 0 && 'mt-32')}>
              <FeatureDetail {...feature} reverse={index % 2 === 1} />
            </div>
          ))}
        </div>
      </section>

      {/* Small Features Grid */}
      <section className="py-20 bg-surface-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              More Powerful Features
            </h2>
            <p className="text-lg text-surface-400 max-w-2xl mx-auto">
              Every tool you need for finding and organizing samples.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {smallFeatures.map((feature) => (
              <SmallFeature key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 via-transparent to-accent-purple/10" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                Ready to Find Your Sound?
              </h2>
              <p className="text-lg text-surface-400 mb-8 max-w-xl mx-auto">
                Join thousands of producers already using Sampliq. Free to start.
              </p>
              <Link to="/dashboard" className="btn btn-primary btn-lg">
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
