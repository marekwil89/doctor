import Sequelize, { Op } from 'sequelize';

const connection = new Sequelize('XXXXXXXXXXX', 'XXXXXXXXXXXX', 'XXXXXXXXXXXX', {
  host: 'XXXXXXXXXXX',
  dialect: 'mysql',
  logging: false,
  freezeTableName: true,
  operatorsAliases: {
    $and: Op.and,
    $or: Op.or,
    $eq: Op.eq,
    $gt: Op.gt,
    $lt: Op.lt,
    $lte: Op.lte,
    $like: Op.like
  }
});

export default connection;
