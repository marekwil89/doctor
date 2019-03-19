import React, { useState, useContext } from 'react';
import { __RouterContext } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import server from '../../helpers/config';
import { ContextRefresh } from '../../contexts/ContextRefreshProvider';
import { setMethod } from '../../helpers/setMethod';
import { DocButton } from '../../components/DocButton';
import { Permission } from '../../components/Permission';
import { Modal } from '../../components/Modal';
import { PatientForm } from './PatientForm';

export const PatientPanel = (elem) => {
  const { refresh, setRefresh } = useContext(ContextRefresh);
  const { history } = useContext(__RouterContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDelete = async id => {
    await fetch(`${server.host}${server.port}/doctor/patient/${id}`, setMethod('DELETE'));

    setRefresh(!refresh);
  };

  function handleClose () {
    setAnchorEl(null);
  }

  return (
    <div className="col-md-12">
      <div className="patient-box">
        <div className="patient-info mr-auto">
          <h4>{elem.fullName}</h4>
          <span className="visit">Ostatnia wizyta: <b>{elem.lastVisit}</b></span>
        </div>

        <div className="patient-action">

          <DocButton
            onClick={e => setAnchorEl(e.currentTarget)}
            aria-owns={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
            size="medium"
            name="Rozwiń"
            variant="main"
          />

          <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <DocButton
              onClick={() => history.push(`/patient/${elem.id}`)}
              size="medium"
              name="Pokaż"
              variant="menu"
            />
            <Permission required="doctor">
              <Modal btnName="Edytuj" btnVariant="menu" btnSize="medium" title="ZMIEŃ OBRAZ">
                <PatientForm {...elem} method="PUT"/>
              </Modal>
              <DocButton
                onClick={() => handleDelete(elem.id)}
                size="medium"
                name="Usuń"
                variant="menu"
              />
            </Permission>
          </Menu>
        </div>
      </div>
    </div>
  );
};
