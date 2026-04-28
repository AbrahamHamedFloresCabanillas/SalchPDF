import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';

export const generarDocxCv = async (datos, nombreArchivo) => {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          children: [
            new TextRun({ text: datos.nombreCompleto || 'Tu Nombre', bold: true, size: 48 }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: `${datos.correoElectronico || 'correo'} | ${datos.telefono || 'tel'} | ${datos.direccion || 'dirección'}`, size: 20 }),
          ],
        }),
        new Paragraph({ text: '' }),
        new Paragraph({ children: [new TextRun({ text: 'Perfil Profesional', bold: true, size: 24 })], heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ text: datos.biografia || 'Perfil' }),
        new Paragraph({ text: '' }),
        new Paragraph({ children: [new TextRun({ text: 'Experiencia', bold: true, size: 24 })], heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ text: datos.experiencia || 'Experiencia' }),
        new Paragraph({ text: '' }),
        new Paragraph({ children: [new TextRun({ text: 'Educación', bold: true, size: 24 })], heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ text: datos.educacion || 'Educación' }),
      ],
    }],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${nombreArchivo}.docx`);
};

export const generarDocxCarta = async (datos, nombreArchivo) => {
  const fechaHoy = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({ children: [new TextRun({ text: datos.nombreCompleto || 'Tu Nombre', bold: true, size: 36 })] }),
        new Paragraph({ text: datos.direccion || 'Dirección' }),
        new Paragraph({ text: datos.telefono || 'Teléfono' }),
        new Paragraph({ text: datos.correoElectronico || 'Correo' }),
        new Paragraph({ text: '' }),
        new Paragraph({ text: fechaHoy }),
        new Paragraph({ text: '' }),
        new Paragraph({ text: 'A quien corresponda,' }),
        new Paragraph({ text: '' }),
        new Paragraph({ text: datos.biografia || 'Cuerpo de la carta.' }),
        new Paragraph({ text: '' }),
        new Paragraph({ text: 'Atentamente,' }),
        new Paragraph({ text: '' }),
        new Paragraph({ children: [new TextRun({ text: datos.nombreCompleto || 'Tu Nombre', bold: true })] }),
      ],
    }],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${nombreArchivo}.docx`);
};
