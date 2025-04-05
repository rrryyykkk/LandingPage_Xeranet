import { createContext, useContext, useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { getHeroSettings } from '../services/heroService';

const HeroSettingsContext = createContext();

export const useHeroSettings = () => {
  const context = useContext(HeroSettingsContext);
  if (!context) {
    throw new Error('useHeroSettings must be used within a HeroSettingsProvider');
  }
  return context;
};

export const HeroSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    title: '',
    subtitle: '',
    background: null
  });

  const { data, isLoading, error } = useQuery('heroSettings', getHeroSettings);

  useEffect(() => {
    if (data) {
      setSettings(data);
    }
  }, [data]);

  const value = {
    settings,
    setSettings,
    isLoading,
    error
  };

  return (
    <HeroSettingsContext.Provider value={value}>
      {children}
    </HeroSettingsContext.Provider>
  );
}; 