const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const bodyParser = require("body-parser");

const staticPath = path.join(__dirname, "public");

const viewPath = path.join(__dirname, "views");
app.set("views", viewPath);
app.use(express.static(staticPath));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.hbs", {
    temprature: "",
    cityname: "",
    countryname: "",
  });
});

app.post("/", (req, res) => {
  const city = req.body.city;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=539cd4b086fa9e5546734c2b96c3173c`;
  let data = "";
  http
    .get(url, (response) => {
      response.on("data", (chunk) => {
        data += chunk;
      });
      response.on("end", () => {
        data = JSON.parse(data);
        if (data.cod === "404" || data.cod === "400") {
          res.render("index.hbs", {
            temprature: "City Not Found",
            cityname: "",
            countryname: "",
          });
        } else {
          const tempData = {
            temprature: (data.main.temp - 273.5).toFixed(2),
            cityname: data.name,
            countryname: data.sys.country,
            description: data.weather[0].main,
          };
          res.render("index.hbs", {
            temprature: (data.main.temp - 273.5).toFixed(2),
            cityname: data.name,
            countryname: data.sys.country,
            description: data.weather[0].main,
          });
        }
      });
    })
    .on("error", (err) => {
      console.log(err.message);
    });
});

app.get("*", (req, res) => {
  res.render("404.hbs", {
    message: "Page not found",
  });
});

app.listen(8000, () => {
  console.log(`app reunning on port ${8000}`);
});
