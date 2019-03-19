import React, { useState } from 'react';
import { Formik } from 'formik';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button/Button';
import server from '../../helpers/config';
import { fileMethod } from '../../helpers/setMethod';
import { GroundErrors } from '../../components/GroundErrors';
import { DocButton } from '../../components/DocButton';
import { GroundSuccess } from '../../components/GroundSuccess';

const styles = () => ({
  input: {
    display: 'none',
  },
});

export const MedicineImage = withStyles(styles)
(({ method, id, classes }) => {
  const [response, setResponse] = useState(null);

  return (
    <Formik
      initialValues={{ image: null }}
      onSubmit={async (values) => {
        const data = new FormData();

        const imagesArr = values.image && Object.values(values.image);

        imagesArr && imagesArr.forEach(elem => {
          data.append('image', elem);
        });

        const responseData = await fetch(`${server.host}${server.port}/medicine/image/${id}`, fileMethod('PUT', data));

        try {
          const response = await responseData.json();

          await setResponse(response);
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
          <input
            className={classes.input}
            id="images-id"
            type="file"
            onChange={event => {
              setFieldValue('image', event.currentTarget.files);
            }}
          />
          <label className="my-3" htmlFor="images-id"><Button component="span">Kliknij aby dodać</Button></label>

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
});
