import express from "express";
import bodyParser from "body-parser";
import {
  addStation,
  searchStation,
  searchAllStation,
  updateStation,
  removeStation,
  removeAllStation,
  addTrain,
  searchAllTrain,
  searchTrain,
  updateTrain,
  removeTrain,
  removeAllTrain,
  addTrainroute,
} from "./utilities.js";
import {
  trainroute,
  seatAvailability,
  stationList,
  trainList,
  newTicket,
  cancelTicket,
} from "./methods.js";
const app = express();
const api = express();

app.use("/api", api);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", express.static("public"));
app.post("/", (req, res) => {
  console.log(req.body);
});
app.listen(5000, () => {
  console.log("Server is running on port 5000.");
});

api.use(bodyParser.json());

api.get("/", (req, res) => {
  res.json({ message: "Welcome to my api." });
});

api.post("/addstation", async (req, res) => {
  res.send(await addStation(req.body));
});

api.get("/station", async (req, res) => {
  res.send(await searchAllStation());
});

api.get("/station/:id", async (req, res) => {
  res.send(await searchStation(req.params.id));
});

api.put("/station/:id", async (req, res) => {
  res.send(await updateStation(req.body, req.params.id));
});

api.delete("/station/:id", async (req, res) => {
  res.send(await removeStation(req.params.id));
});

api.delete("/station", async (req, res) => {
  res.send(await removeAllStation());
});

api.post("/addtrain", async (req, res) => {
  res.send(await addTrain(req.body));
});

api.get("/train", async (req, res) => {
  res.send(await searchAllTrain());
});

api.get("/train/:id", async (req, res) => {
  res.send(await searchTrain(req.params.id));
});

api.put("/train/:id", async (req, res) => {
  res.send(await updateTrain(req.body, req.params.id));
});

api.delete("/train/:id", async (req, res) => {
  res.send(await removeTrain(req.params.id));
});

api.delete("/train", async (req, res) => {
  res.send(await removeAllTrain());
});

api.post("/addtrainroute", async (req, res) => {
  res.send(await addTrainroute(req.body));
});

api.get("/trainroute", async (req, res) => {
  res.send(await trainroute(req.query));
});

api.get("/stationlist", async (req, res) => {
  res.send(await stationList(req.query));
});

api.get("/trainlist", async (req, res) => {
  res.send(await trainList(req.query));
});

api.get("/seat", async (req, res) => {
  res.send(await seatAvailability(req.query));
});

api.get("/newticket", async (req, res) => {
  res.send(await newTicket(req.query));
});

api.get("/cancelticket", async (req, res) => {
  res.send(await cancelTicket(req.query));
});
