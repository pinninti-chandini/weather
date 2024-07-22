const express = require("express");
const bodyParser = require("body-parser");

const axios = require("axios");

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("weather.ejs", { serveroutput: "" });
});


app.post("/", (req, res) => {
    let cityName = req.body.name;


    let url = `https://api.weatherapi.com/v1/current.json?key=ace8fcf2140a4958aab55116242207&q=${cityName}&aqi=no`;


    axios.get(url)
        .then((response) => {

            const temperature = response.data.current.temp_c;
            res.render("weather.ejs", { serveroutput: `Current temperature in ${cityName}: ${temperature}°C` });
        })
        .catch((error) => {
            console.error("Error fetching data from API:", error.message);
            res.render("weather.ejs", { serveroutput: "Error fetching data from API" });
        });
});
app.listen(3005, () => {
    console.log("Server started on port 3005");
});