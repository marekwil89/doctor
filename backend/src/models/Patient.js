import Sequelize from 'sequelize';
import connection from '../config/db';
import Recipe from './Recipe';
import Operation from './Operation';

const Patient = connection.define('Patient', {
  userId: {
    type: Sequelize.INTEGER,
  },
  fullName: {
    type: Sequelize.STRING,
  },
  lastVisit: {
    type: Sequelize.STRING,
  },
});

Patient.hasMany(Recipe, { foreignKey: 'patientId' });
Patient.hasMany(Operation, { foreignKey: 'patientId' });

export default Patient;
