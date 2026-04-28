const ComponenteImpresionCv = ({ datos }) => {
  return (
    <div className="w-[210mm] min-h-[297mm] bg-white text-[#000000] p-10 mx-auto font-sans leading-relaxed text-left shrink-0 box-border">
      <div className="border-b-2 border-[#000000] pb-4 mb-6">
        <h1 className="text-4xl font-bold mb-2 text-[#000000] tracking-tight">{datos.nombreCompleto || 'Tu Nombre Completo'}</h1>
        <div className="text-sm text-[#374151] flex flex-wrap gap-x-4 gap-y-1 font-medium">
          <span>{datos.correoElectronico || 'correo@ejemplo.com'}</span>
          <span>•</span>
          <span>{datos.telefono || '+00 000 000 0000'}</span>
          <span>•</span>
          <span>{datos.direccion || 'Ciudad, País'}</span>
        </div>
      </div>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-sm font-bold text-[#1f2937] uppercase tracking-widest mb-2 border-b border-[#d1d5db] pb-1">Perfil Profesional</h2>
          <p className="text-[#000000] text-sm whitespace-pre-line leading-relaxed">
            {datos.biografia || 'Un breve resumen de tu perfil profesional.'}
          </p>
        </section>

        <section>
          <h2 className="text-sm font-bold text-[#1f2937] uppercase tracking-widest mb-2 border-b border-[#d1d5db] pb-1">Experiencia</h2>
          <div className="text-[#000000] text-sm whitespace-pre-line leading-relaxed pl-4 border-l-2 border-[#e5e7eb]">
            {datos.experiencia || 'Tu experiencia profesional irá aquí.'}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold text-[#1f2937] uppercase tracking-widest mb-2 border-b border-[#d1d5db] pb-1">Educación</h2>
          <div className="text-[#000000] text-sm whitespace-pre-line leading-relaxed pl-4 border-l-2 border-[#e5e7eb]">
            {datos.educacion || 'Tu educación irá aquí.'}
          </div>
        </section>
      </div>
    </div>
  );
};
export default ComponenteImpresionCv;
