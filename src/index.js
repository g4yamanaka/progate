const axiosBase = require("axios");
const $ = require("jquery");
const axios = axiosBase.create({
  baseURL: "http://localhost:8080",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest"
  },
  responseType: "json"
});

$("#execute").click(function() {
  axios
    .post("/api/run", {
      files: [
        {
          sourceCode: editor.getValue(),
          programLanguage: "Java",
          fileName: "Main.java"
        }
      ]
    })
    .then(response => {
      if (response.data["stdErr"]["value"] === "") {
        $("#executeText").text(response.data["stdOut"]["value"]);
      } else {
        $("#executeText").text(response.data["stdErr"]["value"]);
      }
      console.log(response.status);
      console.log(response.data);
    })
    .catch(err => {
      console.log("error: ", err);
    });
});

$("#showSample").click(function() {
  $("#sampleText").text("Hello World");
});
