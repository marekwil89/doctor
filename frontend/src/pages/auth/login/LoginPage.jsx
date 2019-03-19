import React from 'react';
import { NavLink } from 'react-router-dom';
import { LoginForm } from './LoginForm';
import logoMain from '../../../assets/img/logo-main.png';
import { RedirectIfUser } from '../../../components/RedirectIfUser';

export const LoginPage = () => (
  <RedirectIfUser>
    <section>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="logo-main">
              <img src={logoMain} className="img-fluid" alt="Logo - PlanetHerbs"/>
            </div>
          </div>
        </div>
        <LoginForm/>

        <div className="container">
          <div className="col-md-12">
            <div className="new-acc">
              <h5>NIE MASZ JESZCZE KONTA?</h5>
              <NavLink to="/register">STWÓRZ KONTO</NavLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </RedirectIfUser>
);
