const express    = require('express'),
      app        = express(),
      bodyParser = require('body-parser'),
      port    	 = process.env.PORT || 3000;

// Then tell express from where to deliver the front end file.
app.set('views',__dirname + '/views');
// Express uses the template engine to parse the front end scripts. You can parse HTML,EJS,JADE etc. Set the appropriate one by using.
app.set('view engine', 'ejs');
// You have to tell Express from where it should deliver static files. Static files are images, JavaScript library, CSS files etc. You can specify by using
app.use(express.static(__dirname + '/public'));
// Setting { extended: true } allows the bodyParser to accept json like data within the form data including nested objects. e.g. { person: { name: Adam } } sent using javascript rather than the name value pairs which traditional HTML form send. If you don't need that you can set the extended value to false. Not defining an extended option (i.e. using a default setting) is apparently deprecated and they seem to want you to decide whether you need nested options or plain name value pairs.
app.use(bodyParser.urlencoded({ extended: true }));
// we are basically adding our main.js which is our router file and passing app which is instance of express to it because we need it to send response to browser.
require('./router/main')(app);

app.listen(port, process.env.IP, function(){
    console.log('Server has been started!');
});
