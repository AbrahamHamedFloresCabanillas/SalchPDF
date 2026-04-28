const CartaPresentacion = ({ datos, refDocumento }) => {
  const fechaHoy = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  
  return (
    <div ref={refDocumento} className="w-full h-full bg-white text-[#000000] p-12 mx-auto font-sans leading-relaxed text-left shrink-0">
      <div className="mb-12 border-b-2 border-[#f3f4f6] pb-8">
        <h1 className="text-3xl font-light mb-4 text-[#111827] tracking-tight">{datos.nombreCompleto || 'Tu Nombre Completo'}</h1>
        <div className="text-sm text-[#6b7280] flex flex-col space-y-1">
          <span>{datos.direccion || 'Ciudad, País'}</span>
          <span>{datos.telefono || '+00 000 000 0000'}</span>
          <span>{datos.correoElectronico || 'correo@ejemplo.com'}</span>
        </div>
      </div>
      
      <div className="mb-8 text-[#1f2937] text-sm font-medium">
        <p>{fechaHoy}</p>
      </div>

      <div className="mb-6 text-[#1f2937] text-sm font-medium">
        <p>A quien corresponda,</p>
      </div>
      
      <div className="space-y-4 text-[#1f2937] text-sm whitespace-pre-line text-justify leading-loose">
        {datos.biografia || 'Escribe aquí el cuerpo de tu carta de presentación. Un breve resumen de tu perfil profesional y por qué eres la persona ideal para la posición a la que estás aplicando.'}
      </div>

      <div className="mt-16 text-[#1f2937] text-sm">
        <p className="mb-6 font-medium">Atentamente,</p>
        <p className="text-lg font-light text-[#111827]">{datos.nombreCompleto || 'Tu Nombre Completo'}</p>
      </div>
    </div>
  );
};
export default CartaPresentacion;
