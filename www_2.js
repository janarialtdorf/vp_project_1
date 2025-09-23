const http = require("http");
//laeme moodulid päringu parsimiseks
const url = require("url");
//failitee haldamiseks mooduli
const path = require("path");
const dateET = require("./src/dateTimeET")
const wisdom = require("./src/vanasonad")
const fs = require("fs");
const pageBanner = '<img src="vp_banner_2025_TA.jpg" alt="kursuse banner">'
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
	
	else if(currentUrl.pathname === "/vp_banner_2025_TA.jpg"){
		//liidame muidu kattesaamatu piltide kausta meie veebi failiteega
		let bannerPath = path.join(__dirname, "images");
		fs.readFile(bannerPath + currentUrl.pathname, (err, data)=>{
			if(err){
				throw(err);
			} else {
				res.writeHead(200, {"Content-type": "image/jpeg"});
				res.end(data);
			}
		});
	}
    else {
		res.end("Viga 404, ei leia sellist lehte.");
	}	
}).listen(5101);