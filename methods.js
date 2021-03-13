import mysql from "mysql";
const port = 3000;

const pool = mysql.createPool({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "password",
  database: "train",
});

export const addToTable = async (body, table) => {
  let entry;
  if (table === "station") {
    entry = {
      stationName: body["stationName"],
      stationCode: body["stationCode"],
    };
  } else if (table === "train") {
    entry = {
      trainNumber: body["trainNumber"],
      train: body["train"],
    };
  } else if (table === "trainroute") {
    entry = {
      trainID: body["trainID"],
      stationID: body["stationID"],
      time: body["time"],
      stay: body["stay"],
    };
  } else if (table === "trainroute") {
    entry = {
      trainID: body["trainID"],
      stationID: body["stationID"],
      time: body["time"],
      stay: body["stay"],
    };
  }
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) throw err;
      conn.query(
        `INSERT INTO ${table} SET ?`,
        entry,
        (error, results, fields) => {
          conn.release();
          if (error) reject(error);
          else {
            console.log({ id: results.insertId, ...entry });
            resolve({ id: results.insertId, ...entry });
          }
        }
      );
    });
  });
};

export const search = async (id, table) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) throw err;
      conn.query(
        `SELECT * FROM ${table} WHERE id=?;`,
        id,
        (error, results, fields) => {
          conn.release();
          console.log(results);
          if (error) reject(error);
          else if (results.affectedRows === 0) {
            resolve({ error: "not_found" });
          } else {
            resolve(results);
          }
        }
      );
    });
  });
};
export const searchAll = async (table) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) throw err;
      conn.query(`SELECT * FROM ${table};`, (error, results, fields) => {
        conn.release();
        if (error) reject(error);
        else {
          resolve(results);
        }
      });
    });
  });
};
export const update = (body, id, table) => {
  let entry;
  if (table === "station") {
    entry = {
      stationName: body["stationName"],
      stationCode: body["stationCode"],
    };
  } else if (table === "train") {
    entry = {
      trainNumber: body["trainNumber"],
      train: body["train"],
    };
  }
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) throw err;
      conn.query(
        `UPDATE ${table} SET ? WHERE id=?;`,
        [entry, id],
        (error, results, fields) => {
          conn.release();
          if (error) reject(error);
          else if (results.affectedRows === 0) {
            resolve({ error: "not_found" });
          } else {
            console.log(results);
            console.log({ id: id, ...body });
            resolve({ id: id, ...body });
          }
        }
      );
    });
  });
};
export const remove = async (id, table) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) throw err;
      conn.query(
        `DELETE FROM ${table} WHERE id=?;`,
        id,
        (error, results, fields) => {
          conn.release();
          if (error) reject(error);
          else if (results.affectedRows === 0) {
            resolve({ error: "not_found" });
          } else {
            resolve("Deleted record for id:" + id);
          }
        }
      );
    });
  });
};
export const removeAll = async (table) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) throw err;
      conn.query(`DELETE FROM ${table};`, (error, results, fields) => {
        conn.release();
        if (error) reject(error);
        else {
          resolve("Deleted all records");
        }
      });
    });
  });
};
export const trainroute = async (query) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) throw err;
      conn.query(
        `SELECT A.trainID, train.trainNumber, train.train
          FROM trainroute A
          INNER JOIN trainroute B ON A.trainID=B.trainID
          INNER JOIN train ON A.trainID=train.id
          WHERE A.stationID='${query.from}' 
          AND B.stationID='${query.to}' AND A.time<B.time;`,
        (error, results, fields) => {
          conn.release();
          if (error) reject(error);
          else {
            resolve(results);
          }
        }
      );
    });
  });
};
