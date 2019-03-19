import React, { useState, useContext } from 'react';
import Menu from '@material-ui/core/Menu';
import server from '../../helpers/config';
import { ContextRefresh } from '../../contexts/ContextRefreshProvider';
import { setMethod } from '../../helpers/setMethod';
import { DocButton } from '../../components/DocButton';
import { Permission } from '../../components/Permission';
import { Modal } from '../../components/Modal';
import { MedicineForm } from './MedicineForm';
import { MedicineImage } from './MedicineImage';
import { getUploadPath } from '../../helpers/base';

export const MedicinePanel = elem => {
  const { refresh, setRefresh } = useContext(ContextRefresh);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDelete = async id => {
    await fetch(`${server.host}${server.port}/medicine/${id}`, setMethod('DELETE'));

    setRefresh(!refresh);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <div className="col-12">
      <div className="list-box">
        <div className="list-box-med">
          <div className="product-img p-3">
            <img className="w-100" src={getUploadPath(elem.image)} alt=""/>
          </div>
          <h2>{elem.name}</h2>
          <span>Cena: <b>{elem.price}PLN</b></span>
        </div>
        <div className="list-box-footer">
          <div className="date-licence">
            <span className="resources-qty">Stan magazynowy: <b>{elem.qty}</b></span>
          </div>
          <div className="list-box-action ml-auto">

            <Permission required="admin">
              <DocButton
                onClick={e => setAnchorEl(e.currentTarget)}
                aria-owns={anchorEl ? 'simple-menu2' : undefined}
                aria-haspopup="true"
                size="medium"
                name="Rozwiń"
                variant="main"
              />
              <Menu id="simple-menu2" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <Modal btnName="Edytuj lek" btnVariant="menu" btnSize="small" title="Edycja leku">
                  <MedicineForm {...elem} method="PUT"/>
                </Modal>

                <Modal btnName="Zmień obrazek" btnVariant="menu" btnSize="small" title="Zmiana obrazka">
                  <MedicineImage {...elem} method="PUT"/>
                </Modal>

                <DocButton
                  onClick={() => handleDelete(elem.id)}
                  size="small"
                  name="Usuń lek"
                  variant="menu"
                />
              </Menu>
            </Permission>
          </div>
        </div>
      </div>
    </div>

  );
};





