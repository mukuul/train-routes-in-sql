import express from 'express';
import bodyParser from 'body-parser';
import { addStation, searchStation, searchAllStation, updateStation, removeStation, removeAllStation, addTrain, searchAllTrain, searchTrain, updateTrain, removeTrain, removeAllTrain } from './utilities.js';

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my app." });
})

app.post("/addstation", async (req, res) => {
  res.send(await addStation(req.body));
});

app.get("/station", async (req, res) => {
  res.send(await searchAllStation());
});

app.get("/station/:id", async (req, res) => {
  res.send(await searchStation(req.params.id));
});

app.put("/station/:id", async (req, res) => {
  res.send(await updateStation(req.body, req.params.id))
});

app.delete("/station/:id", async (req, res) => {
  res.send(await removeStation(req.params.id))
});

app.delete("/station", async (req, res) => {
  res.send(await removeAllStation())
});

app.post("/addtrain", async (req, res) => {
  res.send(await addTrain(req.body));
});

app.get("/train", async (req, res) => {
  res.send(await searchAllTrain());
});

app.get("/train/:id", async (req, res) => {
  res.send(await searchTrain(req.params.id));
});

app.put("/train/:id", async (req, res) => {
  res.send(await updateTrain(req.body, req.params.id))
});

app.delete("/train/:id", async (req, res) => {
  res.send(await removeTrain(req.params.id))
});

app.delete("/train", async (req, res) => {
  res.send(await removeAllTrain())
});

app.listen(5000, () => {
  console.log("Server is running on port 5000.");
})