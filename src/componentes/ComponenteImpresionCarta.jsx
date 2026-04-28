const ComponenteImpresionCarta = ({ datos }) => {
  const fechaHoy = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  
  return (
    <div className="w-[210mm] min-h-[297mm] bg-white text-[#000000] p-10 mx-auto font-sans leading-relaxed text-left shrink-0 box-border">
      <div className="mb-10 border-b-2 border-[#000000] pb-6">
        <h1 className="text-3xl font-bold mb-4 text-[#000000] tracking-tight">{datos.nombreCompleto || 'Tu Nombre Completo'}</h1>
        <div className="text-sm text-[#1f2937] flex flex-col space-y-1 font-medium">
          <span>{datos.direccion || 'Ciudad, País'}</span>
          <span>{datos.telefono || '+00 000 000 0000'}</span>
          <span>{datos.correoElectronico || 'correo@ejemplo.com'}</span>
        </div>
      </div>
      
      <div className="mb-8 text-[#000000] text-sm font-bold">
        <p>{fechaHoy}</p>
      </div>

      <div className="mb-6 text-[#000000] text-sm font-bold">
        <p>A quien corresponda,</p>
      </div>
      
      <div className="space-y-4 text-[#000000] text-sm whitespace-pre-line text-justify leading-relaxed">
        {datos.biografia || 'Escribe aquí el cuerpo de tu carta de presentación. Un breve resumen de tu perfil profesional y por qué eres la persona ideal para la posición a la que estás aplicando.'}
      </div>

      <div className="mt-16 text-[#000000] text-sm">
        <p className="mb-6 font-bold">Atentamente,</p>
        <p className="text-lg font-bold text-[#000000] border-t border-[#d1d5db] inline-block pt-2 pr-10">{datos.nombreCompleto || 'Tu Nombre Completo'}</p>
      </div>
    </div>
  );
};
export default ComponenteImpresionCarta;
