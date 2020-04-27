const fs = require('fs')
const path = require('path')

fs.readdir(__dirname, (err, files) => {
  files.forEach(file => {
    if (file.indexOf('.png') >= 0) {
      let newFileName = file.split('NH-Icon-')[1]
      fs.renameSync(path.join(__dirname, file), path.join(__dirname, newFileName))
    }
  })
})
