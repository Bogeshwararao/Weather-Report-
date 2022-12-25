const express = require("express");
const https = require("https");
const bodyParser= require("body-parser");
const { json } = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req , res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
   
   const appid="702ac1f6e69221b14ffd1c762ea94677";
   const query =req.body.cityinput;
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid="+appid +""
https.get(url,function(response){
    console.log(response);

    response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].main;
        const windSpeed = weatherData.wind.speed;
        res.write("<h1>The present temprature in "+ query +" is :"+ temp  +" Kelvin.</h1>");
        res.write("<h2>The present weather situation is </h2> " + weatherDescription);
        res.write("The wind speed is :"+ windSpeed +"")
        res.send()
    });
});
})

app.listen(3000, function(){
    console.log("server running");
});
