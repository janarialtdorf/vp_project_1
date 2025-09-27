const http = require("http");
//laeme moodulid päringu parsimiseks
const url = require("url");
//failitee haldamiseks mooduli
const path = require("path");
const dateET = require("./src/dateTimeET")
const wisdom = require("./src/vanasonad")
const fs = require("fs");
const pageBanner = '<img src="/images/vp_banner_2025_TA.jpg" alt="kursuse banner">'
const textRef = "txt/vanasonad.txt";
const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head><meta charset="utf-8">\n<title>Janari Altdorf, veebiprogrammeerimine</title>\n</head><body>';
const pageLink = '\n\t<p>Vaata <a href ="/vanasonad"</a>.</p>';
const pageBody = '<h1> Janari Altdorf, veebiprogrammeerimine</h1>\n<p>See leht on loodud veebiprogrammeerimise kursusel <a href="https://www.tlu.ee">Tallinna Ülikoolis</a> ning ei sisalda tõsiseltvõetavat sisu!</p><hr>';
const pageFoot = '</body></html>';


http.createServer(function(req, res){
	//parsin URL-i
	console.log("paring: " + req.url);
	let currentUrl = url.parse(req.url, true);
	console.log("parsituna: " + currentUrl.pathname);
	
	if(currentUrl.pathname === "/"){
		res.writeHead(200, {"Content-type": "text/html"});
		res.write(pageHead);
		res.write(pageBanner);
	    res.write(pageBody);
		res.write('<a href="/vanasonad/"><button>Vaata vanasõnu</button></a>');
		res.write('<a href="/hobid"><button>Minu hobid</button></a>');
	    res.write("<p>Täna on " + dateET.weekDay() + ".</p>");
	    res.write("<p>Kell on praegu " + dateET.fullTime() + ".</p>");
	    res.write("<p>Tänane kuupäev on " + dateET.fullDate() + ".</p>");
	    res.write("<p>Hetkel on " + dateET.partOfDay() + ".</p>");
	    res.write(pageFoot);
	    return res.end();
	}
	
	else if(currentUrl.pathname === "/vanasonad/"){
	    res.writeHead(200, {"Content-type": "text/html"});
	    fs.readFile(textRef, "utf8", (err, data)=>{
		    if(err){
			    res.write(pageHead);
			    res.write(pageBody);
			    res.write("\n\t<p>Täna on " + dateEt.weekDay() + " " + dateEt.fullDate() + ".</p><p>Kahjuks vanasõnu pakkuda pole!</p>");
			    res.write(pageFoot);
			    return res.end();
	        } else {
			    let folkWisdom = data.split(";");
			    let folkWisdomOutput = "\n\t<ol>";
			    for (let i = 0; i < folkWisdom.length; i ++){
				    folkWisdomOutput += "\n\t\t<li>" + folkWisdom[i] + "</li>";
			    }
			    folkWisdomOutput += "\n\t</ol>";
			    res.write(pageHead);
			    res.write(pageBody);
			    //res.write("\n\t<p>Täna on " + dateEt.weekDay() + " " + dateEt.fullDate() + ".</p>");
			    res.write("\n\t<h2>Valik Eesti vanasõnu</h2>")
			    res.write(folkWisdomOutput);
				res.write(pageLink);
			    res.write(pageFoot);
			    return res.end();
		    }
	    });
	}   
	
	else if (currentUrl.pathname.startsWith("/images/")) {
	const filePath = path.join(__dirname, currentUrl.pathname);

	fs.readFile(filePath, (err, data) => {
		if (err) {
			throw(err);
		} else {
			res.writeHead(200, {"Content-Type": "image/jpeg"});
			res.end(data);
		}
	});
    }
	else if(currentUrl.pathname === "/hobid"){
		res.writeHead(200, {"Content-type": "text/html"});
		res.write(pageHead);
		res.write(pageBanner);
	    res.write(pageBody);
		res.write("Minu hobi on helindus ja muusika produtseerimine.");
		res.write('\n\t<p>Muusika produtseerimiseks kasutan ma programmi <a href = "https://www.image-line.com">FLStudio</a>.</p>');
		res.write('\n\t<p>Oma tehtud loomingut kajastan ma <a href = "https://open.spotify.com/artist/4OkXZfNgPfJjOJsgFuHZ0R?si=n9_d_uk4Rx2MiEuJ9tkNzg">Spotifys</a> ja ka muudel platvormidel.</p>');
		res.write('\n\t<img src ="/images/spotify.jpg" alt = "spotify">');
		res.write(pageFoot);
	    return res.end();
	}
    
	else {
		res.end("Viga 404, ei leia sellist lehte.");
	}	
}).listen(5101);