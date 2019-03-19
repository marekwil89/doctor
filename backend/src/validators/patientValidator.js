import { check } from 'express-validator/check';

const patientValidator = [
  check('fullName').isLength({ min: 1, max: 70 }).withMessage('Wymagana ilość znaków to od 1 - 70'),
  check('lastVisit').isLength({ min: 1, max: 250 }).withMessage('Format daty jest nieprawidłowy')
];

export default patientValidator;