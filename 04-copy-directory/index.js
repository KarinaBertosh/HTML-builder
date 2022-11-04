const fs = require('fs');


const files = './04-copy-directory/files';
const filesCopy = './04-copy-directory/files-copy';

fs.mkdir(filesCopy, err => {
});

fs.readdir(filesCopy, (err, files) => {
  files.forEach(file => {
    fs.unlink(`./04-copy-directory/files-copy/${file}`, (err) => {
      if (err) throw err;
      console.log('File Copy Successfully.');
    });
  })
})

fs.readdir(files, (err, files) => {
  files.forEach(files => {
    console.log(files);
    fs.copyFile(`./04-copy-directory/files/${files}`, `./04-copy-directory/files-copy/${files}`, (err) => {
      if (err) throw err;
      console.log('File Copy Successfully.');
    });
  })
});
