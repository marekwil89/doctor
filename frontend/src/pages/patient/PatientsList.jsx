import React, { useState, useEffect, useContext } from 'react';
import server from '../../helpers/config';
import { setMethod } from '../../helpers/setMethod';
import { ContextError } from '../../contexts/ContextErrorProvider';
import { ContextRefresh } from '../../contexts/ContextRefreshProvider';
import { ContextFilters } from '../../contexts/ContextFiltersProvider';
import { ContextUser } from '../../contexts/ContextUserProvider';
import { GroundErrors } from '../../components/GroundErrors';
import { PatientPanel } from './PatientPanel';

export const PatientsList = () => {
  const [patients, setPatients] = useState([]);
  const { refresh } = useContext(ContextRefresh);
  const { filters } = useContext(ContextFilters);
  const { setError } = useContext(ContextError);
  const { user } = useContext(ContextUser);

  const getPatients = async () => {
    const { fullName, lastVisit } = filters;
    const userType = await user && user.admin === true ? 'admin' : 'doctor';

    const patientsData = await fetch(`${server.host}${server.port}/${userType}/patient?fullName=${fullName}&lastVisit=${lastVisit}`, setMethod('GET'));

    try {
      const patients = await patientsData.json();

      if (patients.errors) return setError(patients.errors);

      setPatients(patients);

    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getPatients();
  }, [refresh]);


  return (
    <div className="container">
      <div className="wrapper">
        <div className="row">
          {patients.length ? patients.map((elem, index) => (
            <PatientPanel key={index} {...elem} />
          )) : (
            <GroundErrors custom="Brak Pacjentów"/>
          )}
        </div>
      </div>
    </div>
  );
};
