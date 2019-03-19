import React, { useContext, useState } from 'react';
import { Formik } from 'formik';
import TextField from '@material-ui/core/TextField';
import server from '../../helpers/config';
import { setMethod } from '../../helpers/setMethod';
import moment from 'moment';
import { __RouterContext } from 'react-router';
import { GroundErrors } from '../../components/GroundErrors';
import { DocButton } from '../../components/DocButton';
import { GroundSuccess } from '../../components/GroundSuccess';

export const OperationForm = () => {
  const { history } = useContext(__RouterContext);
  const [response, setResponse] = useState(null);

  return (
    <Formik
      initialValues={{ name: '', description: '', date: moment().format() }}
      onSubmit={async (values) => {

        const pathname = history.location.pathname;
        const patientId = pathname.substr(pathname.length - 1);


        const responseData = await fetch(`${server.host}${server.port}/doctor/operation`, setMethod('POST', {
          ...values,
          patientId
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
        <form
          onSubmit={handleSubmit}>

          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            variant="filled"
            label="Nazwa zabiegu"
            type="text"
            name="name"
            fullWidth
            onChange={handleChange}
            value={values.name}
          />

          <TextField
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            variant="filled"
            label="Opis zabiegu"
            type="text"
            name="description"
            onChange={handleChange}
            value={values.description}
          />

          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            variant="filled"
            label="Data zabiegu"
            name="date"
            fullWidth
            onChange={handleChange}
            type="date"
            defaultValue={moment().format()}
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
