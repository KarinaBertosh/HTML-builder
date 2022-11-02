const fs = require('fs');
const path = require('path');
const styles = './05-merge-styles/styles/';
const styles1 = './05-merge-styles/styles/style-1.css';
const styles2 = './05-merge-styles/styles/style-2.css';
const styles3 = './05-merge-styles/styles/style-3.css';

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const result = [];

const bundle = fs.createWriteStream('05-merge-styles/project-dist/bundle.css');
process.stdin.pipe(bundle)

fs.readdir(styles, (err, files) => {
  files.forEach(file => {
    console.log(file);
    if (path.extname(file) === '.css') {
      fs.readFile(`./05-merge-styles/styles/${file}`, 'utf8', function (error, fileContent) {
        if (error) throw error;
        result.push(fileContent);
        fs.writeFile('05-merge-styles/project-dist/bundle.css', result.join(''), function (error) {
          if (error) throw error;
          console.log(`Данные из файла ${file} успешно записаны`);
        });
      });
    }
  })
});

