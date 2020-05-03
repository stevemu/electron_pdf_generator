var pdfFiller = require('pdffiller');

// var data = {
//   "Date1_af_date": "01/01/2018",
//   "Case Name": "Qi"
// };

function fillPdf(sourcePdf, destPdf, data) {
  return new Promise((resolve, reject) => {
    pdfFiller.fillFormWithFlatten(sourcePdf, destPdf, data, false, function(err) {
      if (err) reject(err);
      resolve();
    })
  });
}

module.exports = fillPdf;