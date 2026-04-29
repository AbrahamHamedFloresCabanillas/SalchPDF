# SalchPDF - Generador Profesional de Documentos

SalchPDF es una herramienta de alta productividad y diseño minimalista enfocada en la generación de Curriculum Vitae y Cartas de Presentación profesionales con previsualización en tiempo real.

---

## 1. Explicación del Proyecto

### Concepto
SalchPDF permite a los usuarios concentrarse exclusivamente en su contenido profesional mientras la aplicación se encarga de la estructura y el diseño visual. Inspirado en la estética premium de Apple, ofrece una interfaz fluida y un sistema de exportación de alta fidelidad.

### Características Clave
- **Previsualización en tiempo real:** Cada cambio en el formulario se refleja instantáneamente.
- **Exportación Dual:** Generación de archivos **.pdf** (fidelidad total) y **.docx** (editable).
- **Consistencia Pixel-Perfect:** Sincronización exacta entre la vista web y el documento exportado.
- **Seguridad de Datos:** Validación inteligente que evita la descarga de documentos incompletos.
- **Diseño Minimalista:** Interfaz optimizada para modo oscuro y productividad.

---

## 2. Arquitectura Técnica

### Stack Tecnológico
- **Frontend:** React 19 + Vite.
- **Estado Global:** Zustand (con persistencia en `localStorage`).
- **Estilos:** Tailwind CSS 4.
- **Generación de Archivos:** `html2pdf.js` para PDF y `docx` para documentos de Word.
- **Animaciones:** Framer Motion.

### Sincronización "Pixel-Perfect"
El sistema utiliza una técnica de **Inyección de Estilos Computados** que clona el DOM y "hornea" los estilos reales del navegador como estilos inline en el clon antes de la exportación. Esto garantiza que el PDF sea una representación idéntica de la interfaz de usuario.

### Selector de Temas
El sistema de gestión de temas (`ProveedorTema.jsx`) permite:
- **Prioridad Manual:** Las selecciones "Claro" u "Oscuro" sobrescriben la preferencia del sistema.
- **Modo Sistema:** Sincronización automática con el tema del SO mediante observadores `matchMedia`.
- **Persistencia:** La elección se guarda automáticamente para futuras sesiones.

---

## 3. Manual de Usuario

### Paso 1: Entrada de Datos
En la sección **Formulario**, ingrese su información personal, educación y experiencia. El sistema marcará los campos obligatorios para asegurar un documento profesional.

### Paso 2: Previsualización
En la sección **Documentos**, visualice sus cambios en tiempo real. Puede alternar entre el Curriculum Vitae y la Carta de Presentación usando el panel lateral.

### Paso 3: Exportación
- **PDF:** Para envíos oficiales con diseño inalterable.
- **DOCX:** Para ediciones posteriores en procesadores de texto.

> [!IMPORTANT]
> **Datos insuficientes:** Si faltan campos básicos (nombre, correo, etc.), el sistema bloqueará la descarga y mostrará una advertencia para evitar documentos vacíos.

---

**SalchPDF** - *Simplicidad profesional en cada pixel.*
