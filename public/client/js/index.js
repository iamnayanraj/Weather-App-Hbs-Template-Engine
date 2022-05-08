const url = "http://localhost:8500";
const inputForm = document.querySelector("#locForm");
inputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(inputForm);
  const formDataSerialized = Object.fromEntries(formData);
  const jsonObject = { ...formDataSerialized };
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonObject),
  })
    .then((response) => response.json())
    .then((data) => {
      if (!(typeof data.temprature === "undefined")) {
        document.getElementById(
          "temprature"
        ).innerHTML = `${data.temprature} °C`;
        document.getElementById(
          "location"
        ).innerHTML = `${data.cityname}  ${data.countryname}`;
        const imageBasePath = "./images/";
        let imagePath;
        if (data.description === "Rain") imagePath = "rain.jpg";
        else if (data.description === "Clear") imagePath = "sunny.jpg";
        else {
          imagePath = "cloudy.jpg";
        }
        console.log(imageBasePath + imagePath);
        document.getElementById("tempratureImage").src =
          imageBasePath + imagePath;
      } else {
        if (data.cod === "404") alert("City not found");
        else if (data.cod === "400") alert("Pls mention city");
        window.location.reload();
      }
    })
    .catch((error) => {
      console.log("Error:", error);
    });
});
