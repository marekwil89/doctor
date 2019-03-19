import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { DoctorsPage } from './pages/doctor/DoctorsPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { PatientsPage } from './pages/patient/PatientsPage';
import { PatientPage } from './pages/patient/PatientPage';
import { RecipePage } from './pages/recipe/RecipePage';
import { OperationPage } from './pages/operation/OperationPage';
import { MedicinesPage } from "./pages/medicine/MedicinesPage";
import { LoginPage } from './pages/auth/login/LoginPage';
import { RegisterPage } from './pages/auth/register/RegisterPage';
import { RedirectIfNotUser } from './components/RedirectIfNotUser';

export const Routing = () => (
  <Switch>
    <Route exact path='/' component={LoginPage}/>
    <Route exact path='/register' component={RegisterPage}/>
    <RedirectIfNotUser>
      <Route exact path='/doctors' component={DoctorsPage}/>
      <Route exact path='/dashboard' component={DashboardPage}/>
      <Route exact path='/patients' component={PatientsPage}/>
      <Route exact path='/patient/:id' component={PatientPage}/>
      <Route exact path='/recipe/:id' component={RecipePage}/>
      <Route exact path='/operation/:id' component={OperationPage}/>
      <Route exact path='/medicines' component={MedicinesPage}/>
    </RedirectIfNotUser>
  </Switch>
)
