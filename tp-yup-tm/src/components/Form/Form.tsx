import React, { useState } from 'react';
import styles from '../Form/Form.module.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { formSchema } from '../../Schemas/formSchema';

const Form: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    const updatedForm = {
      ...formData,
      [name]: value,
    };
  
    setFormData(updatedForm);
  
    setTouched(prev => ({
      ...prev,
      [name]: true,
    }));
  
    try {
      await formSchema.validate(updatedForm, { abortEarly: false });
  
      // Si no hay errores, limpia el error de ese campo
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    } catch (err) {
      const error = err as yup.ValidationError;
  
      if (error.inner) {
        const fieldError = error.inner.find(e => e.path === name);
        if (fieldError) {
          setErrors(prev => ({
            ...prev,
            [name]: fieldError.message,
          }));
        } else {
          // Si no hay error en este campo, lo quita
          setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[name];
            return newErrors;
          });
        }
      }
    }
  };  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await formSchema.validate(formData, { abortEarly: false });

      Swal.fire({
        title: 'Éxito',
        text: 'Formulario enviado correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });

      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      setErrors({});
      setTouched({});
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        error.inner.forEach(err => {
          if (err.path) {
            newErrors[err.path] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  const hasErrorsInTouchedFields = Object.keys(errors).some(
    key => touched[key]
  );

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1 className={styles.title}>Formulario de Registro</h1>

      <Input
        label="Nombre"
        name="name"
        value={formData.name}
        type="text"
        handleChange={handleChange}
        error={errors.name}
      />

      <Input
        label="Email"
        name="email"
        value={formData.email}
        type="email"
        handleChange={handleChange}
        error={errors.email}
      />

      <Input
        label="Contraseña"
        name="password"
        value={formData.password}
        type="password"
        handleChange={handleChange}
        error={errors.password}
      />

      <Input
        label="Confirmar Contraseña"
        name="confirmPassword"
        value={formData.confirmPassword}
        type="password"
        handleChange={handleChange}
        error={errors.confirmPassword}
      />

      <Button type="submit" disabled={hasErrorsInTouchedFields}>
        Enviar
      </Button>
    </form>
  );
};

export default Form;
