interface EstudianteCardProps {
    nombre: string;
    edad: number;
  }
  
  export function EstudianteCard({ nombre, edad }: EstudianteCardProps) {
    return (
      <div style={{ border: '1px solid #ffff', padding: '0.5rem', marginLeft: '5rem', marginBottom: '0.5rem' }}>
        <p>{nombre} - {edad} años</p>
      </div>
    );
  }