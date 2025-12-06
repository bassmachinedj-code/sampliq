import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Heart, Music2, Music, ExternalLink, Hash } from 'lucide-react';
import { cn } from '../utils/helpers';

export function SampleCard({ sample, onToggleStar }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const coverImage = `https://picsum.photos/seed/${sample.id}/400/400`;

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setTimeout(() => setIsPlaying(false), 3000);
    }
  };

  const category = sample.category || 'Sound';
  const genre = sample.genre || category;
  const keyLabel = sample.key && sample.key !== '-' ? sample.key : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-lg bg-surface-900/40 border border-surface-800/50 hover:border-brand-500/30 hover:bg-surface-900/60 transition-all"
    >
      {/* Play Button */}
      <button
        onClick={handlePlay}
        className={cn(
          'w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all',
          isPlaying
            ? 'bg-white text-surface-950'
            : 'bg-surface-800/80 text-white hover:bg-white hover:text-surface-950'
        )}
      >
        {isPlaying ? <Pause className="w-4 h-4 md:w-5 md:h-5" /> : <Play className="w-4 h-4 md:w-5 md:h-5 ml-0.5" />}
      </button>

      {/* Cover Image */}
      <div className="relative w-12 h-12 md:w-16 md:h-16 flex-shrink-0 rounded-lg overflow-hidden">
        <img
          src={coverImage}
          alt={sample.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Info Column */}
      <div className="flex-1 min-w-0 space-y-2">
        {/* Name */}
        <h4 className="text-sm md:text-base font-semibold text-white truncate">
          {sample.name}
        </h4>
        <p className="text-xs text-surface-500 truncate">by {sample.platform}</p>

        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-2">
          {sample.starred && (
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-brand-500/15 text-brand-300 border border-brand-500/30 uppercase tracking-wide">
              Favorite
            </span>
          )}
          {sample.bpm && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-800/70 border border-surface-700/60 text-surface-100 text-xs">
              <Music2 className="w-3.5 h-3.5" />
              {sample.bpm} BPM
            </span>
          )}
          {keyLabel && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-800/70 border border-surface-700/60 text-surface-100 text-xs">
              <Music className="w-3.5 h-3.5" />
              {keyLabel}
            </span>
          )}
          {genre && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-800/70 border border-surface-700/60 text-surface-100 text-xs uppercase">
              <Hash className="w-3.5 h-3.5" />
              {genre}
            </span>
          )}
        </div>
      </div>

      {/* Right Side: Actions */}
      <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
        <button
          onClick={() => onToggleStar(sample.id)}
          className={cn(
            'p-2 rounded-lg transition-colors',
            sample.starred
              ? 'text-brand-400 bg-brand-500/10'
              : 'text-surface-400 hover:text-white hover:bg-surface-800'
          )}
        >
          <Heart className={cn('w-4 h-4 md:w-5 md:h-5', sample.starred && 'fill-current')} />
        </button>

        <a
          href="#"
          className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs md:text-sm transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4" />
          <span className="hidden sm:inline">Open</span>
        </a>
      </div>
    </motion.div>
  );
}
