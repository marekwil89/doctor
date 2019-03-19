import Sequelize from 'sequelize';
import connection from '../config/db';

const Medicine = connection.define('Medicine', {
  name: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.INTEGER,
  },
  image: {
    type: Sequelize.STRING,
  },
  qty: {
    type: Sequelize.INTEGER,
  },
  disabled: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

export default Medicine;
