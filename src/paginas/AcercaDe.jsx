import { Layers, FileText } from 'lucide-react';
import EnvolvedorAnimado from '../componentes/EnvolvedorAnimado';

const AcercaDe = () => {
  return (
    <EnvolvedorAnimado>
      <div className="w-full h-full flex flex-col items-center justify-center max-w-3xl mx-auto space-y-10 md:space-y-16 px-4 md:px-0">

        {/* Encabezado */}
        <div className="text-center space-y-4 md:space-y-6 shrink-0">
          <div className="inline-flex items-center justify-center p-4 bg-acento/10 rounded-3xl mb-2 md:mb-4 sombra-apple">
            <FileText className="w-10 h-10 md:w-12 md:h-12 texto-acento" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Acerca de SalchPDF
          </h1>
          <p className="text-base md:text-xl texto-secundario dark:text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            Diseñado para la simplicidad. Construido para el rendimiento.
            La forma más elegante de generar tus documentos profesionales.
          </p>
        </div>

        {/* Visión */}
        <div className="w-full bg-white dark:bg-[#1c1c1e] p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] sombra-apple borde-suave border dark:border-gray-800 shrink-0">
          <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
            <div className="p-2 md:p-3 bg-acento/10 rounded-xl md:rounded-2xl">
              <Layers className="w-5 h-5 md:w-6 md:h-6 texto-acento" />
            </div>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">Visión de SalchPDF</h2>
          </div>
          <p className="texto-secundario dark:text-gray-300 text-base md:text-lg leading-relaxed mb-4 md:mb-6">
            SalchPDF nació de la necesidad de eliminar la fricción al crear documentos importantes
            como tu Curriculum Vitae o una Carta de Presentación.
          </p>
          <p className="texto-secundario dark:text-gray-300 text-base md:text-lg leading-relaxed">
            Sin configuraciones complejas, sin diseños sobrecargados. Solo tú y tu información,
            transformada instantáneamente en documentos hermosos listos para imprimir o enviar.
          </p>
        </div>

      </div>
    </EnvolvedorAnimado>
  );
};

export default AcercaDe;
