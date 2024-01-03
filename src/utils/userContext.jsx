// UserContext.js
'use client'
import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [photoChanged, setPhotoChanged] = useState(false);

  const updatePhotoChanged = () => {
    setPhotoChanged(true);
  };

  return (
    <UserContext.Provider value={{ photoChanged, updatePhotoChanged }}>
      {children}
    </UserContext.Provider>
  );
};
