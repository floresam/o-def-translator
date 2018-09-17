const fs = require('fs');
const xml2js = require('xml2js');
const util = require('util');

var parser = new xml2js.Parser();

var fileText = fs.readFileSync('o-def.xml');
parser.parseString(fileText, function(err, result) {
  //console.log(util.inspect(result['rdf:RDF']['rdf:Description'][4], false, null));
  var index = 0; 
  result['rdf:RDF']['rdf:Description'].forEach(function(entry) {
    if(entry['$']['rdf:about'].match(/core/)) { 
      if(entry['rdf:type'][0]['$']['rdf:resource'].match(/core#(ObjectClass|Property)/)){
	// The tempreature measure do not follow the RDEF about format for O-DEF.info
        var odefIdObj = entry['$']['rdf:about'].match(/core#(OC|P)(\d+(\.\d|\d)*)/);
	if(odefIdObj) {
	  console.log(odefIdObj[2]);
	  odefId = odefIdObj[2];
	  console.log(entry['odef:name'][0]);
	}
        //console.log(util.inspect(entry, false, null)); 
      //console.log(entry['rdf:type'][0]['$']['rdf:resource']);
      }
    }
    index++;
  });
});
