import React from 'react';
import { withStyles } from '@material-ui/core';

const styles = () => ({
  header: {
    padding: '20px 0',
    background: 'linear-gradient(90deg, rgba(0,178,214,1) 0%, rgba(0,178,214,1) 100%)',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  title: {
    fontSize: 30
  }
});

export const Header = withStyles(styles)
(({ children, classes, title }) => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-sm-12 p-0">
        <div className="heading">
          <div className="title mr-auto">
            <h4>{title}</h4>
          </div>
          <div className="modal-open">
            {children}
          </div>
        </div>
      </div>
    </div>
  </div>
));
