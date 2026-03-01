import { useState, useEffect } from 'react';
import HomeScreen from './components/HomeScreen';
import SetupScreen from './components/SetupScreen';
import Dashboard from './components/Dashboard';
import RSVPView from './components/RSVPView';
import RulesPage from './components/RulesPage';

const STORAGE_KEY = 'get-together-event';

export default function App() {
  const [screen, setScreen] = useState('home');
  const [cookoutData, setCookoutData] = useState(null);

  useEffect(() => {
    // Check URL for special routes first
    const params = new URLSearchParams(window.location.search);
    const rsvpId = params.get('rsvp');
    const page = params.get('page');

    if (page === 'rules') { setScreen('rules'); return; }
    if (rsvpId) { setScreen('rsvp'); return; }

    // Load saved data
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.event && parsed?.screen === 'dashboard') {
          setCookoutData(parsed);
          setScreen('dashboard');
        }
      }
    } catch (e) {}
  }, []);

  const handleSetupComplete = ({ event, hosts, guests }) => {
    const data = { event, hosts, guests, screen: 'dashboard' };
    setCookoutData(data);
    setScreen('dashboard');
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) {}
  };

  const handleDataChange = (updatedData) => {
    setCookoutData(updatedData);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...updatedData, screen: 'dashboard' })); } catch (e) {}
  };

  const handleReset = () => {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
    setCookoutData(null);
    setScreen('home');
  };

  if (screen === 'rules') return <RulesPage />;
  if (screen === 'rsvp') return <RSVPView />;
  if (screen === 'home') return <HomeScreen onStart={() => setScreen('setup')} onRules={() => setScreen('rules')} />;
  if (screen === 'setup') return <SetupScreen onComplete={handleSetupComplete} onBack={() => setScreen('home')} />;
  if (screen === 'dashboard' && cookoutData) return (
    <Dashboard
      event={cookoutData.event}
      initialHosts={cookoutData.hosts || []}
      initialGuests={cookoutData.guests || []}
      onDataChange={handleDataChange}
      onReset={handleReset}
    />
  );
  return null;
}
