import { useEffect } from 'react';
import usarDatosPersonales from '../almacenes/usarDatosPersonales';

const ProveedorTema = ({ children }) => {
  const preferenciaTema = usarDatosPersonales((estado) => estado.preferenciaTema);

  useEffect(() => {
    const raiz = window.document.documentElement;

    const aplicarTema = (tema) => {
      raiz.classList.remove('claro', 'dark');
      
      if (tema === 'sistema') {
        const prefiereOscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
        raiz.classList.add(prefiereOscuro ? 'dark' : 'claro');
      } else {
        raiz.classList.add(tema);
      }
    };

    aplicarTema(preferenciaTema);

    // Escuchar cambios en el tema del sistema si la preferencia es "sistema"
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
