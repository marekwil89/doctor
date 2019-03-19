import React, { useContext } from 'react';
import { ContextUser } from '../contexts/ContextUserProvider';

export const Permission = ({ required, children }) => {
  const { user } = useContext(ContextUser);

  const permission = user && user.admin ? 'admin' : 'doctor';

  return permission === required && (children);
};
