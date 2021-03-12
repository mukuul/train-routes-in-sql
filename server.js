import express from 'express';
import bodyParser from 'body-parser';
import { addStation, searchStation, searchAllStation, updateStation, deleteStation, deleteAllStation, addTrain, searchTrain } from './utilities.js';

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
  res.send(await deleteStation(req.params.id))
});

app.delete("/station", async (req, res) => {
  res.send(await deleteAllStation())
});

app.post("/addtrain", async (req, res) => {
  res.send(await addTrain(req.body));
});

app.get("/train", async (req, res) => {
  res.send(await searchAllStation());
});

app.get("/train/:id", async (req, res) => {
  res.send(await searchTrain(req.params.id));
});

app.put("/train/:id", async (req, res) => {
  res.send(await updateStation(req.body, req.params.id))
});

app.delete("/train/:id", async (req, res) => {
  res.send(await deleteStation(req.params.id))
});

app.delete("/train", async (req, res) => {
  res.send(await deleteAllStation())
});

app.listen(5000, () => {
  console.log("Server is running on port 5000.");
})