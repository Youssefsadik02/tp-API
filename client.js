const axios = require("axios");
const bodyParser = require("body-parser");
const path = require("path");
const express = require("express");

const app = express();
const router = express.Router();

app.use(express.json());
//app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

const serverPort = 3001;

let server_URL = "";

router.get("/", (req, res) => {
  console.log("Chargement page d'accueil");
  res.render("index", { data: "" });
});

router.post("/view", async function (req, res) {
  server_URL = `${req.protocol}://${req.get("host").slice(0, -4) + serverPort
    }/etudiants/`;

  if (req.body.id != "") {
    server_URL += `${req.body.id}`;
  }

  await axios
    .get(server_URL)
    .then((response) => {
      console.log("Statut view : " + response.status);
      res.render("index", {
        status: response.status,
        data: JSON.stringify(response.data, 4),
      });
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
      }
    })
});

router.post("/add", async function (req, res) {
  server_URL = `${req.protocol}://${req.get("host").slice(0, -4) + serverPort
    }/etudiants/`;

  await axios
    .post(server_URL, req.body)
    .then((response) => {
      console.log("Statut ajout : " + response.status);
      res.render("index", {
        status: response.status,
        data: "Ajout " + JSON.stringify(req.body),
      });
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
      }
    });
});

router.post("/update", async function (req, res) {
  server_URL = `${req.protocol}://${req.get("host").slice(0, -4) + serverPort
    }/etudiants/${req.body.id}`;

  await axios
    .put(server_URL, req.body)
    .then((response) => {
      console.log("Statut update : " + response.status);
      res.render("index", {
        status: response.status,
        data: "Modification " + JSON.stringify(req.body),
      });
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
      }
    });
});

router.post("/delete", async function (req, res) {
  server_URL = `${req.protocol}://${req.get("host").slice(0, -4) + serverPort
    }/etudiants/${req.body.id}`;

  await axios
    .delete(server_URL)
    .then((response) => {
      console.log("Statut delete : " + response.status);
      res.render("index", {
        status: response.status,
        data: `Suppression étudiant ${req.body.id}`,
      });
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
      }
    });
});

app.use("/", router);

app.listen(process.env.port || 3000, () => {
  console.log("écoute sur le port 3000");
});
