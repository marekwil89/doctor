import React from 'react';
import moment from 'moment';

export const PaidDisplay = ({ paid }) => {
  if (!moment(paid).isValid()) {
    return <p>Brak licencji</p>;
  }

  const licenceEndDay = moment(paid).add(30, 'days');

  if (licenceEndDay.isBefore(moment())) {
    return <p>Brak licencji</p>;
  }

  const licenceDay = licenceEndDay.diff(moment(), 'days');

  return <p>Pozostały {licenceDay} dni licencji</p>;
};
