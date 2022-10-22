const express = require("express");

const app = express();
var request = require("request");
app.set("view engine", "ejs");
const port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});
app.post("/submit", (req, res) => {
  const state = req.body.state;
  if (state == "SelectState") {
    res.redirect("/");
  } else 
   {
    const district = req.body.district;
    console.log(state);
    console.log(district);

    //
    var request = require("request");
    var options = {
      method: "GET",
      url: "https://api.covid19india.org/state_district_wise.json",
      headers: {},
    };
    request(options, function (error, response) {
      if (error) {
        throw new Error(error);
      } else {
        data = JSON.parse(response.body);
        // console.log(response.body);
        // console.log(data);
        // console.log(`${data.state.districtData.district}`);
        // console.log(data.state.districtData.district);
        // console.log(data.Jharkhand.districtData.Ranchi);
        // console.log(data.state);

        const saurav = data[`${state}`].districtData[`${district}`];
        res.render("result", {
          active: saurav.active,
          deceased: saurav.deceased,
          recovered: saurav.recovered,
          confirmed: saurav.confirmed,
          state: state,
          district: district,
        });
      }
    });
  }
});

app.listen(port, function () {
  console.log("Server started on port 3000");
});
