import {
  addToTable,
  search,
  searchAll,
  update,
  remove,
  removeAll,
} from "./methods.js";

export const addStation = async (body) => {
  return addToTable(body, "station");
};
export const addTrain = async (body) => {
  return addToTable(body, "train");
};
export const addTrainroute = async (body) => {
  return addToTable(body, "trainroute");
};

export const searchStation = async (id) => {
  return search(id, "station");
};
export const searchTrain = async (id) => {
  return search(id, "train");
};
export const searchAllStation = async () => {
  return searchAll("station");
};
export const searchAllTrain = async () => {
  return searchAll("train");
};
export const updateStation = async (body, id) => {
  return update(body, id, "station");
};
export const updateTrain = async (body, id) => {
  return update(body, id, "station");
};
export const removeStation = async (id) => {
  return remove(id, "station");
};
export const removeTrain = async (id) => {
  return remove(id, "train");
};
export const removeAllStation = async () => {
  return removeAll(id, "station");
};
export const removeAllTrain = async () => {
  return removeAll(id, "train");
};
