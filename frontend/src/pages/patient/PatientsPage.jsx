import React from 'react';
import { PatientForm } from './PatientForm';
import { PatientsList } from './PatientsList';
import { PatientSearch } from './PatientsSearch';
import { Modal } from '../../components/Modal';
import { Header } from '../../components/Header';
import { MoveBack } from '../../components/BackNavigation';
import { Permission } from '../../components/Permission';

export const PatientsPage = () => {
  return (
    <section>
      <MoveBack/>
      <Header title="Lista Pacjentów">
        <Permission required="doctor">
          <Modal btnName="nowy Pacient" btnVariant="invert" btnSize="large" title="Nowy pacjent">
            <PatientForm/>
          </Modal>
        </Permission>
      </Header>
      <PatientSearch/>
      <PatientsList/>
    </section>
  );
};
