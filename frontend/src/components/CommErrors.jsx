import React, { useContext } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { ContextError } from '../contexts/ContextErrorProvider';

export const CommErrors = () => {
  const { errors } = useContext(ContextError);

  const open = !!errors;

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      autoHideDuration={6000}
      message={errors && errors[0] && errors[0].msg}
    />
  );
};
