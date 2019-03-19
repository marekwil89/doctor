import React, { useState } from 'react';
import { Formik } from 'formik';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import server from '../../helpers/config';
import { setMethod } from '../../helpers/setMethod';
import { GroundErrors } from '../../components/GroundErrors';
import { DocButton } from '../../components/DocButton';
import { GroundSuccess } from '../../components/GroundSuccess';

export const MedicineForm = ({ name, description, price, qty, method, id }) => {
  const [response, setResponse] = useState(null);

  return (
    <Formik
      initialValues={{ name, description, price, qty }}
      onSubmit={async (values) => {

        const responseData = await fetch(`${server.host}${server.port}/medicine`, setMethod(method, {
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
          setFieldValue,
          handleBlur,
          handleSubmit
        }) => (
        <form onSubmit={handleSubmit}>

          <TextField
            label="Nazwa leku"
            name="name"
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            variant="filled"
            type="text"
            fullWidth
            onChange={handleChange}
            value={values.name || ''}
          />

          <TextField
            label="Opis leku"
            name="description"
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            variant="filled"
            fullWidth
            onChange={handleChange}
            value={values.description || ''}
          />
          <TextField
            label="cena"
            name="price"
            type="number"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            variant="filled"
            onChange={handleChange}
            value={values.price || ''}
            InputProps={{
              endAdornment: (
                <InputAdornment variant="filled" position="end">
                  PLN
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="na magazynie"
            name="qty"
            type="number"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            variant="filled"
            onChange={handleChange}
            value={values.qty || ''}
            InputProps={{
              endAdornment: (
                <InputAdornment variant="filled" position="end">
                  SZTUK
                </InputAdornment>
              ),
            }}
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
