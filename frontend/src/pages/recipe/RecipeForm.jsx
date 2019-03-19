import React, { useContext, useEffect, useState } from 'react';
import { Formik, FieldArray } from 'formik';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import server from '../../helpers/config';
import { setMethod } from '../../helpers/setMethod';
import { ContextRefresh } from '../../contexts/ContextRefreshProvider';
import { __RouterContext } from 'react-router';
import TextField from '@material-ui/core/TextField/TextField';
import { GroundErrors } from '../../components/GroundErrors';
import { DocButton } from '../../components/DocButton';
import { GroundSuccess } from '../../components/GroundSuccess';
import { getUploadPath } from '../../helpers/base';

const styles = () => ({
  list: {
    height: 300,
    overflowY: 'auto'
  },
});

export const RecipeForm = withStyles(styles)
(({ classes }) => {
  const { history } = useContext(__RouterContext);
  const { refresh } = useContext(ContextRefresh);
  const [response, setResponse] = useState(null);
  const [search, setSearch] = useState('');
  const [medicinesJson, setMedicines] = useState([]);

  const getMedicines = async () => {
    const medicinesData = await fetch(`${server.host}${server.port}/medicine`, setMethod('GET'));

    try {
      const medicinesJson = await medicinesData.json();

      setMedicines(medicinesJson);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getMedicines();
  }, [refresh]);

  return (
    <Formik
      initialValues={{ name: '', medicines: [] }}
      onSubmit={async (values) => {
        const pathname = history.location.pathname;
        const patientId = pathname.substr(pathname.length - 1);

        const responseData = await fetch(`${server.host}${server.port}/doctor/recipe`, setMethod('POST', {
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
          handleBlur,
          handleSubmit
        }) => (
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nazwa recepty"
            fullWidth
            type="text"
            name="name"
            onChange={handleChange}
            value={values.name}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            variant="filled"
          />
          <TextField
            label="Wyszukaj lek"
            fullWidth
            type="text"
            onChange={e => setSearch(e.target.value)}
            value={search}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            variant="filled"
          />

          <List className={classes.list}>
            <FieldArray
              name="medicines"
              render={arrayHelpers => {
                return medicinesJson
                  .filter(elem => elem.name.includes(search))
                  .map((elem) => (
                      <ListItem
                        onClick={() => {
                          const foundIndex = values.medicines.map((item) => {
                            return item.id;
                          }).indexOf(elem.id);

                          if (foundIndex === -1) {
                            return arrayHelpers.push(elem);
                          }
                          return arrayHelpers.remove(foundIndex);
                        }}
                        key={elem.id} role={undefined} dense button
                      >
                        <ListItemAvatar>
                          <Avatar
                            src={getUploadPath(elem.image)}
                          />
                        </ListItemAvatar>
                        <ListItemText primary={`${elem.name}`}/>
                        <ListItemSecondaryAction>
                          <Checkbox
                            checked={arrayHelpers && arrayHelpers.form.values.medicines.some(item => item.id === elem.id)}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    )
                  );
              }}
            />
          </List>

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
