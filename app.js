const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const hbs = require("hbs");
const bodyParser = require("body-parser");

const staticPath = path.join(".//public", "//client");

const fs = require("fs"); // this engine requires the fs module
app.engine("ntl", (filePath, options, callback) => {
  console.log(filePath);
  // define the template engine
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err);
    // this is an extremely simple template engine
    const rendered = content
      .toString()
      .replace("{{temprature}}", `<p>${options.temprature}</p>`)
      .replace("{{cityname}}", `<p>${options.cityname}</p>`)
      .replace("{{countryname}}", `<p>${options.countryname}</p>`);
    return callback(null, rendered);
  });
});
//app.set("view engine", "ntl"); // register the template engine
//console.log(staticPath);

const viewPath = path.join(__dirname, "templates", "views");
const partialPath = path.join(__dirname, "templates", "partials");
// console.log(viewPath);
app.set("views", viewPath);
app.use(express.static(staticPath));
hbs.registerPartials(partialPath);

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.hbs", {
    temprature: "",
    cityname: "",
    countryname: "",
  });
});
// app.get("/", (req, res) => {
//   res.render("index.hbs", {
//     temprature: "20.5",
//     cityname: "kolkata",
//     countryname: "India",
//   });
// });

app.post("/", (req, res) => {
  //res.send("hello");
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
            // description: data.weather[0].main,
          };
          // res.redirect(`/${JSON.stringify(tempData)}`);
          res.render("index.hbs", {
            temprature: (data.main.temp - 273.5).toFixed(2),
            cityname: data.name,
            countryname: data.sys.country,
            // description: data.weather[0].main,
          });
        }
      });
    })
    .on("error", (err) => {
      console.log(err.message);
    });
});

app.get("/about", (req, res) => {
  console.log(req.query);
  res.send("about");
});

app.get("/test", (req, res) => {
  res.send("<h1>Test page</h1>");
});

app.get("/api", (req, res) => {
  res.json([
    {
      id: 1,
      name: "nayan",
    },
    {
      id: 1,
      name: "nayan",
    },
  ]);
});

app.get("*", (req, res) => {
  res.render("404.hbs", {
    message: "Page not found",
  });
});

app.listen(8500, () => {
  console.log(`app reunning on port ${8000}`);
});




