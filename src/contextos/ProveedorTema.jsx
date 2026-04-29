import { useEffect } from 'react';
import usarDatosPersonales from '../almacenes/usarDatosPersonales';

const ProveedorTema = ({ children }) => {
  const preferenciaTema = usarDatosPersonales((estado) => estado.preferenciaTema);

  useEffect(() => {
    const raiz = window.document.documentElement;

    const aplicarTema = (tema) => {
      raiz.classList.remove('dark');
      
      if (tema === 'sistema') {
        const prefiereOscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefiereOscuro) raiz.classList.add('dark');
      } else if (tema === 'oscuro') {
        raiz.classList.add('dark');
      }
    };

    aplicarTema(preferenciaTema);

    // Escuchar cambios en el tema del sistema solo si la preferencia es "sistema"
    if (preferenciaTema === 'sistema') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const manejarCambioTemaSistema = () => aplicarTema('sistema');
      
      mediaQuery.addEventListener('change', manejarCambioTemaSistema);
      return () => mediaQuery.removeEventListener('change', manejarCambioTemaSistema);
    }
  }, [preferenciaTema]);

  return <>{children}</>;
};

export default ProveedorTema;
