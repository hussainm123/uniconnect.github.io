
import React, { useEffect, useState } from 'react';
import { getRecommendedEvents, EventItem } from '../services/geminiService';
import { CalendarIcon, ExternalLinkIcon, HeartIcon, RefreshIcon } from './Icons';

interface EventsDashboardProps {
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
}

const EventsDashboard: React.FC<EventsDashboardProps> = ({ favorites, onToggleFavorite }) => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'All' | 'Nightlife' | 'Culture' | 'University'>('All');

  const fetchEvents = async () => {
    setLoading(true);
    const data = await getRecommendedEvents();
    setEvents(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = events.filter(e => filter === 'All' || e.category === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-hs-gold">Upcoming Events</h2>
          <p className="text-gray-600 text-sm">Curated from local sources like @pfnext, @asta_pf & HS Pforzheim</p>
        </div>
        <button 
          onClick={fetchEvents} 
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-50 text-hs-dark rounded-lg hover:bg-yellow-100 transition border border-yellow-200 disabled:opacity-50"
        >
          <RefreshIcon className={loading ? "animate-spin" : ""} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {['All', 'University', 'Nightlife', 'Culture'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat as any)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition ${
              filter === cat 
                ? 'bg-hs-gold text-hs-dark' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-40 bg-gray-100 rounded-xl border border-gray-200"></div>
          ))}
        </div>
      )}

      {/* Events Grid */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <div className="bg-yellow-50 text-hs-gold text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">
                  {event.category}
                </div>
                <button onClick={() => onToggleFavorite(event.id)} className="text-gray-400 hover:text-red-500 transition">
                   <HeartIcon filled={favorites.has(event.id)} />
                </button>
              </div>
              
              <h3 className="text-lg font-bold text-hs-dark mb-1">{event.title}</h3>
              
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                <CalendarIcon className="w-4 h-4" />
                <span>{event.date}</span>
                <span className="mx-1">•</span>
                <span>{event.location}</span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 flex-grow">{event.description}</p>
              
              <a 
                href={event.sourceUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2 bg-gray-50 hover:bg-gray-100 text-hs-dark text-sm font-medium rounded-lg border border-gray-200 transition"
              >
                <span>More Info</span>
                <ExternalLinkIcon className="w-4 h-4" />
              </a>
            </div>
          ))}
          
          {filteredEvents.length === 0 && (
            <div className="col-span-full text-center py-10 text-gray-500">
              No events found for this category.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EventsDashboard;
