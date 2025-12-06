import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sliders } from 'lucide-react';
import { cn } from '../utils/helpers';

export default function ClaudeStyleSearch() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const providerOptions = ['Splice', 'Loopcloud', 'LANDR', 'Sounds.com', 'Noiiz', 'Producer Loops'];

  const [filters, setFilters] = useState({
    bpmMin: '',
    bpmMax: '',
    key: '',
    genre: '',
    mood: '',
    providers: [...providerOptions]
  });
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const genreOptions = [
    'House', 'Techno', 'Hip Hop', 'Trap', 'Drill', 'RnB', 'Pop', 'Drum & Bass',
    'Dubstep', 'Ambient', 'Downtempo', 'Lo-Fi', 'Future Bass', 'Deep House',
    'Tech House', 'Progressive House', 'Trance', 'Psytrance', 'Hardstyle',
    'UK Garage', 'Grime', 'Afrobeat', 'Dancehall', 'Reggaeton', 'Latin',
    'Soul', 'Funk', 'Jazz', 'Blues', 'Rock', 'Indie', 'Electronic',
    'Experimental', 'Industrial', 'Minimal', 'Breaks', 'Jungle', 'Footwork',
    'Vaporwave', 'Synthwave'
  ];
  const keyOptions = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const moodOptions = ['Dark', 'Chill', 'Happy', 'Epic', 'Energetic', 'Emotional', 'Melancholic', 'Aggressive', 'Uplifting', 'Dreamy'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const params = new URLSearchParams();
    params.set('q', query.trim());
    if (filters.bpmMin) params.set('bpmMin', filters.bpmMin);
    if (filters.bpmMax) params.set('bpmMax', filters.bpmMax);
    if (filters.key) params.set('key', filters.key);
    if (filters.genre) params.set('genre', filters.genre);
    if (filters.mood) params.set('mood', filters.mood);
    if (filters.providers.length) params.set('providers', filters.providers.join(','));

    navigate(`/search?${params.toString()}`);
  };

  const toggleProvider = (provider) => {
    setFilters(prev => ({
      ...prev,
      providers: prev.providers.includes(provider)
        ? prev.providers.filter(p => p !== provider)
        : [...prev.providers, provider]
    }));
  };

  const clearFilters = () => {
    setFilters({
      bpmMin: '',
      bpmMax: '',
      key: '',
      genre: '',
      mood: '',
      providers: []
    });
  };

  const hasActiveFilters = filters.bpmMin || filters.bpmMax || filters.key || filters.genre || filters.mood || filters.providers.length > 0;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        {/* Main Search Box - AI Powered */}
        <div className={cn(
          'relative bg-surface-900/50 backdrop-blur-xl rounded-2xl transition-all duration-200 border',
          isFocused
            ? 'border-brand-500/50 shadow-lg shadow-brand-500/10'
            : 'border-surface-800/50'
        )}>
          {/* AI Badge */}
          <div className="absolute -top-3 left-6 px-2 py-0.5 bg-gradient-to-r from-brand-500 to-accent-purple rounded-full text-xs font-medium text-white flex items-center gap-1.5 shadow-lg">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
            </svg>
            <span>AI-Powered</span>
          </div>

          <div className="flex items-center gap-3 px-5 py-4">
            <Search className={cn(
              'w-5 h-5 flex-shrink-0 transition-colors',
              isFocused ? 'text-brand-500' : 'text-surface-500'
            )} />

            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              placeholder="Describe the sound you need... AI will find it"
              className="flex-1 bg-transparent text-base text-white placeholder:text-surface-500 focus:outline-none"
            />

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  'p-2 rounded-lg transition-all',
                  showFilters || hasActiveFilters
                    ? 'bg-brand-500/10 text-brand-500'
                    : 'text-surface-500 hover:bg-surface-800'
                )}
              >
                <Sliders className="w-5 h-5" />
              </button>

              <button
                type="submit"
                disabled={!query.trim()}
                className={cn(
                  'px-4 py-2 rounded-lg font-medium text-sm transition-all',
                  query.trim()
                    ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white hover:shadow-glow'
                    : 'bg-surface-800 text-surface-500 cursor-not-allowed'
                )}
              >
                Search
              </button>
            </div>
          </div>

          {/* Inline Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden border-t border-surface-800"
              >
                <div className="p-5 space-y-4">
                  {/* BPM */}
                  <div>
                    <label className="block text-xs font-medium text-surface-400 mb-2">
                      Tempo (BPM)
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        value={filters.bpmMin}
                        onChange={(e) => setFilters({ ...filters, bpmMin: e.target.value })}
                        placeholder="Min"
                        className="flex-1 px-3 py-2 bg-surface-800/50 border border-surface-700 rounded-lg text-sm text-white placeholder:text-surface-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                      />
                      <span className="text-surface-500">—</span>
                      <input
                        type="number"
                        value={filters.bpmMax}
                        onChange={(e) => setFilters({ ...filters, bpmMax: e.target.value })}
                        placeholder="Max"
                        className="flex-1 px-3 py-2 bg-surface-800/50 border border-surface-700 rounded-lg text-sm text-white placeholder:text-surface-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                      />
                    </div>
                  </div>

                  {/* Genre */}
                  <div>
                    <label className="block text-xs font-medium text-surface-400 mb-2">
                      Genre
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {genreOptions.map((genre) => (
                        <button
                          key={genre}
                          type="button"
                          onClick={() => setFilters({ ...filters, genre: filters.genre === genre ? '' : genre })}
                          className={cn(
                            'px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
                            filters.genre === genre
                              ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20'
                              : 'bg-surface-800/50 text-surface-400 border border-transparent hover:border-surface-600'
                          )}
                        >
                          {genre}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Key & Mood */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-surface-400 mb-2">
                        Key
                      </label>
                      <select
                        value={filters.key}
                        onChange={(e) => setFilters({ ...filters, key: e.target.value })}
                        className="w-full px-3 py-2 bg-surface-800/50 border border-gray-200 dark:border-surface-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                      >
                        <option value="">Any key</option>
                        {keyOptions.map((key) => (
                          <option key={key} value={key}>{key}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-surface-400 mb-2">
                        Mood
                      </label>
                      <select
                        value={filters.mood}
                        onChange={(e) => setFilters({ ...filters, mood: e.target.value })}
                        className="w-full px-3 py-2 bg-surface-800/50 border border-gray-200 dark:border-surface-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                      >
                        <option value="">Any mood</option>
                        {moodOptions.map((mood) => (
                          <option key={mood} value={mood}>{mood}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Providers */}
                  <div>
                    <label className="block text-xs font-medium text-surface-400 mb-2">
                      Providers
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {providerOptions.map((provider) => (
                        <button
                          key={provider}
                          type="button"
                          onClick={() => toggleProvider(provider)}
                          className={cn(
                            'px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
                            filters.providers.includes(provider)
                              ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20'
                              : 'bg-surface-800/50 text-surface-400 border border-transparent hover:border-surface-600'
                          )}
                        >
                          {provider}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  {hasActiveFilters && (
                    <div className="pt-2 flex justify-end">
                      <button
                        type="button"
                        onClick={clearFilters}
                        className="text-sm text-surface-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
                      >
                        Clear all filters
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Quick Prompts */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs text-gray-500 dark:text-surface-500">Try:</span>
          {['deep 808 bass', 'lo-fi piano', 'trap hi-hats', 'ambient pads'].map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => setQuery(prompt)}
              className="text-xs px-2.5 py-1 rounded-md bg-gray-100 dark:bg-surface-800/50 text-surface-400 hover:bg-gray-200 dark:hover:bg-surface-700 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
}
