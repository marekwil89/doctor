import React, { useContext } from 'react';
import { __RouterContext } from 'react-router';
import { NavLink } from 'react-router-dom';
import { ContextUser } from '../contexts/ContextUserProvider';
import { Permission } from '../components/Permission';

export const Navigation = () => {
  const { history } = useContext(__RouterContext);
  const { user, getLogedUser } = useContext(ContextUser);

  const logout = async () => {
    localStorage.removeItem('token');
    getLogedUser();
    history.push('/');
  };

  return (
    <>
      <p>{JSON.stringify(user)}</p>
      <div>
        <nav>
          <NavLink to='/'>mainPage</NavLink>
          <NavLink to='/dashboard'>dashboard</NavLink>
          <NavLink to='/patients'>Pacjenci</NavLink>
          <NavLink to='/medicines'>leki</NavLink>
          <a href="###" onClick={logout}>Wyloguj się</a>
          <Permission required="admin">
            <NavLink to='/doctors'>admin - doctors</NavLink>
          </Permission>
        </nav>
      </div>
    </>
  );
};

