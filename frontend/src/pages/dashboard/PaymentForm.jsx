import React, { useState } from 'react';
import { Formik } from 'formik';
import { withStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card/Card";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import CardContent from "@material-ui/core/CardContent/CardContent";
import CardActions from "@material-ui/core/CardActions/CardActions";
import server from '../../helpers/config';
import { setMethod } from '../../helpers/setMethod';
import { DocButton } from "../../components/DocButton";

const styles = () => ({
  card: {
    boxShadow: 'none',
  },
});

export const PaymentForm = withStyles(styles)
(({ classes }) => (
  <Formik
    initialValues={{}}
    onSubmit={async (values) => {
      const responseData = await fetch(`${server.host}${server.port}/payment/send`, setMethod('POST', {
        ...values
      }));

      try {
        const response = await responseData.json();

        response.url && window.location.replace(response.url);
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

        <Card className={classes.card}>
          <CardHeader
            title="0,01PLN"
            subheader="Wynosi opłata za 30 dniowy dostęp do serwisu"
          />
          <CardContent>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet expedita illo magni ratione!
              Consequuntur culpa debitis dolores iste! Architecto, ratione.</p>
          </CardContent>
          <CardActions>
            <DocButton
              size="medium"
              type="submit"
              name="Akceptuj"
              variant="secondary"
            />
          </CardActions>
        </Card>
        {/*<div className="my-3">*/}
        {/*{response && response.status && <GroundSuccess primary="Sukces" secondary="Operacja zakończona sukcesem"/>}*/}
        {/*{response && response.errors && <GroundErrors errors={response.errors}/>}*/}
        {/*</div>*/}
      </form>
    )}
  </Formik>
));
