import React from 'react';
import { Modal } from '../../components/Modal';
import { MedicinesList } from './MedicinesList';
import { MedicineForm } from './MedicineForm';
import { Header } from '../../components/Header';
import { MoveBack } from '../../components/MoveBack';
import { Permission } from '../../components/Permission';
import { MedicineSearch } from './MedicineSearch';

export const MedicinesPage = () => {

  return (
    <section>
      <MoveBack/>
      <Header title="Lista lekarstw">
        <Permission required="admin">
          <Modal button="Nowy lek" btnVariant="invert" btnName="Dodaj lekarstwo" btnSize="large" title="Dodaj nowy lek">
            <MedicineForm/>
          </Modal>
        </Permission>
      </Header>
      <MedicineSearch/>
      <MedicinesList/>
    </section>
  );
};
