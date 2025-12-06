import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, ArrowRight, Music2, Zap, Globe,
  ChevronRight, Play, Star, Clock,
  Layers, Headphones, Disc3, Music,
  Waves, AudioLines, Package, Filter
} from 'lucide-react';
import { cn } from '../utils/helpers';

// Animated Background Component
function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[120px] animate-float" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-accent-purple/10 rounded-full blur-[100px] animate-float animation-delay-1000" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-cyan/5 rounded-full blur-[80px] animate-float animation-delay-500" />
      <div className="absolute inset-0 bg-noise opacity-[0.015]" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-surface-950/50 to-surface-950" />
    </div>
  );
}

// Search Suggestions
const searchSuggestions = [
  { icon: Disc3, text: '808 kicks deep bass', category: 'Drums' },
  { icon: Music, text: 'Lo-fi piano chords', category: 'Melodic' },
  { icon: Waves, text: 'Ambient pads atmospheric', category: 'Synths' },
  { icon: AudioLines, text: 'Trap hi-hats rolls', category: 'Drums' },
  { icon: Headphones, text: 'Vocal chops RnB', category: 'Vocals' },
  { icon: Package, text: 'Drill sample pack', category: 'Packs' },
];

// Hero Search Component
function HeroSearch() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const [sampleType, setSampleType] = useState('all');
  const providerOptions = ['Splice', 'Loopcloud', 'LANDR', 'Sounds.com', 'Noiiz', 'Producer Loops'];
  const genreOptions = [
    'House', 'Deep House', 'Tech House', 'Progressive House', 'Electro House',
    'Techno', 'Minimal Techno', 'Industrial Techno',
    'Hip-Hop', 'Trap', 'Drill', 'Boom Bap', 'Lo-Fi Hip-Hop',
    'RnB', 'Soul', 'Neo-Soul',
    'Pop', 'Indie Pop', 'Synth Pop',
    'Drum & Bass', 'Jungle', 'Liquid DnB', 'Neurofunk',
    'Dubstep', 'Brostep', 'Melodic Dubstep',
    'Ambient', 'Downtempo', 'Chillout', 'Chillwave',
    'Trance', 'Psytrance', 'Progressive Trance',
    'Hardstyle', 'Hardcore',
    'UK Garage', '2-Step', 'Grime',
    'Future Bass', 'Future House', 'Bass House',
    'Afrobeat', 'Afro House', 'Dancehall', 'Reggaeton',
    'Latin', 'Moombahton',
    'Funk', 'Disco', 'Nu-Disco',
    'Jazz', 'Jazz Hop', 'Blues',
    'Rock', 'Indie Rock', 'Electronic Rock',
    'Experimental', 'IDM', 'Glitch',
    'Vaporwave', 'Synthwave', 'Retrowave',
    'Breakbeat', 'Big Beat', 'Breaks',
    'Footwork', 'Juke'
  ];
  const moodOptions = ['Dark', 'Chill', 'Happy', 'Epic', 'Moody', 'Energetic', 'Emotional', 'Melancholic', 'Aggressive', 'Uplifting', 'Dreamy', 'Atmospheric', 'Groovy'];
  const keyOptions = ['Any', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const bpmPresets = [
    { label: '80 - 100', min: 80, max: 100 },
    { label: '100 - 120', min: 100, max: 120 },
    { label: '120 - 140', min: 120, max: 140 },
    { label: '140 - 160', min: 140, max: 160 },
  ];

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [selectedSampleTypes, setSelectedSampleTypes] = useState([]);
  const [selectedSoundCategories, setSelectedSoundCategories] = useState([]);
  const [bpmRange, setBpmRange] = useState({ min: '', max: '' });
  const [selectedProviders, setSelectedProviders] = useState(providerOptions);
  const [openFilter, setOpenFilter] = useState(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const sampleTypeOptions = ['One-Shot', 'Loop', 'Full', 'Stem'];
  const soundCategoryOptions = ['Vocal', 'Drum', 'Bass', 'Synth', 'FX', 'Atmos'];

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;
    const prevBodyOverflow = body.style.overflow;
    const prevHtmlOverflow = html.style.overflow;

    if (openFilter) {
      body.style.overflow = 'hidden';
      html.style.overflow = 'hidden';
    }

    return () => {
      body.style.overflow = prevBodyOverflow;
      html.style.overflow = prevHtmlOverflow;
    };
  }, [openFilter]);

  const toggleProvider = (provider) => {
    if (provider === 'all') {
      setSelectedProviders(providerOptions);
      return;
    }

    if (selectedProviders.includes(provider)) {
      const filtered = selectedProviders.filter((p) => p !== provider);
      setSelectedProviders(filtered.length ? filtered : providerOptions);
    } else {
      setSelectedProviders([...selectedProviders, provider]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    const params = new URLSearchParams();
    params.set('q', query.trim());
    if (sampleType !== 'all') params.set('type', sampleType);
    if (bpmRange.min) params.set('bpmMin', bpmRange.min);
    if (bpmRange.max) params.set('bpmMax', bpmRange.max);
    if (selectedGenres.length) params.set('genres', selectedGenres.join(','));
    if (selectedMoods.length) params.set('moods', selectedMoods.join(','));
    if (selectedKeys.length) params.set('keys', selectedKeys.join(','));
    if (selectedSampleTypes.length) params.set('sampleTypes', selectedSampleTypes.join(','));
    if (selectedSoundCategories.length) params.set('soundCategories', selectedSoundCategories.join(','));
    if (selectedProviders.length && selectedProviders.length !== providerOptions.length) {
      params.set('providers', selectedProviders.join(','));
    }
    navigate(`/search?${params.toString()}`);
  };

  const handleSuggestionClick = (text) => {
    setQuery(text);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedSuggestion(prev => prev < searchSuggestions.length - 1 ? prev + 1 : prev);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedSuggestion(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter' && selectedSuggestion >= 0) {
      e.preventDefault();
      setQuery(searchSuggestions[selectedSuggestion].text);
      setSelectedSuggestion(-1);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Sample Type Filter */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <button
          type="button"
          onClick={() => setSampleType('all')}
          className={cn(
            'px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300',
            sampleType === 'all'
              ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-glow-sm'
              : 'bg-surface-800/30 border border-surface-700/30 text-surface-400 hover:text-white hover:border-surface-600/50'
          )}
        >
          All Samples
        </button>
        <button
          type="button"
          onClick={() => setSampleType('single')}
          className={cn(
            'px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300',
            sampleType === 'single'
              ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-glow-sm'
              : 'bg-surface-800/30 border border-surface-700/30 text-surface-400 hover:text-white hover:border-surface-600/50'
          )}
        >
          Single Samples
        </button>
        <button
          type="button"
          onClick={() => setSampleType('pack')}
          className={cn(
            'px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300',
            sampleType === 'pack'
              ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-glow-sm'
              : 'bg-surface-800/30 border border-surface-700/30 text-surface-400 hover:text-white hover:border-surface-600/50'
          )}
        >
          Sample Packs
        </button>
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <div className={cn(
          'relative rounded-2xl transition-all duration-500',
          isFocused && 'ring-2 ring-brand-500/30 ring-offset-2 ring-offset-surface-950'
        )}>
          <div className={cn(
            'absolute -inset-px rounded-2xl bg-gradient-to-r from-brand-500/50 via-accent-purple/50 to-accent-cyan/50 opacity-0 blur-sm transition-opacity duration-500',
            isFocused && 'opacity-100'
          )} />
          
          <div className="relative bg-surface-900/50 backdrop-blur-xl border border-surface-700/50 rounded-2xl">
            <div className="flex items-center">
              <div className="pl-5 pr-2">
                <Search className={cn(
                  'w-5 h-5 transition-colors duration-300',
                  isFocused ? 'text-brand-400' : 'text-surface-500'
                )} />
              </div>
              
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                onKeyDown={handleKeyDown}
                placeholder="Search for samples, loops, one-shots..."
                className="flex-1 bg-transparent py-5 px-2 text-lg text-white placeholder:text-surface-500 focus:outline-none"
              />
              
              <div className="pr-3">
                <button
                  type="submit"
                  disabled={!query.trim()}
                  className={cn(
                    'flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300',
                    query.trim()
                      ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white hover:shadow-glow active:scale-95'
                      : 'bg-surface-800 text-surface-500 cursor-not-allowed'
                  )}
                >
                  <Music2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Search</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Suggestions Dropdown */}
        <AnimatePresence>
          {isFocused && !query && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-3 bg-surface-900/95 backdrop-blur-xl border border-surface-800/50 rounded-2xl overflow-hidden shadow-elevated z-50"
            >
              <div className="p-2">
                <div className="px-3 py-2 text-xs font-medium text-surface-500 uppercase tracking-wider">
                  Popular Searches
                </div>
                {searchSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion.text)}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all duration-200',
                      selectedSuggestion === index
                        ? 'bg-surface-800/80 text-white'
                        : 'text-surface-300 hover:bg-surface-800/50 hover:text-white'
                    )}
                  >
                    <div className={cn(
                      'w-9 h-9 rounded-lg flex items-center justify-center transition-colors',
                      selectedSuggestion === index
                        ? 'bg-brand-500/20 text-brand-400'
                        : 'bg-surface-800 text-surface-400'
                    )}>
                      <suggestion.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{suggestion.text}</p>
                      <p className="text-xs text-surface-500">{suggestion.category}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-surface-600" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      {/* Advanced Filters */}
      <div className="mt-6 relative">
        <div className="flex flex-wrap items-center justify-center gap-2 px-2 md:px-0">
          {[
            { id: 'bpm', label: 'BPM' },
            { id: 'genre', label: 'Genre' },
            { id: 'mood', label: 'Mood' },
            { id: 'key', label: 'Key' },
            { id: 'sampleType', label: 'Type' },
            { id: 'soundCategory', label: 'Category' },
            { id: 'providers', label: 'Providers' },
          ].map((filter) => {
            // Calculate number of selections
            let count = 0;
            if (filter.id === 'genre') count = selectedGenres.length;
            else if (filter.id === 'mood') count = selectedMoods.length;
            else if (filter.id === 'key') count = selectedKeys.length;
            else if (filter.id === 'sampleType') count = selectedSampleTypes.length;
            else if (filter.id === 'soundCategory') count = selectedSoundCategories.length;
            else if (filter.id === 'bpm') count = (bpmRange.min || bpmRange.max) ? 1 : 0;
            else if (filter.id === 'providers') count = selectedProviders.length < providerOptions.length ? selectedProviders.length : 0;

            const isActive = openFilter === filter.id || count > 0;

            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setOpenFilter(openFilter === filter.id ? null : filter.id)}
                className={cn(
                  'flex items-center gap-2 px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200 border whitespace-nowrap',
                  isActive
                    ? 'bg-brand-500/15 border-brand-500/40 text-brand-400'
                    : 'text-surface-400 bg-surface-800/30 border-surface-700/30 hover:text-white hover:border-surface-600/50'
                )}
              >
                {filter.id === 'providers' && <Filter className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                <span>{filter.label}</span>
                {count > 0 && (
                  <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-brand-500 text-white text-xs font-bold">
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {openFilter && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed inset-0 z-40 bg-surface-950/70 backdrop-blur"
                onClick={() => setOpenFilter(null)}
              />
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.99 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
              >
                <div className="w-full max-w-4xl card p-5 max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs text-surface-500 uppercase tracking-wide">Adjust filters</p>
                      <h4 className="text-lg font-semibold text-white">
                        {openFilter === 'bpm' && 'Tempo range'}
                        {openFilter === 'genre' && 'Genre'}
                        {openFilter === 'mood' && 'Mood'}
                        {openFilter === 'key' && 'Key'}
                        {openFilter === 'sampleType' && 'Sample Type'}
                        {openFilter === 'soundCategory' && 'Sound Category'}
                        {openFilter === 'providers' && 'Providers'}
                      </h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOpenFilter(null)}
                      className="text-surface-400 hover:text-white rounded-lg px-3 py-1.5"
                    >
                      Close
                    </button>
                  </div>

              {openFilter === 'bpm' && (
                <div className="space-y-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-surface-400 mb-1">Min BPM</label>
                      <input
                        type="number"
                        min="60"
                        max="220"
                        value={bpmRange.min}
                        onChange={(e) => setBpmRange({ ...bpmRange, min: e.target.value })}
                        className="input"
                        placeholder="e.g. 90"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-surface-400 mb-1">Max BPM</label>
                      <input
                        type="number"
                        min="60"
                        max="220"
                        value={bpmRange.max}
                        onChange={(e) => setBpmRange({ ...bpmRange, max: e.target.value })}
                        className="input"
                        placeholder="e.g. 150"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {bpmPresets.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => setBpmRange({ min: preset.min.toString(), max: preset.max.toString() })}
                        className="px-3 py-2 rounded-lg text-sm border border-surface-700/50 text-surface-300 hover:text-white hover:border-surface-600"
                      >
                        {preset.label}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setBpmRange({ min: '', max: '' })}
                      className="px-3 py-2 rounded-lg text-sm border border-surface-700/50 text-surface-400 hover:text-white hover:border-surface-600"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              )}

              {openFilter === 'genre' && (
                <div className="flex flex-wrap gap-2">
                  {genreOptions.map((genre) => {
                    const isSelected = selectedGenres.includes(genre);
                    return (
                      <button
                        key={genre}
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            setSelectedGenres(selectedGenres.filter(g => g !== genre));
                          } else {
                            setSelectedGenres([...selectedGenres, genre]);
                          }
                        }}
                        className={cn(
                          'px-3 py-2 rounded-lg text-sm border transition-colors',
                          isSelected
                            ? 'bg-brand-500/15 border-brand-500/40 text-brand-400'
                            : 'border-surface-700/50 text-surface-300 hover:text-white hover:border-surface-600'
                        )}
                      >
                        {genre}
                      </button>
                    );
                  })}
                </div>
              )}

              {openFilter === 'mood' && (
                <div className="flex flex-wrap gap-2">
                  {moodOptions.map((mood) => {
                    const isSelected = selectedMoods.includes(mood);
                    return (
                      <button
                        key={mood}
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            setSelectedMoods(selectedMoods.filter(m => m !== mood));
                          } else {
                            setSelectedMoods([...selectedMoods, mood]);
                          }
                        }}
                        className={cn(
                          'px-3 py-2 rounded-lg text-sm border transition-colors',
                          isSelected
                            ? 'bg-brand-500/15 border-brand-500/40 text-brand-400'
                            : 'border-surface-700/50 text-surface-300 hover:text-white hover:border-surface-600'
                        )}
                      >
                        {mood}
                      </button>
                    );
                  })}
                </div>
              )}

              {openFilter === 'key' && (
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {keyOptions.filter(k => k !== 'Any').map((key) => {
                    const isSelected = selectedKeys.includes(key);
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            setSelectedKeys(selectedKeys.filter(k => k !== key));
                          } else {
                            setSelectedKeys([...selectedKeys, key]);
                          }
                        }}
                        className={cn(
                          'px-3 py-2 rounded-lg text-sm border transition-colors',
                          isSelected
                            ? 'bg-brand-500/15 border-brand-500/40 text-brand-400'
                            : 'border-surface-700/50 text-surface-300 hover:text-white hover:border-surface-600'
                        )}
                      >
                        {key}
                      </button>
                    );
                  })}
                </div>
              )}

              {openFilter === 'sampleType' && (
                <div className="flex flex-wrap gap-2">
                  {sampleTypeOptions.map((type) => {
                    const isSelected = selectedSampleTypes.includes(type);
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            setSelectedSampleTypes(selectedSampleTypes.filter(t => t !== type));
                          } else {
                            setSelectedSampleTypes([...selectedSampleTypes, type]);
                          }
                        }}
                        className={cn(
                          'px-3 py-2 rounded-lg text-sm border transition-colors',
                          isSelected
                            ? 'bg-brand-500/15 border-brand-500/40 text-brand-400'
                            : 'border-surface-700/50 text-surface-300 hover:text-white hover:border-surface-600'
                        )}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              )}

              {openFilter === 'soundCategory' && (
                <div className="flex flex-wrap gap-2">
                  {soundCategoryOptions.map((category) => {
                    const isSelected = selectedSoundCategories.includes(category);
                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            setSelectedSoundCategories(selectedSoundCategories.filter(c => c !== category));
                          } else {
                            setSelectedSoundCategories([...selectedSoundCategories, category]);
                          }
                        }}
                        className={cn(
                          'px-3 py-2 rounded-lg text-sm border transition-colors',
                          isSelected
                            ? 'bg-brand-500/15 border-brand-500/40 text-brand-400'
                            : 'border-surface-700/50 text-surface-300 hover:text-white hover:border-surface-600'
                        )}
                      >
                        {category}
                      </button>
                    );
                  })}
                </div>
              )}

              {openFilter === 'providers' && (
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {providerOptions.map((provider) => (
                      <button
                        key={provider}
                        type="button"
                        onClick={() => toggleProvider(provider)}
                        className={cn(
                          'px-3 py-2 rounded-lg text-sm border transition-colors',
                          selectedProviders.includes(provider)
                            ? 'bg-brand-500/15 border-brand-500/40 text-brand-400'
                            : 'border-surface-700/50 text-surface-300 hover:text-white hover:border-surface-600'
                        )}
                      >
                        {provider}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedProviders(providerOptions)}
                      className="btn btn-ghost btn-sm"
                    >
                      Select all
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedProviders([])}
                      className="btn btn-ghost btn-sm"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-surface-800/60">
                <button
                  type="button"
                  onClick={() => {
                    switch (openFilter) {
                      case 'bpm':
                        setBpmRange({ min: '', max: '' });
                        break;
                      case 'genre':
                        setSelectedGenres([]);
                        break;
                      case 'mood':
                        setSelectedMoods([]);
                        break;
                      case 'key':
                        setSelectedKeys([]);
                        break;
                      case 'sampleType':
                        setSelectedSampleTypes([]);
                        break;
                      case 'soundCategory':
                        setSelectedSoundCategories([]);
                        break;
                      case 'providers':
                        setSelectedProviders(providerOptions);
                        break;
                      default:
                        break;
                    }
                  }}
                  className="btn btn-ghost btn-sm"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => setOpenFilter(null)}
                  className="btn btn-secondary btn-sm"
                >
                  Done
                </button>
              </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Quick Filter Pills - Senza linea */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-6 px-2 md:px-0">
        <span className="text-xs text-surface-500 hidden sm:inline mr-2">Try:</span>
        {['808 kicks', 'lo-fi piano', 'trap hi-hats', 'ambient pads', 'vocal chops'].map((tag) => (
          <button
            key={tag}
            onClick={() => setQuery(tag)}
            className="px-3 py-1.5 rounded-full text-xs text-surface-400 bg-surface-800/30 border border-surface-700/30 hover:bg-surface-800/50 hover:text-white hover:border-surface-600/50 transition-all duration-200"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}

// Stats Component
function Stats() {
  const stats = [
    { label: 'Samples indexed', value: '50M+', icon: Music2 },
    { label: 'Platforms connected', value: '15+', icon: Layers },
    { label: 'Producers using', value: '100K+', icon: Headphones },
    { label: 'Avg. search time', value: '<1s', icon: Clock },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-surface-800/50 border border-surface-700/50 mb-3">
            <stat.icon className="w-5 h-5 text-brand-400" />
          </div>
          <div className="text-2xl md:text-3xl font-display font-bold text-white mb-1">{stat.value}</div>
          <div className="text-sm text-surface-400">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}

// Feature Card Component
function FeatureCard({ icon: Icon, title, description, gradient, delay = 0, comingSoon = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="card card-hover card-glow p-6 group relative"
    >
      {comingSoon && (
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent-amber/10 text-accent-amber border border-accent-amber/20">
            Coming Soon
          </span>
        </div>
      )}
      <div className={cn(
        'w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110',
        gradient
      )}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-surface-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

// Testimonial Component
function Testimonial({ quote, author, role }) {
  return (
    <div className="card p-6">
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <p className="text-surface-300 mb-6 leading-relaxed">&quot;{quote}&quot;</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-accent-purple flex items-center justify-center text-white font-semibold">
          {author.charAt(0)}
        </div>
        <div>
          <div className="text-sm font-medium text-white">{author}</div>
          <div className="text-xs text-surface-500">{role}</div>
        </div>
      </div>
    </div>
  );
}

// How It Works Step
function WorkflowStep({ number, title, description, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="flex gap-4"
    >
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white font-bold shadow-glow-sm">
          {number}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-surface-400 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

// Main HomePage Component
export default function HomePage() {
  const features = [
    {
      icon: Search,
      title: 'Universal Search',
      description: 'Search across Splice, Loopcloud, LANDR, and 15+ platforms simultaneously. One search, all results.',
      gradient: 'bg-gradient-to-br from-brand-500 to-brand-600',
      comingSoon: false,
    },
    {
      icon: Zap,
      title: 'AI-Powered Matching',
      description: 'Describe sounds naturally and get intelligent results. Our AI understands context and musical terminology.',
      gradient: 'bg-gradient-to-br from-accent-amber to-orange-500',
      comingSoon: false,
    },
    {
      icon: Filter,
      title: 'Advanced Filters',
      description: 'Filter by BPM, key, genre, mood, and instrument type. Find exactly what you need in seconds.',
      gradient: 'bg-gradient-to-br from-accent-emerald to-teal-500',
      comingSoon: false,
    },
    {
      icon: Headphones,
      title: 'Browser Preview',
      description: 'Listen to samples directly in your browser with waveform visualization before downloading.',
      gradient: 'bg-gradient-to-br from-accent-purple to-violet-500',
      comingSoon: false,
    },
    {
      icon: Globe,
      title: 'Universal Credits',
      description: 'Use Sampliq credits across all connected platforms. No need to manage multiple subscriptions or credit systems.',
      gradient: 'bg-gradient-to-br from-accent-cyan to-blue-500',
      comingSoon: true,
    },
    {
      icon: Package,
      title: 'Pack Discovery',
      description: 'Find complete sample packs with detailed metadata and descriptions. Browse provider previews when available.',
      gradient: 'bg-gradient-to-br from-pink-500 to-rose-500',
      comingSoon: false,
    },
  ];

  const testimonials = [
    {
      quote: "Finally, one place to search all my sample sources. Sampliq has completely changed my workflow.",
      author: "Marcus Chen",
      role: "Producer, Grammy Nominated",
    },
    {
      quote: "I used to spend hours browsing different sites. Now I find the perfect sample in under a minute.",
      author: "Sarah Williams",
      role: "Electronic Music Artist",
    },
    {
      quote: "The AI search is incredible. I just describe the vibe I want and it finds exactly what I need.",
      author: "DJ Tempo",
      role: "Beatmaker, 2M+ Spotify streams",
    },
  ];

  const workflowSteps = [
    {
      title: 'Describe Your Sound',
      description: 'Type what you\'re looking for - a genre, instrument, mood, or even a reference track.',
    },
    {
      title: 'AI Searches Everything',
      description: 'Our engine searches across 50M+ samples from 15+ platforms in milliseconds.',
    },
    {
      title: 'Preview & Compare',
      description: 'Listen to samples directly in your browser. Filter by BPM, key, and more.',
    },
    {
      title: 'Download Instantly',
      description: 'Get your samples from your connected platforms. One click, no switching tabs.',
    },
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16">
        <AnimatedBackground />
        
        <div className="relative z-10 w-full px-6 py-20 md:py-32">
          <div className="text-center mb-12">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-800/50 border border-surface-700/50 mb-8"
            >
              <span className="flex items-center gap-1.5 text-sm text-surface-300">
                <Music2 className="w-4 h-4 text-brand-400" />
                AI-Powered Universal Sample Search
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-display-lg font-display font-bold text-white mb-6 text-balance"
            >
              Find Any Sample,{' '}
              <span className="text-gradient-brand">Instantly</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-surface-400 max-w-2xl mx-auto mb-12 text-balance"
            >
              Search across Splice, Loopcloud, LANDR, and more in one place. 
              Stop switching tabs. Start making music.
            </motion.p>
          </div>

          {/* Search Component */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <HeroSearch />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-16 border-t border-surface-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Stats />
        </div>
      </section>


      {/* Features Section */}
      <section id="features" className="relative py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-medium mb-4"
            >
              <Layers className="w-4 h-4" />
              Features
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-display font-bold text-white mb-4"
            >
              Everything You Need to Find Samples
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-surface-400 max-w-2xl mx-auto"
            >
              One search, all platforms. The fastest way to find the perfect sound for your music.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={feature.title} {...feature} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-24 md:py-32 bg-surface-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-emerald/10 border border-accent-emerald/20 text-accent-emerald text-sm font-medium mb-4"
              >
                <Zap className="w-4 h-4" />
                How It Works
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl font-display font-bold text-white mb-6"
              >
                From Search to Session in Seconds
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg text-surface-400 mb-10"
              >
                Stop wasting time browsing multiple sites. Find the perfect sample and get back to making music.
              </motion.p>

              <div className="space-y-8">
                {workflowSteps.map((step, index) => (
                  <WorkflowStep key={step.title} number={index + 1} {...step} delay={0.3 + index * 0.1} />
                ))}
              </div>
            </div>

            {/* Visual Demo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="card p-1 bg-gradient-to-b from-surface-800/50 to-surface-900/50">
                <div className="bg-surface-950 rounded-xl p-6 space-y-4">
                  <div className="flex items-center gap-3 pb-4 border-b border-surface-800">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="flex-1 text-center">
                      <span className="text-xs text-surface-500 font-mono">sampliq.com/search</span>
                    </div>
                  </div>

                  {/* Sample Results Preview */}
                  <div className="space-y-3">
                    {[
                      { name: 'Deep 808 Kick - C', bpm: 140, platform: 'Splice', key: 'C' },
                      { name: 'Punchy Sub Bass Hit', bpm: 128, platform: 'Loopcloud', key: 'G' },
                      { name: 'Trap 808 - Heavy', bpm: 145, platform: 'LANDR', key: 'F' },
                    ].map((sample, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-surface-900/50 border border-surface-800/50">
                        <button className="w-8 h-8 rounded-lg bg-brand-500/20 flex items-center justify-center text-brand-400 hover:bg-brand-500/30 transition-colors">
                          <Play className="w-4 h-4" />
                        </button>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-white truncate">{sample.name}</div>
                          <div className="flex items-center gap-2 text-xs text-surface-500">
                            <span>{sample.bpm} BPM</span>
                            <span>•</span>
                            <span>Key: {sample.key}</span>
                          </div>
                        </div>
                        <span className="text-xs text-surface-500 bg-surface-800 px-2 py-1 rounded">
                          {sample.platform}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 text-center">
                    <span className="text-xs text-surface-500">Showing 3 of 1,247 results</span>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-500/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent-purple/20 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-amber/10 border border-accent-amber/20 text-accent-amber text-sm font-medium mb-4"
            >
              <Star className="w-4 h-4" />
              Testimonials
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-display font-bold text-white mb-4"
            >
              Loved by Producers Worldwide
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Testimonial {...testimonial} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative card p-12 text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 via-transparent to-accent-purple/10" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-purple/20 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                Ready to Find Your Sound?
              </h2>
              <p className="text-lg text-surface-400 mb-8 max-w-xl mx-auto">
                Join 100,000+ producers who&apos;ve already upgraded their sample workflow.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/dashboard" className="btn btn-primary btn-lg">
                  <span>Start Searching Free</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <p className="text-sm text-surface-500 mt-6">
                No credit card required • Free plan available
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
