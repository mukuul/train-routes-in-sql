import mysql from 'mysql';
const port = 3000;

const pool = mysql.createPool({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "password",
  database: "train"
});

export const addStation = async (body) => {
  let station = {
    "stationName": body["stationName"],
    "stationCode": body["stationCode"],
  };
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) throw err;
      conn.query("INSERT INTO station SET ?", station,
        (error, results, fields) => {
          conn.release();
          if (error) reject(error);
          else {
            console.log({ id: results.insertId, ...station });
            resolve({ id: results.insertId, ...station });
          }
        });
    });
  });
}
export const searchStation = async (id) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) throw err;
      conn.query("SELECT * FROM station WHERE id=?;", id,
        (error, results, fields) => {
          conn.release();
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