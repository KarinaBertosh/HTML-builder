
const fs = require('fs');
const fsPromises = fs.promises;



function copyDir() {
  fsPromises.mkdir('04-copy-directory/files-copy').then(function () {
    console.log('Directory created successfully');
  }).catch(function () {
    console.log('failed to create directory');
  });
}







