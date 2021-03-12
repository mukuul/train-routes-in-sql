import { addToTable, search, searchAll, update, remove, removeAll } from './methods.js';

export const addStation = async (body) => {
  return new Promise((resolve, reject) => { resolve(addToTable(body, "station")) })
}
export const addTrain = async (body) => {
  return new Promise((resolve, reject) => { resolve(addToTable(body, "train")) })
}
export const searchStation = async (id) => {
  return new Promise((resolve, reject) => { resolve(search(id, "station")) })
}
export const searchTrain = async (id) => {
  return new Promise((resolve, reject) => { resolve(search(id, "train")) })
}
export const searchAllStation = async () => {
  return new Promise((resolve, reject) => { resolve(searchAll("station")) })
}
export const searchAllTrain = async () => {
  return new Promise((resolve, reject) => { resolve(searchAll("train")) })
}
export const updateStation = async (body, id) => {
  return new Promise((resolve, reject) => { resolve(update(body, id, "station")) })
}
export const updateTrain = async (body, id) => {
  return new Promise((resolve, reject) => { resolve(update(body, id, "station")) })
}
export const removeStation = async (id) => {
  return new Promise((resolve, reject) => { resolve(remove(id, "station")) })
}
export const removeTrain = async (id) => {
  return new Promise((resolve, reject) => { resolve(remove(id, "train")) })
}
export const removeAllStation = async () => {
  return new Promise((resolve, reject) => { resolve(removeAll(id, "station")) })
}
export const removeAllTrain = async () => {
  return new Promise((resolve, reject) => { resolve(removeAll(id, "train")) })
}