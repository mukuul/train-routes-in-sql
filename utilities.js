import { addToTable, search } from './methods.js';

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
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) throw err;
      conn.query("SELECT * FROM station;",
        (error, results, fields) => {
          conn.release();
          if (error) reject(error);
          else {
            resolve(results)
          }
        }
      )
    })
  })
}
export const updateStation = (body, id) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) throw err;
      conn.query("UPDATE station SET stationName=?, stationCode=? WHERE id=?;", [body["stationName"], body["stationCode"], id],
        (error, results, fields) => {
          conn.release();
          if (error) reject(error);
          else if (results.affectedRows === 0) {
            resolve({ error: "not_found" })
          }
          else {
            console.log(results)
            console.log({ id: id, ...body });
            resolve({ id: id, ...body });
          }
        });
    });
  });
}
export const deleteStation = async (id) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) throw err;
      conn.query("DELETE FROM station WHERE id=?;", id,
        (error, results, fields) => {
          conn.release();
          if (error) reject(error);
          else if (results.affectedRows === 0) {
            resolve({ error: "not_found" })
          }
          else {
            resolve("Deleted record for id:" + id)
          }
        }
      )
    })
  })
}
export const deleteAllStation = async () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) throw err;
      conn.query("DELETE FROM station;",
        (error, results, fields) => {
          conn.release();
          if (error) reject(error);
          else {
            resolve("Deleted all records")
          }
        }
      )
    })
  })
}