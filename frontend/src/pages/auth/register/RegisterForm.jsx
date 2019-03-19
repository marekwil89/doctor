import React, { useContext, useState } from 'react';
import { Formik } from 'formik';
import server from '../../../helpers/config';
import { setMethod } from '../../../helpers/setMethod';
import { DocButton } from "../../../components/DocButton";
import { GroundErrors } from "../../../components/GroundErrors";
import { GroundSuccess } from "../../../components/GroundSuccess";
import { __RouterContext } from "react-router";

export const RegisterForm = () => {
  const [response, setResponse] = useState(null);
  const { history } = useContext(__RouterContext);

  return (
    <Formik
      initialValues={{ login: '', password: '', fullName: '' }}
      onSubmit={async (values) => {
        const responseData = await fetch(`${server.host}${server.port}/auth/register`, setMethod('POST', values));

        try {
          const response = await responseData.json();

          setResponse(response);
        } catch(e) {
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
          <div className="row">
            <div className="col-md-12" id="content-login">

              <div className="input-login">
                <input
                  className="radial-input box-shadow"
                  type="text"
                  name="login"
                  placeholder="Login"
                  onChange={handleChange}
                  value={values.login}
                />
              </div>
              <div className="input-password">
                <input
                  className="radial-input"
                  type="password"
                  name="password"
                  placeholder="Hasło"
                  onChange={handleChange}
                  value={values.password}
                />
              </div>
              <div className="input-login">
                <input
                  className="radial-input"
                  type="text"
                  name="fullName"
                  placeholder="Imię i nazwisko"
                  onChange={handleChange}
                  value={values.fullName}
                />
              </div>

              {response && response.status && <GroundSuccess actionClick={() => history.push('/')} actionText="zalogować" primary="Sukces" secondary="Możesz teraz się "/>}
              {response && response.errors && <GroundErrors errors={response.errors}/>}

              <DocButton
                fullWidth
                type="submit"
                size="large"
                name="Zarejestruj"
                variant="main"
              />
            </div>
          </div>
        </form>
      )}
    </Formik>
  )
};
