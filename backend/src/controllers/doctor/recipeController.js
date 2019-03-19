import express from 'express';
import { validationResult } from 'express-validator/check';
import Recipe from '../../models/Recipe';
import Patient from '../../models/Patient';
import recipeValidator from '../../validators/recipeValidator';
import { getLogedUser } from '../../helpers/getLogedUser';
import { isDoctor, isLoged } from '../../validators/authValidator';
import { isPaid } from '../../validators/paymentValidator';

const router = express.Router();

router.post('/', isLoged, isDoctor, isPaid, recipeValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.json({ errors: errors.array() });

  const { medicines, patientId, name } = req.body;

  const doctor = await getLogedUser(req.headers);

  const patient = await Patient.findOne({
    where: { id: patientId }
  });

  if (!patient) return res.send({ errors: [{ msg: 'Nie znaleziono pacjenta', param: 'recipe' }] });

  const medicinesIds = medicines.map(elem => elem.id);

  const newRecipe = await Recipe.create({
    name,
    doctorId: doctor.id,
    patientId: patient.id,
    doctor: JSON.stringify(doctor),
    patient: JSON.stringify(patient),
    medicines: JSON.stringify(medicinesIds)
  });

  return res.send({ status: true });
});

router.get('/:patientId', isLoged, isDoctor, isPaid, async (req, res) => {
  const { patientId } = req.params;
  const { id } = await getLogedUser(req.headers);

  const recipies = await Recipe.findAll({
    where: {
      patientId,
      doctorId: id
    }
  });

  res.send(recipies);
});

export default router;
