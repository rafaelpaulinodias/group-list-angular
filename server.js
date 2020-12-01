const express = require("express");
const app = express();

app.use(express.static(__dirname + "/dist/g-list"));

app.get("/*", function(req, res) {
  res.sendFile(__dirname + "/dist/g-list/index.html");
});

app.listen(process.env.PORT || 4200);