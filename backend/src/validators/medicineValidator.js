import { check } from 'express-validator/check';

const valid = {
  name: {
    min: 1,
    max: 50
  },
  description: {
    min: 1,
    max: 250
  }
};

const medicineValidator = [
  check('name').isLength({
    min: valid.name.min,
    max: valid.name.max
  }).withMessage(`Wymagana ilość znaków to od ${valid.name.min} - ${valid.name.max}`),
  check('description').isLength({
    min: valid.description.min,
    max: valid.description.max
  }).withMessage(`Wymagana ilość znaków to od ${valid.description.min} - ${valid.description.max}`),
  check('price').toInt().isInt({ gt: 0 }).withMessage('Cena musi być większa niż 0'),
  check('qty').toInt().isInt({ gt: 0 }).withMessage('ilość musi być większa niż 0'),
];

export default medicineValidator;
