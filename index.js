var readJson = require('read-package-json');
var jsonld = require('jsonld');


var context = {
  "name": "http://schema.org/name",
  "homepage": {"@id": "http://schema.org/url", "@type": "@id"}
};


readJson('./package.json', console.error, false, function (er, data) {
  if (er) {
    console.error("There was an error reading the file")
    return
  }
  var doc = {
    "http://schema.org/name": data.name,
    "http://schema.org/url": {"@id": data.homepage}
  };
  jsonld.compact(doc, context, function(err, compacted) {
      console.log(JSON.stringify(compacted, null, 2));
    });
});
