import { useEffect, useState } from 'react';
import { getCursos } from '../../http/api';
import { CursoCard } from '../ui/CursoCard';

export default function CursosScreen() {
  const [cursos, setCursos] = useState<any[]>([]);

  useEffect(() => {
    getCursos().then((res) => setCursos(res.data));
  }, []);

  return (
    <div>
      <h2>Cursos</h2>
      {cursos.map(curso => (
        <CursoCard
          key={curso.id}
          id={curso.id}
          nombre={curso.nombre}
          cantidad={curso.estudiantes.length}
        />
      ))}
    </div>
  );
}