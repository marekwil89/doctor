import React, { useState, useEffect, useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import server from '../../helpers/config';
import { setMethod } from '../../helpers/setMethod';
import { ContextError } from '../../contexts/ContextErrorProvider';
import { ContextRefresh } from '../../contexts/ContextRefreshProvider';
import { MedicinePanel } from './MedicinePanel';
import { ContextFilters } from '../../contexts/ContextFiltersProvider';

export const MedicinesList = withStyles()
(() => {
  const [medicines, setMedicines] = useState([]);
  const { refresh } = useContext(ContextRefresh);
  const { setError } = useContext(ContextError);
  const { filters } = useContext(ContextFilters);

  const getMedicines = async () => {
    const { medicineName } = filters;
    const medicinesData = await fetch(`${server.host}${server.port}/medicine?medicineName=${medicineName}`, setMethod('GET'));

    try {
      const medicines = await medicinesData.json();

      if (medicines.errors) return setError(medicines.errors);

      setMedicines(medicines);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getMedicines();
  }, [refresh]);

  return (
    <div className="container">
      <div className="list-client">
        <div className="row">
          {medicines.length ? medicines.map((elem, index) => (
            <MedicinePanel key={index} {...elem} />
          )) : (
            <div className="alert alert-danger new p-4 w-100">
              <strong>Brak lekarstw</strong>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
