// const url = "http://localhost:8500";
// const inputForm = document.querySelector("#locForm");
// inputForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const formData = new FormData(inputForm);
//   const formDataSerialized = Object.fromEntries(formData);
//   const jsonObject = { ...formDataSerialized };
//   fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(jsonObject),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       if (!(typeof data.temprature === "undefined")) {
//         console.log(data);
//       } else {
//         if (data.cod === "404") alert("City not found");
//         else if (data.cod === "400") alert("Pls mention city");
//         window.location.reload();
//       }
//     })
//     .catch((error) => {
//       console.log("Error:", error);
//     });
// });
