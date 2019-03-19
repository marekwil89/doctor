import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import connection from './config/db';
import authController from './controllers/authController';
import medicineController from './controllers/medicineController';
import recipeDoctorController from './controllers/doctor/recipeController';
import recipeAdminController from './controllers/admin/recipeController';
import patientDoctorController from './controllers/doctor/patientController';
import operationDoctorController from './controllers/doctor/operationController';
import operationAdminController from './controllers/admin/operationController';
import doctorAdminController from './controllers/admin/doctorController';
import patientAdminController from './controllers/admin/patientController';
import paymentController from './controllers/paymentController';

import cors from 'cors';
import './config/passport';

connection.sync();

const app = express();

// app.get('/', (req, res) => res.send('default route'));

app.use(express.static('../frontend/build'));
// app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

// app.use(cors({
// 	origin: ['http://localhost:3001', 'http://localhost:3002', 'http://localhost:3000'],
// 	methods: ['GET', 'POST', 'PUT', 'DELETE'],
// 	credentials: true
// }));

app.use(cors());
app.options('*', cors());

app.use('/auth', authController);
app.use('/medicine', medicineController);
app.use('/doctor/recipe', recipeDoctorController);
app.use('/doctor/patient', patientDoctorController);
app.use('/doctor/operation', operationDoctorController);
app.use('/admin/operation', operationAdminController);
app.use('/admin/recipe', recipeAdminController);
app.use('/admin/doctor', doctorAdminController);
app.use('/admin/patient', patientAdminController);
app.use('/payment', paymentController);

app.listen(4500, () => console.log('app is running on port 4500'));
