var readJson = require('read-package-json');
var jsonld = require('jsonld');


var context = {
  "schema": "http://schema.org/"
};


readJson('./package.json', console.error, false, function (er, data) {
  if (er) {
    console.error("There was an error reading the file")
    return
  }
  var doc = [
     {
        "@id": data.homepage,
        "@type": "http://schema.org/SoftwareApplication",
        "http://schema.org/name": data.name,
        "http://schema.org/about": data.description,
        "http://schema.org/url": data.homepage,
        "http://schema.org/softwareVersion": data.version,
        "http://schema.org/author": data.author.url
    },
    {
    "@id": data.author.url,
    "http://schema.org/name": data.author.name,   
    "http://schema.org/email": data.author.email
    }
];
  jsonld.compact(doc, context, function(err, compacted) {
      console.log(JSON.stringify(compacted, null, 2));
  });
  // serialize a document to N-Quads (RDF)
  jsonld.toRDF(doc, {format: 'application/nquads'}, function(err, nquads) {
    // nquads is a string of nquads
    console.log(nquads);
  });
});
