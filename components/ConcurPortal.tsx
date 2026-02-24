
import React, { useState } from 'react';
import { Plane, MapPin, Calendar, Users, Search, Building2, CreditCard, CheckCircle2, AlertCircle, ChevronRight, Info, Star } from 'lucide-react';
import { ACTIVE_ROSTER } from '../constants';

const PROXY_PROFILES = ACTIVE_ROSTER.map(person => ({
  id: person.id,
  name: person.name,
  org: person.department,
  cap: person.clearance === 'L5-OMEGA' ? 1000 : 500,
  security: person.clearance,
  style: 'Business Premium'
}));

export const ConcurPortal: React.FC = () => {
  const [selectedProfile, setSelectedProfile] = useState(PROXY_PROFILES[0]);
  const [searchQuery, setSearchQuery] = useState('NoMad District, New York');
  const [isSearching, setIsSearching] = useState(false);
  const [bookingStep, setBookingStep] = useState<'search' | 'results' | 'confirm'>('search');

  const hotels = [
    { id: 1, name: 'The NoMad Hotel', price: 450, rating: 4.8, distance: '0.2 miles', image: 'https://picsum.photos/seed/nomad/400/300' },
    { id: 2, name: 'Ace Hotel New York', price: 320, rating: 4.5, distance: '0.4 miles', image: 'https://picsum.photos/seed/ace/400/300' },
    { id: 3, name: 'The Ritz-Carlton NoMad', price: 850, rating: 4.9, distance: '0.1 miles', image: 'https://picsum.photos/seed/ritz/400/300' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
            <Plane size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">SAP Concur</h2>
            <p className="text-white/50 mt-1">Enterprise Proxy Reservation Portal</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3">
            <div className="text-right">
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Proxy Active</p>
              <p className="text-sm font-medium text-white">{selectedProfile.name}</p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
              <Users size={16} className="text-emerald-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left: Profile & Search */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
            <div className="space-y-4">
              <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Select Proxy Profile</label>
              <div className="space-y-2">
                {PROXY_PROFILES.map(profile => (
                  <button
                    key={profile.id}
                    onClick={() => setSelectedProfile(profile)}
                    className={`w-full p-3 rounded-xl border transition-all text-left flex items-center gap-3 ${
                      selectedProfile.id === profile.id 
                        ? 'bg-blue-600/10 border-blue-500/50 text-white' 
                        : 'bg-black/40 border-white/5 text-white/40 hover:border-white/20'
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${selectedProfile.id === profile.id ? 'bg-blue-500 animate-pulse' : 'bg-white/10'}`}></div>
                    <span className="text-sm font-medium">{profile.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/40 font-medium">Daily Cap</span>
                <span className="text-white font-mono">${selectedProfile.cap}</span>
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full w-1/3"></div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-xl shadow-blue-900/20">
            <h4 className="font-bold flex items-center gap-2 mb-2">
              <Info size={16} />
              Policy Alert
            </h4>
            <p className="text-sm text-blue-100 leading-relaxed">
              NoMad district bookings require L5-OMEGA clearance for automated expense approval.
            </p>
          </div>
        </div>

        {/* Right: Main Content */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                  placeholder="Where to?"
                />
              </div>
              <button 
                onClick={() => {
                  setIsSearching(true);
                  setTimeout(() => {
                    setIsSearching(false);
                    setBookingStep('results');
                  }, 1500);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl py-4 flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20"
              >
                {isSearching ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Search size={20} />}
                Search Hotels
              </button>
            </div>
          </div>

          {bookingStep === 'results' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {hotels.map(hotel => (
                <div key={hotel.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group hover:border-blue-500/30 transition-all">
                  <div className="h-48 relative overflow-hidden">
                    <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-4 right-4 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg flex items-center gap-1 text-xs font-bold text-yellow-400">
                      <Star size={12} fill="currentColor" />
                      {hotel.rating}
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-bold text-white">{hotel.name}</h4>
                        <p className="text-sm text-white/40 flex items-center gap-1 mt-1">
                          <MapPin size={12} />
                          {hotel.distance} from NoMad
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-white">${hotel.price}</p>
                        <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest">per night</p>
                      </div>
                    </div>
                    <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium transition-all flex items-center justify-center gap-2">
                      View Details
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {bookingStep === 'search' && (
            <div className="h-96 flex flex-col items-center justify-center text-white/20 border-2 border-dashed border-white/5 rounded-3xl">
              <Building2 size={64} className="mb-4 opacity-10" />
              <p className="text-lg font-medium">Enter a destination to view available properties</p>
              <p className="text-sm opacity-50">Proxy reservations are subject to enterprise audit.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
