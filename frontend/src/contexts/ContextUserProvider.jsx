import React, { createContext, useState } from 'react';
import server from '../helpers/config';
import { setMethod } from '../helpers/setMethod';

export const ContextUser = createContext(null);

export const ContextUserProvider = ({ children }) => {
  let [user, setUser] = useState(null);

  const getLogedUser = async () => {
    const responseData = await fetch(`${server.host}${server.port}/auth/loged`, setMethod('GET'));

    try {
      const { user } = await responseData.json();

      setUser(user);
    } catch (e) {
      console.log(e);
    }
  };

  useState(() => {
    getLogedUser();
  }, []);

  return (
    <ContextUser.Provider value={{
      getLogedUser,
      user
    }}>
      {children}
    </ContextUser.Provider>
  );
};
