
import React, { useState } from 'react';
import Chatbot from './components/Chatbot';
import OnboardingFlow from './components/OnboardingFlow';
import BlockchainFlow from './components/BlockchainFlow';
import LowCodeForm from './components/LowCodeForm';
import EventsDashboard from './components/EventsDashboard';
import StudentPortal from './components/StudentPortal';
import CommunityConnect from './components/CommunityConnect';
import { ChatIcon, AutomationIcon, SecurityIcon, FormIcon, CalendarIcon, AcademicCapIcon, CommunityIcon } from './components/Icons';

type Tab = 'chatbot' | 'events' | 'community' | 'automation' | 'security' | 'portal' | 'lowcode';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('chatbot');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const handleToggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavs = new Set(prev);
      if (newFavs.has(id)) {
        newFavs.delete(id);
      } else {
        newFavs.add(id);
      }
      return newFavs;
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'chatbot':
        return <Chatbot />;
      case 'events':
        return <EventsDashboard favorites={favorites} onToggleFavorite={handleToggleFavorite} />;
      case 'community':
        return <CommunityConnect favorites={favorites} />;
      case 'automation':
        return <OnboardingFlow />;
      case 'security':
        return <BlockchainFlow />;
      case 'portal':
        return <StudentPortal />;
      case 'lowcode':
        return <LowCodeForm />;
      default:
        return <Chatbot />;
    }
  };

  const TabButton = ({ tab, label, icon }: { tab: Tab, label: string, icon: React.ReactElement }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex-1 flex flex-col justify-center items-center gap-1 sm:gap-2 px-2 py-3 text-xs sm:text-sm font-medium rounded-t-lg transition-all duration-300 ease-in-out whitespace-nowrap ${
        activeTab === tab 
        ? 'bg-white text-hs-gold border-b-2 border-hs-gold shadow-sm' 
        : 'text-gray-500 hover:bg-yellow-50 hover:text-hs-gold/80'
      }`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-soft-yellow font-sans flex flex-col">
      <header className="bg-soft-yellow/80 backdrop-blur-sm p-4 sticky top-0 z-10 border-b border-yellow-200">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
           <span className="text-3xl">🎓</span>
           <h1 className="text-xl md:text-2xl font-bold text-hs-dark">
            HS Pforzheim UniConnect
          </h1>
        </div>
      </header>

      <main className="flex-grow flex flex-col max-w-5xl w-full mx-auto p-2 sm:p-4">
        <div className="w-full bg-white rounded-lg shadow-lg flex flex-col flex-grow">
          <nav className="grid grid-cols-7 gap-1 p-2 border-b border-gray-200 bg-yellow-50/50 rounded-t-lg overflow-x-auto">
            <TabButton tab="chatbot" label="Chatbot" icon={<ChatIcon />} />
            <TabButton tab="events" label="Events" icon={<CalendarIcon />} />
            <TabButton tab="community" label="Connect" icon={<CommunityIcon />} />
            <TabButton tab="portal" label="Portal" icon={<AcademicCapIcon />} />
            <TabButton tab="automation" label="Workflow" icon={<AutomationIcon />} />
            <TabButton tab="security" label="Security" icon={<SecurityIcon />} />
            <TabButton tab="lowcode" label="Support" icon={<FormIcon />} />
          </nav>
          <div className="flex-grow p-4 overflow-y-auto">
            {renderContent()}
          </div>
        </div>
      </main>

       <footer className="text-center p-4 text-xs text-gray-500">
          <p>Powered by Gemini API | HS Pforzheim University Project</p>
      </footer>
    </div>
  );
};

export default App;
