import React, { useState, useEffect, useContext } from 'react';
import { __RouterContext } from 'react-router-dom';
import server from '../../helpers/config';
import { ContextRefresh } from '../../contexts/ContextRefreshProvider';
import { setMethod } from '../../helpers/setMethod';
import { ContextUser } from '../../contexts/ContextUserProvider';

export const PatientDetail = () => {
  const { history } = useContext(__RouterContext);
  const { refresh } = useContext(ContextRefresh);
  const { user } = useContext(ContextUser);
  const [patient, setPatient] = useState({});

  const getPatient = async () => {
    const pathname = history.location.pathname;
    const patientId = pathname.substr(pathname.length - 1);
    const userType = await user && user.admin === true ? 'admin' : 'doctor';

    const patientData = await fetch(`${server.host}${server.port}/${userType}/patient/${patientId}`, setMethod('GET'));

    try {
      const patient = await patientData.json();

      setPatient(patient);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getPatient();
  }, [refresh]);

  return patient ? (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="name-profile">
            <h4>{patient.fullName}</h4>
            <span>Ostatnia wizyta: <b>{patient.lastVisit}</b></span>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
