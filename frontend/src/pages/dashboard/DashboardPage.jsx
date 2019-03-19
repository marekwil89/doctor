import React, { useContext, useEffect } from 'react';
import licence from '../../assets/icons/licence.png';
import client from '../../assets/icons/client.png';
import med from '../../assets/icons/med.png';
import patient from '../../assets/icons/patient.png';
import { __RouterContext, NavLink } from "react-router-dom";
import { ContextUser } from "../../contexts/ContextUserProvider";
import { DocButton } from "../../components/DocButton";
import { Modal } from "../../components/Modal";
import { PaymentForm } from '../dashboard/PaymentForm';
import { isPaid } from '../../helpers/base';
import { PaidDisplay } from '../../components/PaidDisplay';
import server from "../../helpers/config";
import { setMethod } from "../../helpers/setMethod";

const BuyLicenceBtn = props => (
  <button {...props} type="button" className="btn-standard gradient">
    <img src={licence} alt="icons licence"/>
    Wykup licencję
  </button>
);

const LicenceToOverlay = ({paidDate}) => paidDate && (
  <div className="btn-standard gradient center">
    <PaidDisplay paid={paidDate}/>
  </div>
)

export const DashboardPage = () => {
  const { history } = useContext(__RouterContext);
  const { user, getLogedUser } = useContext(ContextUser);

  const logout = async () => {
    localStorage.removeItem('token');
    getLogedUser();
    history.push('/');
  };

  useEffect(() => {
    getLogedUser();
  }, [history.location.key]);

  return (
    <div className="app-content">
      {user && !user.admin && (
        <div className="container p-4">
          <div className="row">
            <div className="col-12">
              {isPaid(user.admin, user.paid) ? (
                <LicenceToOverlay paidDate={user.paid}/>
              ) : (
                <Modal
                  BtnOwn={BuyLicenceBtn}
                  title="Kup licencję"
                >
                  <PaymentForm />
                </Modal>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="container">
        <div className="main-menu">
          <div className="d-flex">
            <div className="flex-fill m-2">
              <button disabled={user && !isPaid(user.admin, user.paid)} onClick={() => history.push('/medicines')} type="button" className="btn-images btn-disabled">
                <img src={med} alt="Lekarstwa" className="img-fluid"/>
              </button>
              <h4>LEKARSTWA</h4>
            </div>

            <div className="flex-fill m-2">
              <button disabled={user && !isPaid(user.admin, user.paid)} onClick={() => history.push('/patients')} type="button" className="btn-images btn-disabled">
                <img src={patient} alt="Pacjenci" className="img-fluid"/>
              </button>
              <h4>PACJENCI</h4>
            </div>
            {user && user.admin && (
              <div className="flex-fill m-2">
                <NavLink to='/doctors'>
                  <button type="button" className="btn-images">
                    <img src={client} alt="Klienci" className="img-fluid"/>
                  </button>
                </NavLink>
                <h4>KLIENCI</h4>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="d-flex justify-content-end">
          <DocButton
            onClick={logout}
            size="medium"
            name="Wyloguj się"
            variant="main"
          />
        </div>
      </div>
    </div>
  )
};
