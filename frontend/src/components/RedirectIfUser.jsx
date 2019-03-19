import React, { useContext } from 'react';
import { ContextUser } from '../contexts/ContextUserProvider';
import { __RouterContext } from 'react-router';

export const RedirectIfUser = ({ children }) => {
  const { user } = useContext(ContextUser);
  const { history } = useContext(__RouterContext);

  if (user) {
    history.push('/dashboard');
  }
  return (children);
};
