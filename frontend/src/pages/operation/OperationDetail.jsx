import React, { useContext } from 'react';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import { ContextUser } from '../../contexts/ContextUserProvider';
import { getUploadPath } from '../../helpers/base';

const styles = () => ({
  card: {
    boxShadow: 'none',
  },
  img: {
    width: '100%'
  }
});

export const OperationDetail = withStyles(styles)
(({ patient, name, description, image, date, classes }) => {
  const { user } = useContext(ContextUser);
  const parsedPatient = patient && JSON.parse(patient);

  return (
    <Card className={classes.card}>
      <CardHeader
        title="Data"
        subheader={date}
      />

      <CardContent>
        <h5>Opis</h5>
        <p>{description}</p>
        <List>
          <ListItem>
            <ListItemText primary={name} secondary="operacja"/>
          </ListItem>
          <Divider/>
          <ListItem>
            <ListItemText primary={user.fullName} secondary="doktor"/>
          </ListItem>
          <Divider/>
          <ListItem>
            <ListItemText primary={parsedPatient.fullName} secondary="pacjent"/>
          </ListItem>
        </List>
        {image && (
          <>
            <h5 className="mt-3">Zdjęcie</h5>
            <img className={classes.img} src={getUploadPath(image)} alt="Zdjęcie operacji"/>
          </>
        )}
      </CardContent>
    </Card>
  );
});
