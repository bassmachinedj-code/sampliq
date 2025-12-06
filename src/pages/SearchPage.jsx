import { useState, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import {
  Search, Send, ArrowLeft, X, Music2,
  Sliders, Sun, Moon, RefreshCw, Filter
} from 'lucide-react';
import { cn } from '../utils/helpers';
import { useTheme } from '../context/ThemeContext';
import { SampleCard } from '../components/SampleCard';

// Main Search Page
export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [hasSearched, setHasSearched] = useState(!!initialQuery);
  const inputRef = useRef(null);
  const { theme } = useTheme();

  // Filters
  const providerOptions = ['Splice', 'Loopcloud', 'LANDR', 'Sounds.com', 'Noiiz', 'Producer Loops'];
  const providedProviders = searchParams.get('providers')?.split(',').filter(Boolean) ?? [];
  const initialProviders = providedProviders.length ? providedProviders : providerOptions;
  const [sampleType, setSampleType] = useState(searchParams.get('type') || 'all');
  const [bpmMin, setBpmMin] = useState(searchParams.get('bpmMin') || '');
  const [bpmMax, setBpmMax] = useState(searchParams.get('bpmMax') || '');
  const [genreFilter, setGenreFilter] = useState(searchParams.get('genre') || '');
  const [moodFilter, setMoodFilter] = useState(searchParams.get('mood') || '');
  const [keyFilter, setKeyFilter] = useState(searchParams.get('key') || '');
  const [typeFilter, setTypeFilter] = useState('');
  const [soundCategoryFilter, setSoundCategoryFilter] = useState('');
  const [platformFilter, setPlatformFilter] = useState(initialProviders);
  const [showFiltersModal, setShowFiltersModal] = useState(false);

  // Mock results
  const [results, setResults] = useState([
    { id: '1', name: 'Deep 808 Kick - Heavy Sub', bpm: 140, key: 'C', duration: '0:02', type: 'One-Shot', platform: 'Splice', genre: 'Trap', mood: 'Dark', favorited: false, category: 'Drum' },
    { id: '2', name: 'Lo-Fi Piano Loop - Dusty', bpm: 85, key: 'Am', duration: '0:08', type: 'Loop', platform: 'Loopcloud', genre: 'Hip-Hop', mood: 'Chill', favorited: true, category: 'Synth' },
    { id: '3', name: 'Reese Bass - Gritty DnB', bpm: 174, key: 'F#', duration: '0:06', type: 'Loop', platform: 'LANDR', genre: 'Drum & Bass', mood: 'Energetic', favorited: false, category: 'Bass' },
    { id: '4', name: 'RnB Vocal Chop - Airy', bpm: 100, key: 'D', duration: '0:04', type: 'One-Shot', platform: 'Sounds.com', genre: 'RnB', mood: 'Emotional', favorited: false, category: 'Vocal' },
    { id: '5', name: 'Tech House Drum Loop', bpm: 128, key: 'C', duration: '0:08', type: 'Loop', platform: 'Noiiz', genre: 'House', mood: 'Energetic', favorited: false, category: 'Drum' },
    { id: '6', name: 'Atmospheric FX Sweep', bpm: 120, key: '-', duration: '0:05', type: 'One-Shot', platform: 'Producer Loops', genre: 'Ambient', mood: 'Atmospheric', favorited: false, category: 'FX' },
    { id: '7', name: 'Melodic Synth Stab', bpm: 128, key: 'G', duration: '0:03', type: 'One-Shot', platform: 'Splice', genre: 'House', mood: 'Uplifting', favorited: false, category: 'Synth' },
    { id: '8', name: 'Deep Sub Bass', bpm: 140, key: 'F', duration: '0:04', type: 'One-Shot', platform: 'Loopcloud', genre: 'Trap', mood: 'Dark', favorited: false, category: 'Bass' },
  ]);

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
  const typeOptions = ['One-Shot', 'Loop', 'Full', 'Stem'];
  const soundCategoryOptions = ['Vocal', 'Drum', 'Bass', 'Synth', 'FX', 'Atmos'];

  const allProvidersSelected = platformFilter.length === providerOptions.length;

  const buildSearchParams = () => {
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    if (sampleType !== 'all') params.set('type', sampleType);
    if (bpmMin) params.set('bpmMin', bpmMin);
    if (bpmMax) params.set('bpmMax', bpmMax);
    if (genreFilter) params.set('genre', genreFilter);
    if (moodFilter) params.set('mood', moodFilter);
    if (keyFilter) params.set('key', keyFilter);
    if (!allProvidersSelected && platformFilter.length) params.set('providers', platformFilter.join(','));
    return params;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearchParams(buildSearchParams());
    setHasSearched(true);
  };

  const handleFavorite = (id) => {
    setResults(results.map(r => r.id === id ? { ...r, favorited: !r.favorited } : r));
  };

  const togglePlatform = (provider) => {
    if (platformFilter.includes(provider)) {
      const next = platformFilter.filter((p) => p !== provider);
      setPlatformFilter(next.length ? next : providerOptions);
    } else {
      setPlatformFilter([...platformFilter, provider]);
    }
  };

  const clearFilters = () => {
    setSampleType('all');
    setBpmMin('');
    setBpmMax('');
    setGenreFilter('');
    setMoodFilter('');
    setKeyFilter('');
    setTypeFilter('');
    setSoundCategoryFilter('');
    setPlatformFilter(providerOptions);
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    setSearchParams(params);
  };

  const hasFilters = sampleType !== 'all'
    || bpmMin
    || bpmMax
    || genreFilter
    || moodFilter
    || (keyFilter && keyFilter !== 'Any')
    || typeFilter
    || soundCategoryFilter
    || !allProvidersSelected;

  const filteredResults = results.filter((sample) => {
    if (sampleType === 'single' && sample.type !== 'One-Shot') return false;
    if (sampleType === 'pack' && sample.type !== 'Pack') return false;
    if (typeFilter && sample.type !== typeFilter) return false;
    if (soundCategoryFilter && sample.category !== soundCategoryFilter) return false;
    if (bpmMin && sample.bpm < Number(bpmMin)) return false;
    if (bpmMax && sample.bpm > Number(bpmMax)) return false;
    if (keyFilter && keyFilter !== 'Any' && sample.key !== keyFilter) return false;
    if (genreFilter && sample.genre !== genreFilter) return false;
    if (moodFilter && sample.mood !== moodFilter) return false;
    if (!allProvidersSelected && platformFilter.length && !platformFilter.includes(sample.platform)) return false;
    return true;
  });

  // Group results by provider
  const groupedResults = filteredResults.reduce((acc, sample) => {
    if (!acc[sample.platform]) {
      acc[sample.platform] = [];
    }
    acc[sample.platform].push(sample);
    return acc;
  }, {});

  const handleSearchAgain = () => {
    // Shuffle results to simulate new search
    setResults(prev => {
      const shuffled = [...prev].sort(() => Math.random() - 0.5);
      return shuffled;
    });
  };

  return (
    <div className="min-h-screen bg-surface-950">
      {/* Header - Full Width */}
      <header className="sticky top-0 z-20 bg-surface-950/80 backdrop-blur-xl border-b border-surface-800/50">
        <div className="w-full px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              to="/dashboard"
              className="p-2 text-surface-400 hover:text-white rounded-lg hover:bg-surface-800/50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>

            <form onSubmit={handleSubmit} className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-500" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for samples, loops, one-shots..."
                  className="w-full bg-surface-900/50 border border-surface-700/50 rounded-xl pl-12 pr-12 py-3 text-white placeholder:text-surface-500 focus:outline-none focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/20 transition-all"
                />
                <button
                  type="submit"
                  disabled={!query.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-brand-400 hover:text-brand-300 disabled:text-surface-600 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>

            <button
              className="p-2 text-surface-400 hover:text-white rounded-lg hover:bg-surface-800/50 transition-colors"
              title="Theme switch coming soon"
              aria-disabled="true"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3 mt-4 flex-wrap">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSampleType('all')}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap',
                  sampleType === 'all'
                    ? 'bg-brand-500 text-white'
                    : 'bg-surface-800/50 border border-surface-700/50 text-surface-300 hover:text-white hover:border-surface-600'
                )}
              >
                All
              </button>
              <button
                onClick={() => setSampleType('single')}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap',
                  sampleType === 'single'
                    ? 'bg-brand-500 text-white'
                    : 'bg-surface-800/50 border border-surface-700/50 text-surface-300 hover:text-white hover:border-surface-600'
                )}
              >
                Single
              </button>
              <button
                onClick={() => setSampleType('pack')}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap',
                  sampleType === 'pack'
                    ? 'bg-brand-500 text-white'
                    : 'bg-surface-800/50 border border-surface-700/50 text-surface-300 hover:text-white hover:border-surface-600'
                )}
              >
                Packs
              </button>
            </div>

            <button
              onClick={() => setShowFiltersModal(true)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                hasFilters
                  ? 'bg-brand-500/15 border border-brand-500/40 text-brand-400'
                  : 'bg-surface-800/50 border border-surface-700/50 text-surface-300 hover:text-white hover:border-surface-600'
              )}
            >
              <Filter className="w-4 h-4" />
              Advanced Filters
              {hasFilters && <span className="ml-1 px-1.5 py-0.5 rounded-full bg-brand-500 text-white text-xs">•</span>}
            </button>

            {hasFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 px-3 py-2 text-sm text-surface-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
                Clear
              </button>
            )}

            {/* Active filters display */}
            {hasFilters && (
              <div className="flex items-center gap-2 flex-wrap">
                {genreFilter && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs">
                    Genre: {genreFilter}
                    <button onClick={() => setGenreFilter('')} className="hover:text-brand-300">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {moodFilter && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs">
                    Mood: {moodFilter}
                    <button onClick={() => setMoodFilter('')} className="hover:text-brand-300">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {typeFilter && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs">
                    Type: {typeFilter}
                    <button onClick={() => setTypeFilter('')} className="hover:text-brand-300">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {soundCategoryFilter && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs">
                    Category: {soundCategoryFilter}
                    <button onClick={() => setSoundCategoryFilter('')} className="hover:text-brand-300">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {keyFilter && keyFilter !== 'Any' && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs">
                    Key: {keyFilter}
                    <button onClick={() => setKeyFilter('')} className="hover:text-brand-300">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {(bpmMin || bpmMax) && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs">
                    BPM: {bpmMin || 'min'} - {bpmMax || 'max'}
                    <button onClick={() => { setBpmMin(''); setBpmMax(''); }} className="hover:text-brand-300">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content - Full Width */}
      <main className="w-full px-6 py-8">
        {/* Results */}
        {hasSearched && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-surface-400">
                <span className="text-white font-medium">{filteredResults.length}</span> results for &quot;{query}&quot;
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSearchAgain}
                  className="btn btn-secondary btn-sm"
                >
                  <RefreshCw className="w-4 h-4" />
                  Search Again
                </button>
                <button className="btn btn-ghost btn-sm">
                  <Sliders className="w-4 h-4" />
                  Sort by
                </button>
              </div>
            </div>

            {filteredResults.length === 0 ? (
              <div className="card p-10 text-center">
                <p className="text-white font-semibold mb-2">No results match these filters</p>
                <p className="text-surface-400 text-sm">Try clearing filters or adjusting BPM, genre, or mood.</p>
              </div>
            ) : (
              <>
                {/* Grouped by Provider */}
                {Object.entries(groupedResults).map(([provider, samples]) => (
                  <div key={provider} className="space-y-3">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-800/50 border border-surface-700/50">
                        <Music2 className="w-4 h-4 text-brand-400" />
                        <span className="text-sm font-semibold text-white">{provider}</span>
                        <span className="text-xs text-surface-500">({samples.length})</span>
                      </div>
                      <div className="flex-1 h-px bg-surface-800"></div>
                    </div>

                    <div className="space-y-2">
                      <AnimatePresence>
                        {samples.map((sample) => (
                          <SampleCard
                            key={sample.id}
                            sample={{ ...sample, starred: sample.favorited }}
                            onToggleStar={handleFavorite}
                          />
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                ))}

                <div className="pt-6 text-center">
                  <button
                    onClick={handleSearchAgain}
                    className="btn btn-primary"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Load More Samples
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Empty State */}
        {!hasSearched && (
          <div className="card p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-brand-500/20 flex items-center justify-center mx-auto mb-6">
              <Music2 className="w-8 h-8 text-brand-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Search for Samples</h3>
            <p className="text-surface-400 max-w-md mx-auto mb-8">
              Enter what you&apos;re looking for above. We&apos;ll search across Splice, Loopcloud, LANDR, and more to find the perfect sound.
            </p>
            
            <div className="flex flex-wrap justify-center gap-2">
              {['808 kicks', 'lo-fi piano', 'trap hi-hats', 'ambient pads', 'vocal chops'].map((term) => (
                <button
                  key={term}
                  onClick={() => { setQuery(term); inputRef.current?.focus(); }}
                  className="px-4 py-2 rounded-full text-sm text-surface-400 bg-surface-800/50 border border-surface-700/50 hover:text-white hover:border-surface-600 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Advanced Filters Modal */}
      {showFiltersModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowFiltersModal(false)} />
          <div className="relative w-full max-w-4xl card p-6 max-h-[90vh] overflow-y-auto z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-white">Advanced Filters</h3>
                <p className="text-sm text-surface-400">Refine your search with detailed filters</p>
              </div>
              <button
                onClick={() => setShowFiltersModal(false)}
                className="p-2 text-surface-400 hover:text-white rounded-lg hover:bg-surface-800/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* BPM Range */}
              <div>
                <label className="block text-sm font-medium text-white mb-3">BPM Range</label>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    min="60"
                    max="220"
                    value={bpmMin}
                    onChange={(e) => setBpmMin(e.target.value)}
                    placeholder="Min"
                    className="flex-1 bg-surface-900 border border-surface-700 rounded-lg px-4 py-3 text-sm text-surface-200 placeholder:text-surface-500 focus:outline-none focus:border-brand-500/50"
                  />
                  <span className="text-surface-500">to</span>
                  <input
                    type="number"
                    min="60"
                    max="220"
                    value={bpmMax}
                    onChange={(e) => setBpmMax(e.target.value)}
                    placeholder="Max"
                    className="flex-1 bg-surface-900 border border-surface-700 rounded-lg px-4 py-3 text-sm text-surface-200 placeholder:text-surface-500 focus:outline-none focus:border-brand-500/50"
                  />
                </div>
              </div>

              {/* Genre */}
              <div>
                <label className="block text-sm font-medium text-white mb-3">Genre</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 max-h-60 overflow-y-auto p-2 bg-surface-900/30 rounded-lg">
                  {genreOptions.map((genre) => (
                    <button
                      key={genre}
                      onClick={() => setGenreFilter(genreFilter === genre ? '' : genre)}
                      className={cn(
                        'px-3 py-2 rounded-lg text-sm transition-colors text-left',
                        genreFilter === genre
                          ? 'bg-brand-500 text-white'
                          : 'bg-surface-800/50 border border-surface-700/50 text-surface-300 hover:text-white hover:border-surface-600'
                      )}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mood */}
              <div>
                <label className="block text-sm font-medium text-white mb-3">Mood</label>
                <div className="flex flex-wrap gap-2">
                  {moodOptions.map((mood) => (
                    <button
                      key={mood}
                      onClick={() => setMoodFilter(moodFilter === mood ? '' : mood)}
                      className={cn(
                        'px-4 py-2 rounded-lg text-sm transition-colors',
                        moodFilter === mood
                          ? 'bg-brand-500 text-white'
                          : 'bg-surface-800/50 border border-surface-700/50 text-surface-300 hover:text-white hover:border-surface-600'
                      )}
                    >
                      {mood}
                    </button>
                  ))}
                </div>
              </div>

              {/* Key */}
              <div>
                <label className="block text-sm font-medium text-white mb-3">Key</label>
                <div className="grid grid-cols-6 sm:grid-cols-12 gap-2">
                  {['Any', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'].map((key) => (
                    <button
                      key={key}
                      onClick={() => setKeyFilter(key)}
                      className={cn(
                        'px-3 py-2 rounded-lg text-sm transition-colors',
                        keyFilter === key
                          ? 'bg-brand-500 text-white'
                          : 'bg-surface-800/50 border border-surface-700/50 text-surface-300 hover:text-white hover:border-surface-600'
                      )}
                    >
                      {key}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sample Type */}
              <div>
                <label className="block text-sm font-medium text-white mb-3">Sample Type</label>
                <div className="flex flex-wrap gap-2">
                  {typeOptions.map((type) => (
                    <button
                      key={type}
                      onClick={() => setTypeFilter(typeFilter === type ? '' : type)}
                      className={cn(
                        'px-4 py-2 rounded-lg text-sm transition-colors',
                        typeFilter === type
                          ? 'bg-brand-500 text-white'
                          : 'bg-surface-800/50 border border-surface-700/50 text-surface-300 hover:text-white hover:border-surface-600'
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sound Category */}
              <div>
                <label className="block text-sm font-medium text-white mb-3">Sound Category</label>
                <div className="flex flex-wrap gap-2">
                  {soundCategoryOptions.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSoundCategoryFilter(soundCategoryFilter === category ? '' : category)}
                      className={cn(
                        'px-4 py-2 rounded-lg text-sm transition-colors',
                        soundCategoryFilter === category
                          ? 'bg-brand-500 text-white'
                          : 'bg-surface-800/50 border border-surface-700/50 text-surface-300 hover:text-white hover:border-surface-600'
                      )}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Platforms */}
              <div>
                <label className="block text-sm font-medium text-white mb-3">Platforms</label>
                <div className="flex flex-wrap gap-2">
                  {providerOptions.map((provider) => (
                    <button
                      key={provider}
                      onClick={() => togglePlatform(provider)}
                      className={cn(
                        'px-4 py-2 rounded-lg text-sm transition-colors',
                        platformFilter.includes(provider)
                          ? 'bg-brand-500 text-white'
                          : 'bg-surface-800/50 border border-surface-700/50 text-surface-300 hover:text-white hover:border-surface-600'
                      )}
                    >
                      {provider}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t border-surface-800">
              <button
                onClick={clearFilters}
                className="btn btn-ghost"
              >
                Clear All Filters
              </button>
              <button
                onClick={() => setShowFiltersModal(false)}
                className="btn btn-primary"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
