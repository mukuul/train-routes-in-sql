import mysql from 'mysql';
const port = 3000;

const pool = mysql.createPool({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "password",
  database: "train"
});


export const addToTable = async (body, table) => {
  let entry;
  if (table === "station") {
    entry = {
      "stationName": body["stationName"],
      "stationCode": body["stationCode"],
    };
  }
  else if (table === "train") {
    entry = {
      "trainNumber": body["trainNumber"],
      "train": body["train"]
    }
  }
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) throw err;
      conn.query(`INSERT INTO ${table} SET ?`, entry,
        (error, results, fields) => {
          conn.release();
          if (error) reject(error);
          else {
            console.log({ id: results.insertId, ...entry });
            resolve({ id: results.insertId, ...entry });
          }
        });
    });
  });
}

export const search = async (id, table) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) throw err;
      conn.query(`SELECT * FROM ${table} WHERE id=?;`, id,
        (error, results, fields) => {
          conn.release();
          console.log(results)
          if (error) reject(error);
          else if (results.affectedRows === 0) {
            resolve({ error: "not_found" })
          }
          else {
            resolve(results)
          }
        }
      )
    })
  })
}