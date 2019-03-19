import React, { createContext, useState } from 'react';

export const ContextError = createContext({});

export const ContextErrorProvider = ({ children }) => {
  let [errors, setError] = useState(null);

  return (
    <ContextError.Provider value={{
      errors,
      setError
    }}>
      {children}
    </ContextError.Provider>
  );
};
