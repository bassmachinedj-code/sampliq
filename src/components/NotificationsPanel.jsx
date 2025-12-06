import { AnimatePresence, motion } from 'framer-motion';
import { X, Package, Download, Star, CheckCircle2 } from 'lucide-react';
import { useNotifications } from '../context/NotificationsContext';
import { cn } from '../utils/helpers';

const iconMap = {
  package: { icon: Package, bg: 'bg-brand-500/15 text-brand-300' },
  download: { icon: Download, bg: 'bg-accent-emerald/15 text-accent-emerald' },
  star: { icon: Star, bg: 'bg-surface-700/70 text-surface-300' },
};

function NotificationItem({ item, onClick }) {
  const meta = iconMap[item.type] || iconMap.package;
  const Icon = meta.icon;

  return (
    <div
      className={cn(
        'p-4 rounded-xl border transition-colors',
        item.unread
          ? 'bg-surface-900 border-surface-800 hover:border-brand-500/40'
          : 'bg-surface-900/50 border-surface-800/80'
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <div className="flex items-start gap-3">
        <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0', meta.bg)}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-white">{item.title}</p>
            {item.unread && <span className="w-2 h-2 rounded-full bg-red-400" />}
          </div>
          <p className="text-xs text-surface-400 mt-1 truncate">{item.message}</p>
          <p className="text-xs text-surface-500 mt-2">{item.time}</p>
        </div>
      </div>
    </div>
  );
}

export function NotificationsPanel({ open, onClose }) {
  const { notifications, unreadCount, markAllRead, markRead } = useNotifications();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full md:w-96 bg-surface-950 border-l border-surface-800 z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-surface-800">
              <div>
                <h2 className="text-lg font-semibold text-white">Notifications</h2>
                <p className="text-xs text-surface-500 mt-0.5">
                  {unreadCount} unread
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-surface-400 hover:text-white rounded-lg hover:bg-surface-800/50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3">
              {notifications.map((item) => (
                <NotificationItem
                  key={item.id}
                  item={item}
                  onClick={() => markRead(item.id)}
                />
              ))}
            </div>

            <div className="p-4 md:p-6 border-t border-surface-800 space-y-3">
              <button
                className="w-full btn btn-secondary"
                onClick={() => {
                  markAllRead();
                  onClose?.();
                }}
              >
                <CheckCircle2 className="w-4 h-4" />
                Mark all as read
              </button>
              <button className="w-full btn btn-ghost" onClick={onClose}>
                View all notifications
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
