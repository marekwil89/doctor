import moment from 'moment';

export const getUploadPath = imageName => imageName && `http://sarnetski.usermd.net/static/media/${imageName}`;

export const isAdmin = user => user && user.admin;

export const isPaid = (admin, paid) => {
  if (admin) {
    return true;
  }

  if (!moment(paid).isValid()) {
    return false;
  }

  if (!moment(paid).add(30, 'days').isAfter(moment())) {
    return false;
  }

  return true;
};
