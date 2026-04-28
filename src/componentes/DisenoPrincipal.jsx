import { Link, Routes, Route, useLocation } from 'react-router-dom';
import { FileText, Info, Edit3, Moon, Sun, Monitor } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import usarDatosPersonales from '../almacenes/usarDatosPersonales';

import FormularioCaptura from '../paginas/FormularioCaptura';
import GeneradorDocumentos from '../paginas/GeneradorDocumentos';
import AcercaDe from '../paginas/AcercaDe';

const DisenoPrincipal = () => {
  const { preferenciaTema, actualizarTema } = usarDatosPersonales();
  const ubicacion = useLocation();

  return (
    <div className="min-h-screen md:h-screen md:overflow-hidden flex flex-col font-sans transition-colors duration-300">
      {/* Barra de Navegación con efecto cristal (glassmorphism) */}
      <nav className="sticky top-0 z-50 efecto-cristal borde-suave border-b dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-semibold text-lg hover:opacity-80 transition-opacity dark:text-white">
            <FileText className="w-5 h-5 texto-acento" />
            <span className="hidden sm:inline">SalchPDF</span>
          </Link>
          
          <div className="flex items-center gap-3 md:gap-6 text-xs md:text-sm font-medium">
            <Link to="/" className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300 hover:texto-acento dark:hover:texto-acento transition-colors">
              <Edit3 className="w-4 h-4 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Formulario</span>
            </Link>
            <Link to="/documentos" className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300 hover:texto-acento dark:hover:texto-acento transition-colors">
              <FileText className="w-4 h-4 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Documentos</span>
            </Link>
            <Link to="/acerca" className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300 hover:texto-acento dark:hover:texto-acento transition-colors">
              <Info className="w-4 h-4 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Acerca de</span>
            </Link>
            
            {/* Control de Tema */}
            <div className="flex bg-black/5 dark:bg-white/10 p-1 rounded-full borde-suave border dark:border-gray-700 ml-1 md:ml-2">
              <button 
                onClick={() => actualizarTema('claro')}
                className={`p-1.5 rounded-full transition-all ${preferenciaTema === 'claro' ? 'bg-white shadow-sm text-black' : 'hover:bg-black/5 dark:hover:bg-white/5 opacity-60 dark:text-white'}`}
                aria-label="Tema Claro"
              >
                <Sun className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </button>
              <button 
                onClick={() => actualizarTema('sistema')}
                className={`p-1.5 rounded-full transition-all ${preferenciaTema === 'sistema' ? 'bg-white shadow-sm text-black' : 'hover:bg-black/5 dark:hover:bg-white/5 opacity-60 dark:text-white'}`}
                aria-label="Tema del Sistema"
              >
                <Monitor className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </button>
              <button 
                onClick={() => actualizarTema('oscuro')}
                className={`p-1.5 rounded-full transition-all ${preferenciaTema === 'oscuro' ? 'bg-white shadow-sm text-black' : 'hover:bg-black/5 dark:hover:bg-white/5 opacity-60 dark:text-white'}`}
                aria-label="Tema Oscuro"
              >
                <Moon className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido Principal */}
      <main className="flex-1 w-full flex flex-col min-h-0 overflow-y-auto overflow-x-hidden">
        <div className="flex-1 w-full max-w-5xl mx-auto px-4 md:px-8 py-4 md:py-6 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <Routes location={ubicacion} key={ubicacion.pathname}>
              <Route path="/" element={<FormularioCaptura />} />
              <Route path="/documentos" element={<GeneradorDocumentos />} />
              <Route path="/acerca" element={<AcercaDe />} />
            </Routes>
          </AnimatePresence>
        </div>
      </main>

      {/* Pie de página */}
      <footer className="shrink-0 borde-suave border-t dark:border-gray-800 py-4 md:py-6 text-center text-xs md:text-sm texto-secundario dark:text-gray-400 px-4">
        <p>© {new Date().getFullYear()} SalchPDF. Diseño minimalista enfocado en la productividad.</p>
      </footer>
    </div>
  );
};

export default DisenoPrincipal;
