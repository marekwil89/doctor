import express from 'express';
import Patient from '../../models/Patient';
import { isLoged, isAdmin, isDoctor } from '../../validators/authValidator';
import patientValidator from '../../validators/patientValidator';
import { validationResult } from 'express-validator/check';

const router = express.Router();

router.put('/', isLoged, isAdmin, patientValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.json({ errors: errors.array() });

  const { id, fullName } = req.body;

  const idExist = await Patient.findByPk(id);
  if (!idExist) return res.send({ errors: [{ msg: 'Pacjent o takim id nie istnieje w bazie', param: 'fullName' }] });

  const updated = await Patient.update({
    fullName,
  }, { where: { id } });


  return res.send({ status: true });
});

router.get('/', isLoged, isAdmin, async (req, res) => {
  const queries = req.query;

  const patients = await Patient.findAll({
    where: {
      ...queries.fullName && { fullName: { $like: `%${queries.fullName}%` } },
      ...queries.lastVisit && { lastVisit: queries.lastVisit }
    }
  });

  return res.send(patients);
});

router.get('/:patientId', isLoged, isAdmin, async (req, res) => {
  const { patientId } = req.params;

  const patient = await Patient.findOne({
    where: {
      id: patientId,
    }
  });

  return res.send(patient);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  await Patient.destroy({ where: { id } });

  return res.send({ status: true });
});

export default router;
