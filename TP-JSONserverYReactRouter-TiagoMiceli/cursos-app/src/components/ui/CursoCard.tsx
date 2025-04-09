import { Link } from 'react-router-dom';

interface CursoCardProps {
  id: number;
  nombre: string;
  cantidad: number;
}

export function CursoCard({ id, nombre, cantidad }: CursoCardProps) {
  return (
    <div style={{ border: '1px solid #ffff', padding: '1rem', marginLeft: '5rem', marginBottom: '2rem' }}>
      <h3>{nombre}</h3>
      <p>Estudiantes: {cantidad}</p>
      <Link to={`/estudiantes?curso=${id}`}>Ver estudiantes</Link>
    </div>
  );
}