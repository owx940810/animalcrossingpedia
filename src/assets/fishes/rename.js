const path = require('path')
const fs = require('fs')

fs.readdir(__dirname, (err, files) => {
  files.forEach(file => {
    let name = file.toLowerCase().split('_acnh').join('')
    fs.renameSync(path.join(__dirname, file), path.join(__dirname, name));
    console.log(name)
  })
})
