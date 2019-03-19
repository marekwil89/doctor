import React from 'react';
import { PatientDetail } from './PatientDetail';
import { RecipesList } from '../recipe/RecipesList';
import { Modal } from '../../components/Modal';
import { RecipeForm } from '../recipe/RecipeForm';
import { OperationForm } from '../operation/OperationForm';
import { OperationsList } from '../operation/OperationsList';
import { MoveBack } from '../../components/MoveBack';
import { Permission } from '../../components/Permission';

export const PatientPage = () => {

  return (
    <section>
      <MoveBack back='/patients'/>
      <PatientDetail/>

      <div className="container">
        <div className="recipe-section">
          <div className="row">
            <div className="col-md-12 mb-2">
              <div className="title-small">
                <h6>RECEPTY PACJENTA</h6>
              </div>
            </div>
            <div className="col-md-12">
              <div className="add-new">
                <Permission required="doctor">
                  <Modal btnName="Dodaj receptę" btnVariant="main" btnSize="small" title="Dodaj Receptę">
                    <RecipeForm/>
                  </Modal>
                </Permission>
              </div>
            </div>
            <div className="col-md-12">
              <RecipesList/>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="recipe-section">
          <div className="row">
            <div className="col-md-12 mb-2">
              <div className="title-small">
                <h6>OSTATNIE ZABIEGI PACJENTA</h6>
              </div>
            </div>
            <div className="col-md-12">
              <div className="add-new">
                <Permission required="doctor">
                  <Modal btnName="Dodaj Zabieg" btnVariant="main" btnSize="small" title="Dodaj Zabieg">
                    <OperationForm/>
                  </Modal>
                </Permission>
              </div>
            </div>
            <div className="col-md-12">
              <OperationsList/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
