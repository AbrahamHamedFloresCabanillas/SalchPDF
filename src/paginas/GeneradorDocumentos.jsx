import { useRef, useState, useEffect } from 'react';
import { FileDown, FileText } from 'lucide-react';
import usarDatosPersonales from '../almacenes/usarDatosPersonales';
import CurriculumVitae from '../componentes/CurriculumVitae';
import CartaPresentacion from '../componentes/CartaPresentacion';
import { generarPdf } from '../utilidades/exportarPdf';
import { generarDocxCv, generarDocxCarta } from '../utilidades/exportarDocx';
import EnvolvedorAnimado from '../componentes/EnvolvedorAnimado';

const GeneradorDocumentos = () => {
  const [pestañaActiva, asignarPestañaActiva] = useState('cv');
  const estadoGlobal = usarDatosPersonales();
  const refCv = useRef(null);
  const refCarta = useRef(null);
  
  const contenedorRef = useRef(null);
  const [escala, asignarEscala] = useState(0.5);

  useEffect(() => {
    const observar = new ResizeObserver((entradas) => {
      for (let entrada of entradas) {
        const { width, height } = entrada.contentRect;
        // Documento A4: 800px x 1131px
        const escalaAncho = width / 800;
        const escalaAlto = height / 1131;
        // Se escoge el menor para que encaje perfectamente y se deja un pequeño margen
        asignarEscala(Math.min(escalaAncho, escalaAlto) * 0.95);
      }
    });
    
    if (contenedorRef.current) {
      observar.observe(contenedorRef.current);
    }
    
    return () => observar.disconnect();
  }, []);

  const manejarDescargaPdf = () => {
    const nombreBase = estadoGlobal.nombreCompleto || 'Usuario';
    const nombreArchivo = pestañaActiva === 'cv' ? `Curriculum Vitae - ${nombreBase}` : `Carta de Presentación - ${nombreBase}`;
    
    // Capturar directamente el elemento DOM visible que ya tiene todos los estilos aplicados
    const elementoActivo = pestañaActiva === 'cv' ? refCv.current : refCarta.current;
    generarPdf(elementoActivo, nombreArchivo);
  };

  const manejarDescargaDocx = () => {
    const nombreBase = estadoGlobal.nombreCompleto || 'Usuario';
    const nombreArchivo = pestañaActiva === 'cv' ? `Curriculum Vitae - ${nombreBase}` : `Carta de Presentación - ${nombreBase}`;
    
    if (pestañaActiva === 'cv') {
      generarDocxCv(estadoGlobal, nombreArchivo);
    } else {
      generarDocxCarta(estadoGlobal, nombreArchivo);
    }
  };

  return (
    <EnvolvedorAnimado>
      <div className="w-full h-full flex flex-col pb-4 px-2 md:px-0 flex-1 min-h-0">
        <div className="text-center space-y-1 mb-4 md:mb-6 shrink-0">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Tus Documentos</h1>
          <p className="text-sm md:text-base texto-secundario dark:text-gray-400">Previsualiza y exporta tus documentos en alta calidad</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 items-start justify-between flex-1 min-h-0">
          
          {/* Panel de Controles */}
          <div className="w-full lg:w-64 shrink-0 flex flex-col gap-4">
            
            <div className="bg-gray-100/50 dark:bg-[#1c1c1e] p-1.5 rounded-2xl flex flex-row lg:flex-col gap-1 borde-suave border dark:border-gray-800 shadow-sm">
              <button
                onClick={() => asignarPestañaActiva('cv')}
                className={`flex-1 text-center lg:text-left px-3 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-medium transition-all ${pestañaActiva === 'cv' ? 'bg-white dark:bg-gray-800 shadow-sm text-gray-900 dark:text-white' : 'texto-secundario dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
              >
                Curriculum Vitae
              </button>
              <button
                onClick={() => asignarPestañaActiva('carta')}
                className={`flex-1 text-center lg:text-left px-3 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-medium transition-all ${pestañaActiva === 'carta' ? 'bg-white dark:bg-gray-800 shadow-sm text-gray-900 dark:text-white' : 'texto-secundario dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
              >
                Carta de Presentación
              </button>
            </div>

            <div className="flex flex-col gap-3 mt-1 md:mt-2">
              <button
                onClick={manejarDescargaPdf}
                className="flex items-center justify-center gap-2 w-full px-5 py-3 md:py-3.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-2xl font-medium hover:opacity-90 transition-opacity shadow-sm text-sm md:text-base cursor-pointer"
              >
                <FileText className="w-4 h-4 md:w-5 md:h-5" />
                <span>Descargar PDF</span>
              </button>
              <button
                onClick={manejarDescargaDocx}
                className="flex items-center justify-center gap-2 w-full px-5 py-3 md:py-3.5 bg-acento text-white rounded-2xl font-medium hover:bg-acento-hover transition-colors shadow-md shadow-blue-500/20 text-sm md:text-base cursor-pointer"
              >
                <FileDown className="w-4 h-4 md:w-5 md:h-5" />
                <span>Descargar DOCX</span>
              </button>
            </div>
          </div>

          {/* Contenedor de Previsualizacion Responsivo (Papel A4) */}
          <div 
            ref={contenedorRef}
            className="flex-1 w-full h-full bg-gray-50/80 dark:bg-gray-900/50 rounded-[2rem] border borde-suave dark:border-gray-800 sombra-apple flex justify-center items-center overflow-hidden relative min-h-[500px] md:min-h-0"
          >
            {/* Contenedor estricto que toma el tamano escalado para que Flexbox lo centre */}
            <div style={{ width: 800 * escala, height: 1131 * escala }} className="relative shrink-0 transition-all duration-200 ease-out">
              {/* El documento A4 real, posicionado absolutamente y escalado visualmente */}
              <div 
                style={{ 
                  transform: `scale(${escala})`, 
                  width: '800px', 
                  height: '1131px'
                }}
                className="absolute top-0 left-0 origin-top-left shadow-2xl bg-white overflow-hidden shrink-0 flex flex-col"
              >
                {pestañaActiva === 'cv' && (
                  <CurriculumVitae datos={estadoGlobal} refDocumento={refCv} />
                )}
                {pestañaActiva === 'carta' && (
                  <CartaPresentacion datos={estadoGlobal} refDocumento={refCarta} />
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </EnvolvedorAnimado>
  );
};

export default GeneradorDocumentos;
