import html2pdf from 'html2pdf.js';

/**
 * Recorre recursivamente un arbol DOM y copia TODOS los estilos computados
 * del nodo original como estilos inline en el nodo clonado.
 *
 * Esto "hornea" las clases de Tailwind CSS (que html2canvas no puede resolver)
 * directamente en cada elemento, garantizando fidelidad visual total.
 *
 * @param {HTMLElement} nodoOriginal - Nodo del DOM visible con estilos computados
 * @param {HTMLElement} nodoClon - Nodo clonado donde se inyectaran los estilos inline
 */
const inyectarEstilosComputados = (nodoOriginal, nodoClon) => {
  // Solo procesar nodos de tipo Element (ignorar nodos de texto, comentarios, etc.)
  if (nodoOriginal.nodeType !== Node.ELEMENT_NODE) return;

  const estilosComputados = window.getComputedStyle(nodoOriginal);
  const propiedadesRelevantes = [
    // Tipografia
    'font-family', 'font-size', 'font-weight', 'font-style',
    'line-height', 'letter-spacing', 'text-align', 'text-transform',
    'text-decoration', 'text-indent', 'word-spacing', 'white-space',
    'word-break', 'overflow-wrap', 'text-justify',

    // Colores
    'color', 'background-color', 'opacity',

    // Box Model
    'width', 'height', 'min-width', 'min-height', 'max-width', 'max-height',
    'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
    'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
    'box-sizing',

    // Bordes
    'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width',
    'border-top-style', 'border-right-style', 'border-bottom-style', 'border-left-style',
    'border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color',
    'border-radius',

    // Layout (Flexbox)
    'display', 'flex-direction', 'flex-wrap', 'justify-content', 'align-items',
    'align-content', 'gap', 'row-gap', 'column-gap',
    'flex-grow', 'flex-shrink', 'flex-basis', 'order',

    // Posicionamiento
    'position', 'top', 'right', 'bottom', 'left', 'z-index',
    'float', 'clear', 'vertical-align',

    // Overflow y visibilidad
    'overflow', 'overflow-x', 'overflow-y', 'visibility',

    // Transformaciones (importante para anular la escala del preview)
    'transform', 'transform-origin',
  ];

  for (const propiedad of propiedadesRelevantes) {
    const valor = estilosComputados.getPropertyValue(propiedad);
    if (valor) {
      nodoClon.style.setProperty(propiedad, valor);
    }
  }

  // Recorrer recursivamente los nodos hijos
  const hijosOriginales = nodoOriginal.children;
  const hijosClon = nodoClon.children;
  const cantidadHijos = Math.min(hijosOriginales.length, hijosClon.length);

  for (let i = 0; i < cantidadHijos; i++) {
    inyectarEstilosComputados(hijosOriginales[i], hijosClon[i]);
  }
};

/**
 * Genera un PDF de alta calidad clonando el elemento DOM visible,
 * inyectando TODOS los estilos computados como inline styles,
 * y capturandolo con html2pdf.js.
 *
 * La inyeccion de estilos inline garantiza que html2canvas reciba
 * un DOM con estilos totalmente resueltos, sin depender de clases
 * de Tailwind CSS que no puede procesar.
 *
 * @param {HTMLElement} elementoOriginal - El elemento DOM real (.current del ref)
 * @param {string} nombreArchivo - Nombre del archivo sin extension
 */
export const generarPdf = async (elementoOriginal, nombreArchivo) => {
  if (!elementoOriginal) {
    console.error('Error: No se recibio un elemento DOM valido para la captura.');
    return;
  }

  // 1. Crear un contenedor temporal FUERA del flujo visual pero dentro del documento
  //    para que html2canvas pueda renderizarlo
  const envolturaTemporal = document.createElement('div');
  envolturaTemporal.style.position = 'fixed';
  envolturaTemporal.style.left = '-9999px';
  envolturaTemporal.style.top = '0';
  envolturaTemporal.style.width = '800px';
  envolturaTemporal.style.height = '1131px';
  envolturaTemporal.style.overflow = 'visible';
  envolturaTemporal.style.zIndex = '-9999';
  envolturaTemporal.style.backgroundColor = '#ffffff';

  // 2. Clonar el elemento original con TODOS sus hijos
  const clonElemento = elementoOriginal.cloneNode(true);

  // 3. CRITICO: Inyectar todos los estilos computados como inline
  //    Esto resuelve el problema de que html2canvas no puede procesar
  //    las clases utilitarias de Tailwind CSS v4
  inyectarEstilosComputados(elementoOriginal, clonElemento);

  // 4. Forzar dimensiones A4 completas en el clon (sin escala)
  clonElemento.style.width = '800px';
  clonElemento.style.height = '1131px';
  clonElemento.style.transform = 'none';
  clonElemento.style.position = 'static';
  clonElemento.style.backgroundColor = '#ffffff';

  // 5. Limpiar clases de Tailwind del clon para evitar conflictos
  //    (los estilos ya estan inline, las clases son redundantes)
  clonElemento.removeAttribute('class');

  envolturaTemporal.appendChild(clonElemento);
  document.body.appendChild(envolturaTemporal);

  // 6. Esperar dos frames para que el navegador calcule el layout del clon
  await new Promise(resolver => requestAnimationFrame(() => requestAnimationFrame(resolver)));

  const opciones = {
    margin:       0,
    filename:     `${nombreArchivo}.pdf`,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  {
      scale: 2,
      useCORS: true,
      letterRendering: true,
      width: 800,
      height: 1131,
      backgroundColor: '#ffffff',
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  try {
    await html2pdf().set(opciones).from(clonElemento).save();
  } catch (error) {
    console.error('Error al generar PDF:', error);
    alert('Hubo un error al generar el PDF. Por favor, intentalo de nuevo.');
  } finally {
    // 7. Limpiar siempre el contenedor temporal del DOM
    if (document.body.contains(envolturaTemporal)) {
      document.body.removeChild(envolturaTemporal);
    }
  }
};
