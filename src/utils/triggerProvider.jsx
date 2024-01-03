import React, { createContext, useContext, useState } from 'react';

const TriggerContext = createContext();

export const useTrigger = () => {
  return useContext(TriggerContext);
};

export const TriggerProvider = ({ children }) => {
  const [trigger, setTrigger] = useState(false);

  const toggleTrigger = () => {
    setTrigger((prevTrigger) => !prevTrigger);
  };

  return (
    <TriggerContext.Provider value={{ trigger, toggleTrigger }}>
      {children}
    </TriggerContext.Provider>
  );
};
