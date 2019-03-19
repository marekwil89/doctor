import Sequelize from 'sequelize';
import connection from '../config/db';

const Operation = connection.define('Operation', {
  name: {
    type: Sequelize.STRING,
  },
  patientId: {
    type: Sequelize.INTEGER,
  },
  doctorId: {
    type: Sequelize.INTEGER,
  },
  patient: {
    type: Sequelize.STRING(1234),
  },
  description: {
    type: Sequelize.STRING,
  },
  image: {
    type: Sequelize.STRING,
  },
  date: {
    type: Sequelize.STRING,
  }
});

export default Operation;
