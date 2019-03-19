import express from 'express';
import fs from 'fs';
import { validationResult } from 'express-validator/check';
import Operation from '../../models/Operation';
import Patient from '../../models/Patient';
import path from 'path';
import multer from 'multer';
import operationValidator from '../../validators/operationValidator';
import { getLogedUser } from '../../helpers/getLogedUser';
import { isDoctor, isLoged } from '../../validators/authValidator';
import { isPaid } from '../../validators/paymentValidator';
import { uploadPath } from '../../helpers/uploadPath';

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) => cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
});

const upload = multer({ storage });

const router = express.Router();

router.put('/image/:id', isLoged, isDoctor, isPaid, upload.array('image', 4), async (req, res) => {
  if (req.files.length === 0) return res.send({
    errors: [{
      msg: 'Wybierz conajmniej jeden obrazek',
      param: 'image'
    }]
  });

  const { id } = req.params;

  const operation = await Operation.findByPk(id);
  if (!operation) return res.send({ errors: [{ msg: 'Zabieg o takim id nie istnieje w bazie', param: 'name' }] });

  const pathname = uploadPath;

  const filePath = `${pathname}${operation.image}`;

  if (await fs.existsSync(filePath)) {
    await fs.unlinkSync(filePath);
  }

  const updated = await Operation.update({
    ...operation,
    image: req.files[0].filename
  }, { where: { id } });

  return res.send({ status: true });
});

router.post('/', isLoged, isDoctor, isPaid, operationValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.json({ errors: errors.array() });

  const { name, description, date, patientId } = req.body;

  const doctor = await getLogedUser(req.headers);

  const patient = await Patient.findOne({
    where: { id: patientId }
  });

  if (!patient) return res.send({ errors: [{ msg: 'Nie znaleziono pacjenta', param: 'name' }] });

  const newOperation = await Operation.create({
    name,
    description,
    date,
    doctorId: doctor.id,
    patientId: patient.id,
    patient: JSON.stringify(patient)
  });

  return res.send({ status: true });
});

router.get('/:patientId', isLoged, isDoctor, isPaid, async (req, res) => {
  const { patientId } = req.params;
  const { id } = await getLogedUser(req.headers);

  const operations = await Operation.findAll({
    where: {
      patientId,
      doctorId: id
    }
  });

  res.send(operations);
});

export default router;
