let fs = require("fs");
let os = require("os");
let ncp = require('ncp').ncp;
let path = require("path");
let fillPdf = require("./fillPdf");

/*
Precondition:
intake-template.pdf and templates folder has to be on the Desktop

*/
async function createFolders(lastName, firstName, matter) {
  let homeDir = os.homedir();
  //	(assume $USER_DIR/Dropbox (MdMLaw)\Del Mazo Law\5. E-Casefiles already exists)
  let baseDir = path.join(homeDir, "Dropbox (MdMLaw)", "Del Mazo Law", "5. E-Casefiles");
  
  // get lastName initial
  let lastNameInitial = lastName.charAt(0);

  // let firstLevelFolderPath = `${baseDir}/${lastNameInitial}`;
  let firstLevelFolderPath = path.join(baseDir, lastNameInitial);
  if (!fs.existsSync(firstLevelFolderPath)) {
    fs.mkdirSync(firstLevelFolderPath);
  }

  // construct full name and create next level folder name
  let fullName = `${lastName}, ${firstName}`;
  let secondLevelFolderPath = path.join(firstLevelFolderPath, fullName);
  if (!fs.existsSync(secondLevelFolderPath)) {
    fs.mkdirSync(secondLevelFolderPath);
  }

  // construct next level folder with matter
  let thirdLevelFolderPath = path.join(secondLevelFolderPath, matter);
  if (!fs.existsSync(thirdLevelFolderPath)) {
    fs.mkdirSync(thirdLevelFolderPath);
  }

  // copy everything under Desktop/templates to matter/
  let source = path.join(homeDir, "Desktop", "templates");
  let dest = thirdLevelFolderPath;
  await copyFolders(source, dest);

  // filld up the intake template pdf and save it to matter/i. Admin
  let intakePdfTemplatePath = path.join(homeDir, "Desktop", "intake-template.pdf");
  // let intakePdfDestPath = path.join(homeDir, "Desktop", "intake-template-output.pdf");
  let intakePdfDestPath = path.join(thirdLevelFolderPath, "i. Admin", `${fullName} intake.pdf`);
  try {
    let FilNameInForm = `${lastName.toUpperCase()}, ${firstName}; ${matter}`;

    console.log(intakePdfTemplatePath);
    console.log(intakePdfDestPath);
    
    await fillPdf(intakePdfTemplatePath, intakePdfDestPath, {
      "File Name": FilNameInForm
    });
    console.log("generated intake pdf");
    return {
      success: true,
      resultPath: thirdLevelFolderPath
    };
  } catch (e) {
    console.log(e);
  }

  return {
    success: false
  };
}

// copy folders that under one folder to another folder
function copyFolders(source, dest) {
  return new Promise((resolve, reject) => {
    ncp(source, dest, function (err) {
      if (err) {
        reject(err);
        // return console.error(err);
      }
      resolve();
      // console.log('done!');
     });
  })
}


module.exports = createFolders;