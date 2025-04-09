import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getCursoById } from '../../http/api';
import { EstudianteCard } from '../ui/EstudianteCard';

export default function EstudiantesScreen() {
  const [searchParams] = useSearchParams();
  const cursoId = searchParams.get('curso');
  const [estudiantes, setEstudiantes] = useState<any[]>([]);
  const [cursoNombre, setCursoNombre] = useState('');

  useEffect(() => {
    if (cursoId) {
      getCursoById(cursoId).then((res) => {
        setEstudiantes(res.data.estudiantes);
        setCursoNombre(res.data.nombre);
      });
    }
  }, [cursoId]);

  if (!cursoId) return <p>Curso no seleccionado.</p>;

  return (
    <div>
      <h2>Estudiantes de {cursoNombre}</h2>
      {estudiantes.map(est => (
        <EstudianteCard key={est.id} nombre={est.nombre} edad={est.edad} />
      ))}
    </div>
  );
}