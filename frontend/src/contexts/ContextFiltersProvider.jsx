import React, { createContext, useState } from 'react';

export const ContextFilters = createContext(null);

export const ContextFiltersProvider = ({ children }) => {
  let [filters, setFilters] = useState({
    fullName: '',
    lastVisit: '',
    medicineName: ''
  });

  return (
    <ContextFilters.Provider value={{
      filters,
      setFilters
    }}>
      {children}
    </ContextFilters.Provider>
  );
};
