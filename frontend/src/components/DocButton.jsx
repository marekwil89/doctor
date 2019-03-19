import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';

const styles = () => ({
  button: {
    borderRadius: '50px',
    fontWeight: 700
  },
  main: {
    background: 'linear-gradient(90deg, rgba(1,227,129,1) 0%, rgba(0,192,115,1) 100%)',
    color: '#fff',
    textTransform: 'uppercase'
  },
  invert: {
    color: '#4c5572',
    background: '#fff',
    textTransform: 'uppercase'
  },
  secondary: {
    background: '#4c5572',
    color: '#fff',
    textTransform: 'capitalize'
  },
  error: {
    background: '#f70000',
    color: '#fff',
    textTransform: 'capitalize'
  },
  transparent: {
    background: 'transparent',
    color: '#4c5572',
    boxShadow: 'none',
    textTransform: 'capitalize'
  },
  menu: {
    width: '100%',
    boxShadow: 'none',
    padding: '8px 15px',
    border: 'none',
    borderRadius: '0',
    color: 'rgba(0, 0, 0, 0.87)',
    fontWeight: 400,
    display: 'block',
    background: 'transparent',
    '&:hover': {
      background: '#d5d5d5'
    }
  }
});

export const DocButton = withStyles(styles)(({ classes, name, variant, ...rest }) => (
  <Button
    {...rest}
    margin="normal"
    variant="contained"
    className={`${classes.button} ${classes[variant]}`}
  >
    {name}
  </Button>
));
