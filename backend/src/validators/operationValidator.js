import { check } from 'express-validator/check';

const operationValidator = [
  check('name').isLength({ min: 1, max: 30 }).withMessage('Wymagana ilość znaków to od 1 - 30'),
  check('description').isLength({ min: 1, max: 250 }).withMessage('Wymagana ilość znaków to od 1 - 250'),
  check('date').isLength({ min: 1, max: 250 }).withMessage('Format daty jest nieprawidłowy')
];


export default operationValidator;
