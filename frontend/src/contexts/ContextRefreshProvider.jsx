import React, { createContext, useState } from 'react';

export const ContextRefresh = createContext(null);

export const ContextRefreshProvider = ({ children }) => {
  let [refresh, setRefresh] = useState(false);

  return (
    <ContextRefresh.Provider value={{
      refresh,
      setRefresh
    }}>
      {children}
    </ContextRefresh.Provider>
  );
};
