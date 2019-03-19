import React, { useContext, useEffect, useState } from 'react';
import * as jsPDF from 'jspdf';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { DocButton } from '../../components/DocButton';
import { ContextUser } from '../../contexts/ContextUserProvider';
import Divider from '@material-ui/core/Divider/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar/Avatar';
import { getUploadPath } from '../../helpers/base';
import server from '../../helpers/config';
import { setMethod } from '../../helpers/setMethod';

export const RecipeDetail = ({ name, medicines, patient }) => {
  const { user } = useContext(ContextUser);
  const [detail, setDetail] = useState({
    patient: patient && JSON.parse(patient),
    medicines: []
  });

  const getMedicinesDetails = async () => {
    const responseData = await fetch(`${server.host}${server.port}/medicine/byId`, setMethod('POST', {
      medicinesIds: JSON.parse(medicines),
    }));

    try {
      const response = await responseData.json();

      setDetail({
        ...detail,
        medicines: response
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getMedicinesDetails();
  }, []);

  const generatePDF = () => {
    const medicineListBegin = 50;

    const pdf = new jsPDF();

    pdf.text(name, 10, 10);

    pdf.text(`
      Dane: ${detail.patient.fullName}
      Adres: 
      Telefon:
      Doktor: ${user.fullName}
      Data waznosci recepty: 
    `, 10, 20);

    detail.medicines.forEach((elem, index) => pdf.text(
      `${index + 1} ${elem.name.replace(/\s/g, ' ').replace(/\s/g, ' ')} 
  Sposób uzycia:
  gramatura produktu:
--------------------------------------------------------------------------------------------------
      `, 10, medicineListBegin + ((index + 1) * 25)
    ));

    pdf.save(`recepta-${detail.patient.fullName}.pdf`);
  };

  return (
    <>
      <p className="my-2">{name}</p>
      <List component="nav">
        {detail.medicines.map((elem, index) => (
          <ListItem key={index} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                src={getUploadPath(elem.image)}
              />
            </ListItemAvatar>
            <ListItemText
              primary={elem.name}
              secondary={`${elem.price}PLN`}
            />
          </ListItem>
        ))}
      </List>


      <Divider/>
      <p className="my-3">Dla {detail.patient.fullName}</p>

      <DocButton
        onClick={generatePDF}
        size="small"
        name="Stwórz PDF"
        variant="secondary"
      />
    </>
  );
};
