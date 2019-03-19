import Sequelize from 'sequelize';
import connection from '../config/db';
import Patient from './Patient';

const User = connection.define('User', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  login: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  fullName: {
    type: Sequelize.STRING,
  },
  admin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  paid: {
    type: Sequelize.STRING,
  }
});

User.hasMany(Patient, { foreignKey: 'userId' });

export default User;
