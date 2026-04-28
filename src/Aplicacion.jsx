import { BrowserRouter } from 'react-router-dom';
import ProveedorTema from './contextos/ProveedorTema';
import DisenoPrincipal from './componentes/DisenoPrincipal';

const Aplicacion = () => {
  return (
    <ProveedorTema>
      <BrowserRouter>
        <DisenoPrincipal />
      </BrowserRouter>
    </ProveedorTema>
  );
};

export default Aplicacion;
