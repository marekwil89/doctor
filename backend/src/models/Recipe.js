import Sequelize from 'sequelize';
import connection from '../config/db';

const Recipe = connection.define('Recipe', {
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
  doctor: {
    type: Sequelize.STRING(1234),
  },
  medicines: {
    type: Sequelize.STRING(1234),
  }
});

export default Recipe;
