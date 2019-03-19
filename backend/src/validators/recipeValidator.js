import { check, body } from 'express-validator/check';

const recipeValidator = [
  check('name').isLength({ min: 1, max: 30 }).withMessage('Wymagana ilość znaków to od 1 - 30'),
  body('medicines').trim().isLength({ min: 1 }).withMessage('Recepta musi posiadać conajmniej jeden lek'),
];

export default recipeValidator;
