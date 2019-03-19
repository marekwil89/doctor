import React, { useContext, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { DocButton } from './DocButton';
import { ContextRefresh } from '../contexts/ContextRefreshProvider';

export const Modal = ({ children, btnName, btnSize, btnVariant, BtnOwn, BtnOwnName, title }) => {
  const { refresh, setRefresh } = useContext(ContextRefresh);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(!open);
    setRefresh(!refresh);
  };

  return (
    <>
      {BtnOwn ? <BtnOwn onClick={handleClose}/> : (
        <DocButton
          onClick={handleClose}
          size={btnSize || 'small'}
          name={btnName || 'open modal'}
          variant={btnVariant || 'main'}
        />
      )}
      <Dialog fullWidth={true} open={open} onClose={handleClose}>
        <DialogTitle className="dialog-title">
          <p>{title}</p>
        </DialogTitle>
        <DialogContent>
          {children}
        </DialogContent>
      </Dialog>
    </>
  );
};

