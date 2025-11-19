
import React from 'react';
import { UserIcon, MessageBubbleIcon, HeartIcon } from './Icons';

interface CommunityConnectProps {
  favorites: Set<string>;
}

// Mock data for students and their interests. 
// In a real app, this would come from a backend matching service.
const MOCK_USERS = [
  {
    id: 's1',
    name: 'Lukas M.',
    major: 'Intl. Business',
    country: 'Germany',
    likedEventIds: ['1', '3'], // Matches mocked Event IDs
    avatarColor: 'bg-blue-100 text-blue-600',
  },
  {
    id: 's2',
    name: 'Sarah J.',
    major: 'Design',
    country: 'USA',
    likedEventIds: ['1'],
    avatarColor: 'bg-green-100 text-green-600',
  },
  {
    id: 's3',
    name: 'Miguel R.',
    major: 'Engineering',
    country: 'Spain',
    likedEventIds: ['2', '3'],
    avatarColor: 'bg-orange-100 text-orange-600',
  },
  {
    id: 's4',
    name: 'Yuki T.',
    major: 'MBA',
    country: 'Japan',
    likedEventIds: ['2'],
    avatarColor: 'bg-purple-100 text-purple-600',
  }
];

// Mock event names mapping for display
const EVENT_NAMES: Record<string, string> = {
  '1': 'Semester Opening Party',
  '2': 'International Orientation',
  '3': 'City Food Festival'
};

const CommunityConnect: React.FC<CommunityConnectProps> = ({ favorites }) => {
  
  const getSharedInterests = (userEventIds: string[]) => {
    return userEventIds.filter(id => favorites.has(id));
  };

  const sortedUsers = [...MOCK_USERS].sort((a, b) => {
    const aShared = getSharedInterests(a.likedEventIds).length;
    const bShared = getSharedInterests(b.likedEventIds).length;
    return bShared - aShared; // Sort by number of shared interests descending
  });

  const handleStartChat = (userName: string) => {
    alert(`Starting a secure conversation with ${userName}... \n(This is a demo feature)`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold text-hs-gold">Community Connect</h2>
        <p className="text-gray-600 text-sm">Find students going to the same events as you.</p>
      </div>

      {favorites.size === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
            <HeartIcon filled={false} />
            <p className="text-hs-dark font-medium mt-2">No events favorited yet.</p>
            <p className="text-sm text-gray-600 mt-1">Go to the <strong>Events</strong> tab and like some events to see who else is going!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedUsers.map((user) => {
            const shared = getSharedInterests(user.likedEventIds);
            const isMatch = shared.length > 0;

            return (
              <div key={user.id} className={`border rounded-xl p-5 flex flex-col gap-3 transition ${isMatch ? 'bg-white border-hs-gold/50 shadow-sm' : 'bg-gray-50 border-gray-200 opacity-75'}`}>
                 <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${user.avatarColor}`}>
                            {user.name.charAt(0)}
                        </div>
                        <div>
                            <h3 className="font-bold text-hs-dark">{user.name}</h3>
                            <p className="text-xs text-gray-500">{user.major} • From {user.country}</p>
                        </div>
                    </div>
                    {isMatch && (
                        <span className="bg-hs-gold text-hs-dark text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                            {shared.length} Shared
                        </span>
                    )}
                 </div>

                 {isMatch ? (
                    <div className="bg-yellow-50 rounded-md p-2 text-xs text-gray-700">
                        <span className="font-semibold text-hs-gold">Also going to:</span>
                        <ul className="list-disc list-inside mt-1">
                            {shared.map(eid => (
                                <li key={eid}>{EVENT_NAMES[eid] || 'An Event'}</li>
                            ))}
                        </ul>
                    </div>
                 ) : (
                     <p className="text-xs text-gray-400 italic">No shared events yet.</p>
                 )}

                 <button 
                    onClick={() => handleStartChat(user.name)}
                    className="mt-auto w-full py-2 flex items-center justify-center gap-2 bg-hs-dark text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition"
                 >
                    <MessageBubbleIcon />
                    <span>Message</span>
                 </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CommunityConnect;
