import * as Yup from 'yup';

export const emailSchema = Yup.string()
  .email('validation.invalidEmail')
  .required('validation.required');

export const passwordSchema = Yup.string()
  .min(8, 'validation.passwordMin')
  .matches(/[a-z]/, 'Password must contain lowercase letter')
  .matches(/[A-Z]/, 'Password must contain uppercase letter')
  .matches(/[0-9]/, 'Password must contain number')
  .required('validation.required');

export const loginSchema = Yup.object().shape({
  email: emailSchema,
  password: Yup.string().min(8, 'validation.passwordMin').required('validation.required'),
});

export const registerSchema = Yup.object().shape({
  firstName: Yup.string().required('validation.required'),
  lastName: Yup.string().required('validation.required'),
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'validation.passwordMatch')
    .required('validation.required'),
});

export const profileSchema = Yup.object().shape({
  firstName: Yup.string().required('validation.required'),
  lastName: Yup.string().required('validation.required'),
  bio: Yup.string().max(200, 'Bio must be 200 characters or less'),
  phone: Yup.string().matches(/^[+]?[\d\s-]+$/, 'Invalid phone number'),
});

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
};
