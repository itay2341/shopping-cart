const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const port = 3000;

const corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 204,
  methods: "GET",
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/products", (req, res) => {

  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }
    const jsonData = JSON.parse(data);
    res.status(200).json(jsonData);
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
