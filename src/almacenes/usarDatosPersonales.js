import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const usarDatosPersonales = create(
  persist(
    (asignar) => ({
      // Datos personales
      nombreCompleto: '',
      correoElectronico: '',
      telefono: '',
      direccion: '',
      educacion: '',
      experiencia: '',
      biografia: '',

      // Preferencia de tema (sistema, claro, oscuro)
      preferenciaTema: 'sistema',

      // Acciones para actualizar el estado
      actualizarCampo: (campo, valor) =>
        asignar((estado) => ({
          ...estado,
          [campo]: valor,
        })),

      actualizarTema: (nuevoTema) =>
        asignar(() => ({
          preferenciaTema: nuevoTema,
        })),

      limpiarDatos: () =>
        asignar((estado) => ({
          ...estado,
          nombreCompleto: '',
          correoElectronico: '',
          telefono: '',
          direccion: '',
          educacion: '',
          experiencia: '',
          biografia: '',
        })),
    }),
    {
      name: 'almacen-salchpdf', // Nombre en localStorage
    }
  )
);

export default usarDatosPersonales;
