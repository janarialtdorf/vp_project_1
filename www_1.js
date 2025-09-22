const http = require("http");
const dateET = require("./src/dateTimeET")
const wisdom = require("./src/vanasonad")
const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head><meta charset="utf-8">\n<title>Janari Altdorf, veebiprogrammeerimine</title>\n</head><body>';
const pageBody = '<h1> Janari Altdorf, veebiprogrammeerimine</h1>\n<p>See leht on loodud veebiprogrammeerimise kursusel <a href="https://www.tlu.ee">Tallinna Ülikoolis</a> ning ei sisalda tõsiseltvõetavat sisu!</p><hr>';
const pageFoot = '</body></html>';

http.createServer(function(req, res){
    res.writeHead(200, {"Content-type": "text/html"});
	//res.write("Ongi nii!");
	res.write(pageHead);
	res.write(pageBody);
	res.write("<p>Täna on " + dateET.weekDay() + ".</p>");
	res.write("<p>Kell on praegu " + dateET.fullTime() + ".</p>");
	res.write("<p>Tänane kuupäev on " + dateET.fullDate() + ".</p>");
	res.write("<p>Hetkel on " + dateET.partOfDay() + ".</p>");
	res.write("<p>Tänane vanasõna on: " + wisdom.randomWisdom() + "</p>");
	res.write(pageFoot);
	return res.end();
}).listen(5101);