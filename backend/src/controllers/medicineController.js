import express from 'express';
import fs from 'fs';
import path from 'path';
import { validationResult } from 'express-validator/check';
import multer from 'multer';
import Medicine from '../models/Medicine';
import MedicineValidator from '../validators/medicineValidator';
import { isLoged, isDoctor, isAdmin } from '../validators/authValidator';
import { uploadPath } from '../helpers/uploadPath';

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) => cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
});

const upload = multer({ storage });

const router = express.Router();

router.put('/image/:id', isLoged, isAdmin, upload.array('image', 1), async (req, res) => {
  if (req.files.length === 0) return res.send({
    errors: [{
      msg: 'Wybierz conajmniej jeden obrazek',
      param: 'image'
    }]
  });

  const { id } = req.params;

  const medicine = await Medicine.findByPk(id);
  if (!medicine) return res.send({ errors: [{ msg: 'Produkt o takim id nie istnieje w bazie', param: 'image' }] });

  const pathname = uploadPath;

  const filePath = `${pathname}${medicine.image}`;

  if (await fs.existsSync(filePath)) {
    await fs.unlinkSync(filePath);
  }

  await Medicine.update({
    ...medicine,
    image: req.files[0].filename
  }, { where: { id } });

  return res.send({ status: true });
});

router.post('/', isLoged, isAdmin, MedicineValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.json({ errors: errors.array() });

  const { name, price, description, qty } = req.body;

  const medicineExist = await Medicine.findOne({ where: { name } });

  if (medicineExist) {
    const { id } = medicineExist;

    await Medicine.update({
      disabled: false,
      name,
      price,
      description,
      qty
    }, { where: { id } });

    return res.send({ status: true });
  }

  await Medicine.create({
    name,
    price,
    description,
    qty
  });

  return res.send({ status: true });
});

router.put('/', isLoged, isAdmin, MedicineValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.json({ errors: errors.array() });

  const { id, name, price, description, qty } = req.body;

  const idExist = await Medicine.findByPk(id);
  if (!idExist) return res.send({ errors: [{ msg: 'Produkt o takim id nie istnieje w bazie', param: 'name' }] });

  const productExist = await Medicine.find({ where: { name } });
  if (productExist && productExist.id !== id) return res.send({
    errors: [{
      msg: 'Produkt o takiej samej nazwie już istnieje',
      param: 'name'
    }]
  });

  await Medicine.update({
    name,
    price,
    description,
    qty
  }, { where: { id } });

  return res.send({ status: true });
});

router.get('/', isLoged, async (req, res) => {
  const queries = req.query;

  const medicines = await Medicine.findAll({
    where: {
      ...queries.medicineName && { name: { $like: `%${queries.medicineName}%` } },
      disabled: false
    }
  });

  return res.send(medicines);
});

router.get('/:id', isLoged, async (req, res) => {
  const { id } = req.params;

  const medicine = await Medicine.findOne({
    where: {
      id,
      disabled: false
    }
  });

  return res.send(medicine);
});

router.delete('/:id', isLoged, async (req, res) => {
  const { id } = req.params;

  await Medicine.update({
    disabled: true
  }, { where: { id } });

  return res.send({ status: true });
});

router.post('/byId', isLoged, isDoctor, async (req, res) => {
  const { medicinesIds } = req.body;

  const medicines = await Medicine.findAll({
    where: {
      id: medicinesIds
    }
  });

  res.send(medicines);
});

export default router;
