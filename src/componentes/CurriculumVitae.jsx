const CurriculumVitae = ({ datos, refDocumento }) => {
  return (
    <div ref={refDocumento} className="w-full h-full bg-white text-[#000000] p-12 mx-auto font-sans leading-relaxed text-left shrink-0">
      <div className="border-b-2 border-[#e5e7eb] pb-6 mb-6">
        <h1 className="text-4xl font-light mb-2 text-[#111827] tracking-tight">{datos.nombreCompleto || 'Tu Nombre Completo'}</h1>
        <div className="text-sm text-[#6b7280] flex flex-wrap gap-x-4 gap-y-1">
          <span>{datos.correoElectronico || 'correo@ejemplo.com'}</span>
          <span>•</span>
          <span>{datos.telefono || '+00 000 000 0000'}</span>
          <span>•</span>
          <span>{datos.direccion || 'Ciudad, País'}</span>
        </div>
      </div>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-sm font-semibold text-[#9ca3af] uppercase tracking-widest mb-3">Perfil Profesional</h2>
          <p className="text-[#1f2937] text-sm whitespace-pre-line leading-loose">
            {datos.biografia || 'Un breve resumen de tu perfil profesional.'}
          </p>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-[#9ca3af] uppercase tracking-widest mb-3">Experiencia</h2>
          <div className="text-[#1f2937] text-sm whitespace-pre-line leading-loose">
            {datos.experiencia || 'Tu experiencia profesional irá aquí.'}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-[#9ca3af] uppercase tracking-widest mb-3">Educación</h2>
          <div className="text-[#1f2937] text-sm whitespace-pre-line leading-loose">
            {datos.educacion || 'Tu educación irá aquí.'}
          </div>
        </section>
      </div>
    </div>
  );
};
export default CurriculumVitae;
