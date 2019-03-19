import React, { useState, useEffect, useContext } from 'react';
import { __RouterContext } from 'react-router-dom';
import server from '../../helpers/config';
import { setMethod } from '../../helpers/setMethod';
import { ContextRefresh } from '../../contexts/ContextRefreshProvider';
import { ContextError } from '../../contexts/ContextErrorProvider';
import recipe from '../../assets/icons/recept.png';
import { Modal } from '../../components/Modal';
import { OperationImage } from './OperationImage';
import { OperationDetail } from './OperationDetail';
import { ContextUser } from '../../contexts/ContextUserProvider';
import { Permission } from '../../components/Permission';


export const OperationsList = () => {
  const [operations, setOperations] = useState([]);
  const { refresh } = useContext(ContextRefresh);
  const { setError } = useContext(ContextError);
  const { history } = useContext(__RouterContext);
  const { user } = useContext(ContextUser);

  const getOperations = async () => {
    const pathname = history.location.pathname;
    const patientId = pathname.substr(pathname.length - 1);
    const userType = await user && user.admin === true ? 'admin' : 'doctor';
    const operationsData = await fetch(`${server.host}${server.port}/${userType}/operation/${patientId}`, setMethod('GET'));

    try {
      const operations = await operationsData.json();

      if (operations.errors) return setError(operations.errors);

      setOperations(operations);

    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getOperations();
  }, [refresh]);

  return (
    <div className="list-recipe">
      <div className="col-md-12">
        {operations && operations.length ? operations.map((elem, index) => (
          <div key={index} className="recipe-box">
            <div className="recipe-name mr-auto">
              <span><img src={recipe}/>{elem.name}</span>
            </div>
            <Permission required="doctor">
              <Modal btnName="ZMIEŃ OBRAZ" btnVariant="transparent" btnSize="small" title="ZMIEŃ OBRAZ">
                <OperationImage {...elem} method="PUT"/>
              </Modal>

              <Modal btnName="POKAŻ" btnVariant="transparent" btnSize="small" title="Szczegóły Operacji">
                <OperationDetail {...elem}/>
              </Modal>
            </Permission>
          </div>
        )) : (
          <div className="alert alert-danger new p-4 w-100">
            <strong>Brak zabiegów</strong>
          </div>
        )}
      </div>
    </div>
  );
};
