import { motion } from 'framer-motion';
import {
  Mail, ExternalLink, MessageSquare, Github, Twitter
} from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="pt-20">
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-radial from-brand-500/10 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-medium mb-4"
            >
              <Mail className="w-4 h-4" />
              Contact
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-3xl md:text-4xl font-display font-bold text-white mb-4"
            >
              Get in Touch
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-surface-400"
            >
              We&apos;d love to hear from you. Choose your preferred way to reach out.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Laravel Forge Style Contact Card */}
            <motion.a
              href="https://forge.laravel.com/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card card-hover p-6 group block"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-brand-500/15 flex items-center justify-center text-brand-400 group-hover:bg-brand-500/25 transition-colors">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <ExternalLink className="w-5 h-5 text-surface-500 group-hover:text-brand-400 transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Support System</h3>
              <p className="text-surface-400 mb-4">
                Open a support ticket through our Laravel Forge-style support system. Get help from our team with detailed tracking.
              </p>
              <div className="inline-flex items-center gap-2 text-sm font-medium text-brand-400">
                Visit Support Portal
                <ExternalLink className="w-4 h-4" />
              </div>
            </motion.a>

            {/* Email Card */}
            <motion.a
              href="mailto:support@sampliq.com"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card card-hover p-6 group block"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent-purple/15 flex items-center justify-center text-accent-purple group-hover:bg-accent-purple/25 transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Email Us</h3>
              <p className="text-surface-400 mb-4">
                Prefer email? Send us a message at support@sampliq.com and we&apos;ll get back to you within 24 hours.
              </p>
              <div className="inline-flex items-center gap-2 text-sm font-medium text-accent-purple">
                support@sampliq.com
              </div>
            </motion.a>
          </div>

          {/* Additional Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Other Ways to Connect</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href="https://github.com/sampliq"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-surface-800/50 hover:bg-surface-800 transition-colors group"
              >
                <Github className="w-5 h-5 text-surface-400 group-hover:text-white" />
                <div>
                  <p className="text-sm font-medium text-white">GitHub</p>
                  <p className="text-xs text-surface-500">Check out our open source projects</p>
                </div>
                <ExternalLink className="w-4 h-4 text-surface-500 ml-auto" />
              </a>

              <a
                href="https://twitter.com/sampliq"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-surface-800/50 hover:bg-surface-800 transition-colors group"
              >
                <Twitter className="w-5 h-5 text-surface-400 group-hover:text-white" />
                <div>
                  <p className="text-sm font-medium text-white">Twitter</p>
                  <p className="text-xs text-surface-500">Follow us for updates</p>
                </div>
                <ExternalLink className="w-4 h-4 text-surface-500 ml-auto" />
              </a>
            </div>
          </motion.div>

          {/* Response Time Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-surface-500">
              Our team typically responds within <span className="text-brand-400 font-medium">24 hours</span> during business days
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
