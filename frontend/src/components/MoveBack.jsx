import React from 'react';
import { NavLink } from 'react-router-dom';
import backToMenu from '../assets/icons/back-to-menu.png';

export const MoveBack = ({ back }) => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-12 p-0">
        <div className="back-to-menu">
          <NavLink to={back || '/dashboard'}>
            <img src={backToMenu} alt="back to menu"/>
          </NavLink>
        </div>
      </div>
    </div>
  </div>
);
