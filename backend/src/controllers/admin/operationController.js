import express from 'express';
import Operation from '../../models/Operation';
import { isAdmin, isLoged } from '../../validators/authValidator';

const router = express.Router();

router.get('/:patientId', isLoged, isAdmin, async (req, res) => {
  const { patientId } = req.params;

  const operations = await Operation.findAll({
    where: {
      patientId,
    }
  });

  return res.send(operations);
});

export default router;
