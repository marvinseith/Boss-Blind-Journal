import React, { useState, useMemo } from 'react';
import { Search, RotateCcw } from 'lucide-react';

const BOSS_BLINDS = [
  { id: 1, name: "The Hook", description: "Discards 2 random cards per hand played" },
  { id: 2, name: "The Ox", description: "Playing most played poker hand sets money to $0" },
  { id: 3, name: "The House", description: "First hand is drawn face down" },
  { id: 4, name: "The Wall", description: "Extra large blind" },
  { id: 5, name: "The Wheel", description: "1 in 7 cards get drawn face down" },
  { id: 6, name: "The Arm", description: "Decrease level of played poker hand" },
  { id: 7, name: "The Club", description: "All Clubs are debuffed" },
  { id: 8, name: "The Fish", description: "Cards drawn face down after each hand played" },
  { id: 9, name: "The Psychic", description: "Must play 5 cards" },
  { id: 10, name: "The Goad", description: "All Spades are debuffed" },
  { id: 11, name: "The Water", description: "Start with 0 discards" },
  { id: 12, name: "The Window", description: "All Diamonds are debuffed" },
  { id: 13, name: "The Manacle", description: "Start with 0 hands" },
  { id: 14, name: "The Eye", description: "No repeat hand types this round" },
  { id: 15, name: "The Mouth", description: "Play only 1 hand type this round" },
  { id: 16, name: "The Plant", description: "All face cards are debuffed" },
  { id: 17, name: "The Serpent", description: "After play or discard, always draw 3 cards" },
  { id: 18, name: "The Pillar", description: "Cards played previously this Ante are debuffed" },
  { id: 19, name: "The Needle", description: "Play only 1 hand" },
  { id: 20, name: "The Head", description: "All Hearts are debuffed" },
  { id: 21, name: "The Tooth", description: "Lose $1 per card played" },
  { id: 22, name: "The Flint", description: "Base Chips and Mult are halved" },
  { id: 23, name: "The Mark", description: "All face cards are drawn face down" },
  { id: 24, name: "Amber Acorn", description: "Flips and shuffles all Joker cards" },
  { id: 25, name: "Verdant Leaf", description: "All cards are debuffed until 1 Joker is sold" },
  { id: 26, name: "Violet Vessel", description: "Very large blind" },
  { id: 27, name: "Crimson Heart", description: "One random Joker disabled every hand" },
  { id: 28, name: "Cerulean Bell", description: "Forces 1 card to always be selected" },
];

export default function BalatroTracker() {
  const [seenBosses, setSeenBosses] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlySeen, setShowOnlySeen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const filteredBosses = useMemo(() => {
    let bosses = BOSS_BLINDS;
    
    if (showOnlySeen) {
      bosses = bosses.filter(boss => seenBosses.has(boss.id));
    }
    
    if (searchTerm) {
      bosses = bosses.filter(boss =>
        boss.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        boss.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return bosses;
  }, [searchTerm, showOnlySeen, seenBosses]);

  const toggleBoss = (id) => {
    setSeenBosses(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const resetGame = () => {
    setSeenBosses(new Set());
    setSearchTerm('');
    setShowOnlySeen(false);
    setShowConfirm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg p-6 max-w-sm w-full border-2 border-red-500">
            <h3 className="text-xl font-bold text-white mb-3">Start New Run?</h3>
            <p className="text-gray-300 mb-6">This will reset all tracked bosses.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={resetGame}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-900 rounded-lg shadow-2xl p-6 mb-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Balatro Boss Tracker
            </h1>
            <button
              onClick={() => setShowConfirm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              <RotateCcw size={18} />
              New Run
            </button>
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search boss blinds..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                aria-label="Clear search"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>

          <div className="text-sm text-gray-400 mb-4">
            Encountered: {seenBosses.size} / {BOSS_BLINDS.length}
          </div>

          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setShowOnlySeen(false)}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                !showOnlySeen
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              All Bosses
            </button>
            <button
              onClick={() => setShowOnlySeen(true)}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                showOnlySeen
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Encountered ({seenBosses.size})
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {filteredBosses.map(boss => (
            <div
              key={boss.id}
              onClick={() => toggleBoss(boss.id)}
              className={`bg-gray-900 rounded-lg p-4 cursor-pointer transition-all ${
                seenBosses.has(boss.id)
                  ? 'border-2 border-green-500 bg-green-900/20'
                  : 'border-2 border-gray-700 hover:border-gray-600'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center mt-1 ${
                  seenBosses.has(boss.id)
                    ? 'bg-green-500 border-green-500'
                    : 'border-gray-600'
                }`}>
                  {seenBosses.has(boss.id) && (
                    <svg className="w-4 h-4 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-purple-300 mb-1">
                    {boss.name}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {boss.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBosses.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            No boss blinds found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}