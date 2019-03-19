import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import server from '../../helpers/config';
import { setMethod } from '../../helpers/setMethod';
import { ContextError } from '../../contexts/ContextErrorProvider';
import { ContextRefresh } from '../../contexts/ContextRefreshProvider';
import { DocButton } from '../../components/DocButton';
import { PaidDisplay } from '../../components/PaidDisplay';
import { isPaid } from '../../helpers/base';
import { MedicinePanel } from '../medicine/MedicinePanel';

export const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const { refresh, setRefresh } = useContext(ContextRefresh);
  const { setError } = useContext(ContextError);

  const getDoctors = async () => {
    const doctorsData = await fetch(`${server.host}${server.port}/admin/doctor`, setMethod('GET'));

    try {
      const doctors = await doctorsData.json();

      if (doctors.errors) return setError(doctors.errors);

      setDoctors(doctors);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async id => {
    await fetch(`${server.host}${server.port}/admin/doctor/${id}`, setMethod('DELETE'));

    setRefresh(!refresh);
  };

  const deleteLicence = async id => {
    await fetch(`${server.host}${server.port}/admin/doctor/${id}`, setMethod('PUT'));

    setRefresh(!refresh);
  };

  useEffect(() => {
    getDoctors();
  }, [refresh]);

  return (

    <div className="container">
      <div className="list-client">
        <div className="row">
          {doctors.length ? doctors.map((elem, index) => (
            <div key={index} className="col-12">
              <div className="list-box">
                <div className="list-box-content">
                  <h2>{elem.fullName}</h2>
                  <div className="date-licence">
                    <PaidDisplay paid={elem.paid}/>
                  </div>
                </div>
                <div className="list-box-footer">
                  <DocButton
                    onClick={() => deleteLicence(elem.id)}
                    disabled={!isPaid(false, elem.paid)}
                    size="medium"
                    name="Usuń licencję"
                    variant="transparent"
                  />
                  <div className="list-box-action ml-auto">
                    <DocButton
                      onClick={() => handleDelete(elem.id)}
                      size="medium"
                      name="Usuń konto"
                      variant="error"
                    />
                  </div>
                </div>
              </div>
            </div>
          )) : (
            <div className="alert alert-danger new p-4 w-100">
              <strong>Brak Doktorów</strong>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
