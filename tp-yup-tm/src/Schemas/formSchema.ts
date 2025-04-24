import * as yup from 'yup';

export const formSchema = yup.object().shape({
  name: yup.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .required('El nombre es obligatorio'),
  email: yup.string()
    .email('Ingrese un email válido')
    .required('El email es obligatorio'),
  password: yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es obligatoria'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Debes confirmar tu contraseña'),
});