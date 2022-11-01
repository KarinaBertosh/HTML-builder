
const secretFolder = './03-files-in-folder/secret-folder/';

const dataFile = './03-files-in-folder/secret-folder/data.csv';
const scriptFile = './03-files-in-folder/secret-folder/script.js';
const styleFile = './03-files-in-folder/secret-folder/style.css';
const textFile = './03-files-in-folder/secret-folder/text.txt';

const fs = require('fs');
var path = require('path')

fs.readdir(secretFolder, (err, files) => {
  files.forEach(file => {
    console.log(file);
  })
});

const files = [dataFile, scriptFile, styleFile, textFile]

files.forEach((file) => {
  fs.stat(file, (error, stats) => {
    if (error) {
      console.log(error);
    }
    else {
      console.log(`data.csv: ${stats.size / 1000} kb`);
    }
  });
})
