import { useForm } from 'react-hook-form';
import { User, Mail, Phone, MapPin, BookOpen, Briefcase, FileText, CheckCircle2, RotateCcw } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import usarDatosPersonales from '../almacenes/usarDatosPersonales';
import EnvolvedorAnimado from '../componentes/EnvolvedorAnimado';

const InputIcono = ({ icono: Icono, error, ...props }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
      <Icono className={`w-5 h-5 transition-colors ${error ? 'text-red-500' : 'texto-secundario dark:text-gray-400'}`} />
    </div>
    <input
      className={`w-full pl-11 pr-4 py-3.5 md:py-2.5 bg-white dark:bg-[#1c1c1e] text-gray-900 dark:text-gray-100 border ${error ? 'border-red-500 ring-1 ring-red-500/20' : 'borde-suave dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500/20'} rounded-2xl md:rounded-xl outline-none transition-all sombra-apple placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm md:text-base`}
      {...props}
    />
  </div>
);

const AreaTextoIcono = ({ icono: Icono, error, ...props }) => (
  <div className="relative">
    <div className="absolute top-3.5 md:top-3 left-0 pl-3.5 flex items-start pointer-events-none">
      <Icono className={`w-5 h-5 transition-colors ${error ? 'text-red-500' : 'texto-secundario dark:text-gray-400'}`} />
    </div>
    <textarea
      className={`w-full pl-11 pr-4 py-3.5 md:py-2.5 min-h-[140px] md:min-h-[80px] bg-white dark:bg-[#1c1c1e] text-gray-900 dark:text-gray-100 border ${error ? 'border-red-500 ring-1 ring-red-500/20' : 'borde-suave dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500/20'} rounded-2xl md:rounded-xl outline-none transition-all sombra-apple resize-y placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm md:text-base`}
      {...props}
    />
  </div>
);

const FormularioCaptura = () => {
  const [guardado, asignarGuardado] = useState(false);
  const estadoGlobal = usarDatosPersonales();
  const estaLimpiandoVisualmente = useRef(false);
  
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({
    defaultValues: {
      nombreCompleto: estadoGlobal.nombreCompleto,
      correoElectronico: estadoGlobal.correoElectronico,
      telefono: estadoGlobal.telefono,
      direccion: estadoGlobal.direccion,
      educacion: estadoGlobal.educacion,
      experiencia: estadoGlobal.experiencia,
      biografia: estadoGlobal.biografia,
    }
  });

  const valoresActuales = watch();

  // Sincronización en tiempo real con el almacén Zustand persistente
  useEffect(() => {
    if (estaLimpiandoVisualmente.current) return;
    
    Object.keys(valoresActuales).forEach((campo) => {
      if (valoresActuales[campo] !== estadoGlobal[campo]) {
        estadoGlobal.actualizarCampo(campo, valoresActuales[campo]);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valoresActuales]);

  const manejarLimpiar = () => {
    if (window.confirm('¿Estás seguro de que deseas borrar toda tu información? Esta acción no se puede deshacer.')) {
      estadoGlobal.limpiarDatos();
      reset({
        nombreCompleto: '',
        correoElectronico: '',
        telefono: '',
        direccion: '',
        educacion: '',
        experiencia: '',
        biografia: '',
      });
    }
  };

  const alEnviar = (datos) => {
    Object.keys(datos).forEach((campo) => {
      estadoGlobal.actualizarCampo(campo, datos[campo]);
    });
    
    asignarGuardado(true);
    
    // Limpieza inmediata visual para reflejar un estado nuevo, preservando Zustand
    estaLimpiandoVisualmente.current = true;
    reset({
      nombreCompleto: '',
      correoElectronico: '',
      telefono: '',
      direccion: '',
      educacion: '',
      experiencia: '',
      biografia: '',
    });
    setTimeout(() => { estaLimpiandoVisualmente.current = false; }, 200);
    setTimeout(() => asignarGuardado(false), 3000);
  };

  return (
    <EnvolvedorAnimado>
      <div className="max-w-3xl mx-auto w-full flex-1 h-full flex flex-col justify-start md:justify-center space-y-5 md:space-y-6 pb-8 md:pb-2 px-2 md:px-0">
      <div className="text-center space-y-1.5 shrink-0">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Información Personal</h1>
        <p className="text-sm md:text-base texto-secundario dark:text-gray-400">Completa tus datos para generar tus documentos</p>
      </div>

      <form onSubmit={handleSubmit(alEnviar)} className="space-y-5 md:space-y-4 shrink-0 w-full">
        
        {/* Nombre y Correo */}
        <div className="flex flex-col md:flex-row gap-5 md:gap-4">
          <div className="space-y-1.5 flex-1">
            <label className="text-sm font-medium ml-1 text-gray-700 dark:text-gray-300">Nombre Completo</label>
            <InputIcono 
              icono={User}
              error={errors.nombreCompleto}
              placeholder="Ej. Juan Pérez"
              {...register('nombreCompleto', { 
                required: 'El nombre es obligatorio',
                minLength: { value: 3, message: 'El nombre debe tener al menos 3 caracteres' }
              })}
            />
            {errors.nombreCompleto && <span className="text-sm text-red-500 ml-1">{errors.nombreCompleto.message}</span>}
          </div>

          <div className="space-y-1.5 flex-1">
            <label className="text-sm font-medium ml-1 text-gray-700 dark:text-gray-300">Correo Electrónico</label>
            <InputIcono 
              icono={Mail}
              error={errors.correoElectronico}
              type="email"
              placeholder="ejemplo@correo.com"
              {...register('correoElectronico', { 
                required: 'El correo es obligatorio',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'El formato del correo es inválido'
                }
              })}
            />
            {errors.correoElectronico && <span className="text-sm text-red-500 ml-1">{errors.correoElectronico.message}</span>}
          </div>
        </div>

        {/* Teléfono y Dirección */}
        <div className="flex flex-col md:flex-row gap-5 md:gap-4">
          <div className="space-y-1.5 flex-1">
            <label className="text-sm font-medium ml-1 text-gray-700 dark:text-gray-300">Teléfono</label>
            <InputIcono 
              icono={Phone}
              error={errors.telefono}
              type="tel"
              placeholder="+52 123 456 7890"
              {...register('telefono', { 
                required: 'El teléfono es obligatorio',
                minLength: { value: 10, message: 'Debe contener al menos 10 dígitos' }
              })}
            />
            {errors.telefono && <span className="text-sm text-red-500 ml-1">{errors.telefono.message}</span>}
          </div>

          <div className="space-y-1.5 flex-1">
            <label className="text-sm font-medium ml-1 text-gray-700 dark:text-gray-300">Dirección</label>
            <InputIcono 
              icono={MapPin}
              error={errors.direccion}
              placeholder="Ciudad, País"
              {...register('direccion', { required: 'La dirección es obligatoria' })}
            />
            {errors.direccion && <span className="text-sm text-red-500 ml-1">{errors.direccion.message}</span>}
          </div>
        </div>

        {/* Educación y Experiencia en columnas para Escritorio */}
        <div className="flex flex-col md:flex-row gap-5 md:gap-4">
          <div className="space-y-1.5 flex-1">
            <label className="text-sm font-medium ml-1 text-gray-700 dark:text-gray-300">Educación</label>
            <AreaTextoIcono 
              icono={BookOpen}
              error={errors.educacion}
              placeholder="Licenciatura en Diseño Gráfico, Universidad..."
              {...register('educacion', { required: 'La educación es obligatoria' })}
            />
            {errors.educacion && <span className="text-sm text-red-500 ml-1">{errors.educacion.message}</span>}
          </div>

          <div className="space-y-1.5 flex-1">
            <label className="text-sm font-medium ml-1 text-gray-700 dark:text-gray-300">Experiencia Profesional</label>
            <AreaTextoIcono 
              icono={Briefcase}
              error={errors.experiencia}
              placeholder="Diseñador Senior en Empresa X..."
              {...register('experiencia', { required: 'La experiencia es obligatoria' })}
            />
            {errors.experiencia && <span className="text-sm text-red-500 ml-1">{errors.experiencia.message}</span>}
          </div>
        </div>

        {/* Biografía */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium ml-1 text-gray-700 dark:text-gray-300">Biografía Breve</label>
          <AreaTextoIcono 
            icono={FileText}
            error={errors.biografia}
            placeholder="Un breve resumen de tu perfil profesional..."
            {...register('biografia', { 
              required: 'La biografía es obligatoria',
              maxLength: { value: 500, message: 'Máximo 500 caracteres' }
            })}
          />
          {errors.biografia && <span className="text-sm text-red-500 ml-1">{errors.biografia.message}</span>}
        </div>

        {/* Botón Guardar y Limpiar */}
        <div className="pt-2 md:pt-3 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="w-full flex flex-col md:flex-row items-center justify-center md:justify-start gap-2 md:gap-4 order-2 md:order-1">
            <button
              type="button"
              onClick={manejarLimpiar}
              className="flex items-center gap-1.5 text-xs md:text-sm texto-secundario hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span>Limpiar datos</span>
            </button>
            <span className={`flex items-center justify-center gap-1.5 text-green-500 font-medium transition-all duration-300 ${guardado ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 md:translate-y-0'}`}>
              <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-sm md:text-base">Guardados</span>
            </span>
          </div>
          <button 
            type="submit"
            className="w-full md:w-auto group relative px-10 py-4 bg-gradient-to-br from-blue-600 to-blue-500 dark:from-blue-500 dark:to-blue-600 text-white rounded-2xl font-semibold tracking-wide hover:shadow-xl hover:shadow-blue-500/30 active:scale-[0.97] transition-all duration-300 order-1 md:order-2 flex items-center justify-center gap-3 cursor-pointer overflow-hidden"
          >
            {/* Efecto de brillo sutil */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <CheckCircle2 className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span>Guardar Información</span>
          </button>
        </div>

      </form>
    </div>
    </EnvolvedorAnimado>
  );
};

export default FormularioCaptura;
