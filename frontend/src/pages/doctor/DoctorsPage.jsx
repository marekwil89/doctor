import React from 'react';
import { DoctorsList } from './DoctorsList';
import { MoveBack } from '../../components/BackNavigation';
import { Header } from '../../components/Header';

export const DoctorsPage = () => {
  return (
    <section>
      <MoveBack/>
      <Header title="Lista Doktorów">
      </Header>
      <DoctorsList/>
    </section>
  );
};
