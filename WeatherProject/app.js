const express = require("express")
const https = require("https");
const bodyParser = require("body-parser")

const app = express();


app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html")
  });

app.post("/",function(req,res){

const query = req.body.cityname
const api = "64083bf35aa2b8534acb38491208d301"
const unit = "metric"

const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units="+ unit +"&appid="+api

  https.get(url, function (response){

      response.on("data",function(data){
      const weatherData = JSON.parse(data)
      console.log(weatherData)
      var temp = weatherData.main.temp
      var icon = weatherData.weather[0].icon
      console.log(icon)
      imgUrl = "http://openweathermap.org/img/wn/"+  icon +"@2x.png"
      res.write("<h1>The temparature in "+ query + " is " + temp +"</h1>")
      res.write("<img src=" + imgUrl   +" >")
      res.send()
      
      });

    });


});







app.listen(3000, function(){
  console.log("server is running on port 3000")
});
