import express from 'express';
import Recipe from '../../models/Recipe';
import { isAdmin, isLoged } from '../../validators/authValidator';

const router = express.Router();

router.get('/:patientId', isLoged, isAdmin, async (req, res) => {
  const { patientId } = req.params;

  const recipies = await Recipe.findAll({
    where: {
      patientId,
    }
  });

  return res.send(recipies);
});

export default router;
