import React, { useState } from 'react';
import { Formik } from 'formik';
import server from '../../helpers/config';
import { setMethod } from '../../helpers/setMethod';
import TextField from '@material-ui/core/TextField/TextField';
import { GroundErrors } from '../../components/GroundErrors';
import { GroundSuccess } from '../../components/GroundSuccess';
import { DocButton } from '../../components/DocButton';


export const PatientForm = ({ fullName, lastVisit, method, id }) => {
  const [response, setResponse] = useState(null);

  return (
    <Formik
      initialValues={{ fullName, lastVisit }}
      onSubmit={async (values) => {
        const responseData = await fetch(`${server.host}${server.port}/doctor/patient`, setMethod(method || 'POST', {
          ...values,
          id
        }));

        try {
          const response = await responseData.json();

          setResponse(response);
        } catch (e) {
          console.log(e);
        }
      }}
    >
      {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit
        }) => (
        <form onSubmit={handleSubmit}>
          <TextField
            label="Imię i nazwisko"
            fullWidth
            name="fullName"
            type="text"
            onChange={handleChange}
            value={values.fullName || ''}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            variant="filled"
          />

          <TextField
            label="Ostatnia wizyta"
            fullWidth
            name="lastVisit"
            onChange={handleChange}
            type="date"
            value={values.lastVisit || ''}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            variant="filled"
          />

          <div className="my-3">
            {response && response.status && <GroundSuccess primary="Sukces" secondary="Operacja zakończona sukcesem"/>}
            {response && response.errors && <GroundErrors errors={response.errors}/>}
          </div>

          <DocButton
            size="medium"
            type="submit"
            name="Akceptuj"
            variant="secondary"
          />
        </form>
      )}
    </Formik>
  );
};
