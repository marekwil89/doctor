import React, { useContext, useState } from 'react';
import { Formik } from 'formik';
import server from '../../../helpers/config';
import { setMethod } from '../../../helpers/setMethod';
import { ContextError } from '../../../contexts/ContextErrorProvider';
import { ContextUser } from '../../../contexts/ContextUserProvider';
import { DocButton } from '../../../components/DocButton';
import { GroundErrors } from '../../../components/GroundErrors';
import { __RouterContext } from 'react-router';

export const LoginForm = () => {
  const [response, setResponse] = useState(null);
  const { setError } = useContext(ContextError);
  const { getLogedUser } = useContext(ContextUser);
  const { history } = useContext(__RouterContext);

  return (
    <Formik
      initialValues={{ login: '', password: '' }}
      onSubmit={async (values) => {
        const responseData = await fetch(`${server.host}${server.port}/auth/login`, setMethod('POST', values));

        try {
          const response = await responseData.json();

          if (response.status) {
            await localStorage.setItem('token', response.token);
            await getLogedUser();
            await history.push('/dashboard');
            await setError();
          }

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
              {response && response.errors && <GroundErrors errors={response.errors}/>}
              <DocButton
                fullWidth
                type="submit"
                size="large"
                name="Zaloguj"
                variant="secondary"
              />
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};
