const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

exports.generateSimulationReport = (simulation, userId) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const filename = `SimulationReport_${userId}_${Date.now()}.pdf`;
    const filepath = path.join(__dirname, '../reports', filename);

    if (!fs.existsSync(path.join(__dirname, '../reports'))) {
      fs.mkdirSync(path.join(__dirname, '../reports'));
    }

    const stream = fs.createWriteStream(filepath);
    doc.pipe(stream);

    doc.fontSize(20).text('FutureWealth - Simuleringsrapport', { align: 'center' });
    doc.moveDown();

    doc.fontSize(12).text(`Bruker-ID: ${userId}`);
    doc.text(`Kjørt: ${new Date(simulation.createdAt).toLocaleString()}`);
    doc.moveDown();

    doc.fontSize(14).text('Simuleringsresultat', { underline: true });
    doc.moveDown(0.5);

    doc.fontSize(12);
    doc.text(`Alder: ${simulation.age}`);
    doc.text(`Inntekt: ${simulation.income} kr`);
    doc.text(`Nåværende sparing: ${simulation.savings} kr`);
    doc.text(`Pensjonsrettigheter: ${simulation.pensionRights} kr`);
    doc.text(`Boligverdi: ${simulation.homeValue} kr`);
    doc.text(`Boliglån: ${simulation.mortgage} kr`);
    doc.text(`Mål pensjonsalder: ${simulation.targetRetirementAge}`);
    doc.text(`År til pensjon: ${simulation.yearsToRetirement}`);
    doc.text(`Estimert sparing ved pensjon: ${simulation.estimatedSavingsAtRetirement.toLocaleString()} kr`);
    doc.text(`Årlig skatt: ${simulation.estimatedTaxesPerYear.toLocaleString()} kr`);
    doc.text(`Suksess-sjanse: ${(simulation.successProbability * 100).toFixed(1)}%`);
    doc.moveDown();

    doc.fontSize(14).text('AI-generert anbefaling', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12).text(simulation.aiRecommendation);
    doc.moveDown();

    doc.moveDown(2);
    doc.text('Signatur: ______________________');
    doc.moveDown();
    doc.text('Dato: __________________________');

    doc.end();

    stream.on('finish', () => {
      resolve(filepath);
    });

    stream.on('error', (err) => {
      reject(err);
    });
  });
};
