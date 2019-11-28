const express = require("express");

const app = express();

app.get("/ping", function(req, res) {
  return res.send({
    status: "OK",
    name: "Star Wars Wiki",
    uptime: process.uptime()
  });
});

require("./api/router.js")(app);

app.listen(3000, () => {
  console.log("Node listening on port 3000!");
});
