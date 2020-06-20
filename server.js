// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/about", function (req, res) {
  res.send("Hello World");
});

app.get("/api/timestamp", function (req, res) {
  const date = new Date();
  res.json({
    unix: date.getTime(),
    utc : date.toUTCString()
  });
});

// `{"unix": <date.getTime()>, "utc" : <date.toUTCString()> }`
app.get("/api/timestamp/:date_str", function (req, res) {
   const{date_str} = req.params;    
   let date = new Date(date_str);
   let parsedDate = "aaa";
 
    if(date.toString() === "Invalid Date"){ // the date_str is unix
      parsedDate = new Date(parseInt(date_str)); 
      if(parsedDate.toString() === "Invalid Date"){ // if date_str is invalid
     
        return res.json({
          error:"Invalid date"
       });
      }
      return res.json({
        unix:parsedDate.getTime(),
        utc: parsedDate.toUTCString()       
     });
    }
  else{
   // if the date_str is 2015-12-25
    return res.json({
      unix:date.getTime(),
      utc: date.toUTCString()       
   });  
   }

  
  res.json({greeting: 'hello API'});
});






// listen for requests :)
var listener = app.listen(/*process.env.PORT*/5000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});



function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}