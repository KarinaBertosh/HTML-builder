const fs = require('fs');

const assets = './06-build-page/assets';
const filesProject = './06-build-page/project-dist';
const filesCopyAssets = './06-build-page/project-dist/assets';

// copy assent 

fs.mkdir(filesProject, err => {
});

fs.mkdir(filesCopyAssets, err => {
});

fs.readdir(filesCopyAssets, (err, folders) => {
  if (folders && folders.length) {
    folders.forEach(folder => {
      fs.readdir(`./06-build-page/project-dist/assets/${folder}`, (err, files) => {
        files.forEach(file => {
          fs.unlink(`./06-build-page/project-dist/assets/${folder}/${file}`, (err) => { });
        })
      })
    })
  }
})

fs.readdir(assets, (err, files) => {
  files.forEach(files => {
    fs.mkdir(`./06-build-page/project-dist/assets/${files}`, err => {

    });
    fs.readdir(`./06-build-page/assets/${files}`, (err, file) => {
      file.forEach(file => {
        fs.copyFile(`./06-build-page/assets/${files}/${file}`, `./06-build-page/project-dist/assets/${files}/${file}`, (err) => {
        });
      })
    });
  })
});

// styles

const path = require('path');
const styles = './06-build-page/styles/';

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const result = [];

const style = fs.createWriteStream('06-build-page/project-dist/style.css');
process.stdin.pipe(style)

fs.readdir(styles, (err, files) => {
  files.forEach(file => {
    if (path.extname(file) === '.css') {
      fs.readFile(`./06-build-page/styles/${file}`, 'utf8', function (error, fileContent) {
        if (error) throw error;
        result.push(fileContent);
        fs.writeFile('06-build-page/project-dist/style.css', result.join(''), function (error) {
          if (error) throw error;
        });
      });
    }
  })
});

// html
const htmlCopy = './06-build-page/project-dist/index.html';

fs.readFile('./06-build-page/template.html', 'utf8', function (error, fileContent) {
  let data = fileContent;

  fs.readdir('./06-build-page/components/', (err, files) => {
    files.forEach((file, index) => {
      let fileName = path.parse(file).name;
      fs.readFile(`./06-build-page/components/${file}`, 'utf8', function (error, fileContent) {
        data = data.replace(`{{${fileName}}}`, fileContent);
        if (index === 0) {
          fs.writeFile(htmlCopy, data, function (error) {
            if (error) throw error;
          });
        }
        else {
          fs.readFile(htmlCopy, 'utf8', function (error, htmlCopyContent) {
            data = data.replace(`{{${fileName}}}`, htmlCopyContent);
            fs.writeFile(htmlCopy, data, function (error) {
              if (error) throw error;
            });
          })
        }
        if (index === files.length - 1) {
          console.log('successfully finished');
        }
      })
    })
  });
});
