const express = require("express");
const https = require("https");
const bodyParser= require("body-parser");
const { json } = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

// app.get("/index", function(req , res){
//     res.sendFile(__dirname + "/index.html");
// });

app.get("/",function(req, res){
    const url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=702ac1f6e69221b14ffd1c762ea94677";
    https.get(url,function(response){
        console.log(response);

        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].main
            console.log("present the weather is " + weatherDescription);
            console.log("The present temprature is :"+temp);
        })
    })
})

app.listen(3000, function(){
    console.log("server running");
});