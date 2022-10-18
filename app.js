const swaggerUi = require("swagger-ui-express");
const express = require("express");
const fs = require("fs");
YAML = require("yamljs");
const app = express();
const port = process.env.PORT || 3000;
const swaggerDocument = YAML.load("swagger.yaml");

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

fs.readFile("./cleaning.json", "utf-8", (err, cleaning) => {
  try {
    const data = JSON.parse(cleaning);
    // console.log(data);
    app.get("/cleaning", (req, res) => {
      res.send(data);
    });
  } catch (error) {
    console.log("Error parsin JSON", err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
