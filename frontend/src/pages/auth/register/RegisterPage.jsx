import React from 'react';
import { RegisterForm } from './RegisterForm';
import logoMain from '../../../assets/img/logo-main.png'
import { MoveBack } from "../../../components/BackNavigation";

export const RegisterPage = () => {

  return (
    <section>
      <MoveBack/>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="logo-main">
              <img src={logoMain} className="img-fluid" alt="Logo - PlanetHerbs"/>
            </div>
          </div>
        </div>
        <RegisterForm/>
      </div>
    </section>
  )
};
