var readJson = require('read-package-json');
readJson('./package.json', console.error, false, function (er, data) {
  if (er) {
    console.error("There was an error reading the file")
    return
  }

  console.error('the package data is', data)
});
