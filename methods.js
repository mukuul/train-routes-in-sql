import { v4 as uuidv4 } from "uuid";
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
      routeID: body["routeID"],
      day: body["day"],
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
            console.log({ id: id, ...entry });
            resolve({ id: id, ...entry });
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
        `SELECT
        trainroute.trainID,
        train.trainNumber,
        train.train,
        trainroute.day 
     FROM
        schedule A 
        INNER JOIN
           schedule B 
           ON A.routeID = B.routeID 
        INNER JOIN
           trainroute 
           ON A.routeID = trainroute.routeID 
        INNER JOIN
           train 
           ON trainroute.trainID = train.id 
     WHERE
        A.stationID =? 
        AND B.stationID =? 
        AND A.arrTime < B.arrTime;`,
        [query.from, query.to],
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
export const stationList = async () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) throw err;
      conn.query(`SELECT * FROM station;`, (error, results, fields) => {
        conn.release();
        console.log(results);
        if (error) reject(error);
        else {
          resolve(results);
        }
      });
    });
  });
};
var seatQuery = `SELECT
  seatID,MAX(booking.bookedByUserID) AS available_seat 
  FROM
  booking 
  INNER JOIN
     trainroute 
    ON booking.trainrouteID = trainroute.id 
  INNER JOIN
     train 
    ON trainroute.trainID = train.id 
  WHERE
  train.trainNumber = ?
  AND trainroute.day = ?
  AND stationID BETWEEN ? AND ?
  AND nextStationID BETWEEN ? AND ?
  GROUP BY
  seatID`;
export const seatAvailability = async (query) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) throw err;
      conn.query(
        `SELECT
        COUNT(*) as available_seats
     FROM
        (${seatQuery})
        table1 
     WHERE
        available_seat IS NULL;`,
        [
          query.trainnumber,
          query.day,
          query.from,
          query.to,
          query.from,
          query.to,
        ],
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

export const newTicket = async (query) => {
  return new Promise((resolve, reject) => {
    var ticketNumber = "TRR" + uuidv4().slice(24);
    pool.getConnection((err, conn) => {
      if (err) throw err;
      conn.query(
        `
        SELECT booking.id
        FROM booking
        INNER JOIN
        (SELECT seatID
          FROM
            (${seatQuery})
          table1 
          WHERE
            available_seat IS NULL
          LIMIT 1) seatchosen
        ON booking.seatID=seatchosen.seatID
        INNER JOIN
         trainroute 
        ON booking.trainrouteID = trainroute.id 
        INNER JOIN
          train 
        ON trainroute.trainID = train.id 
        WHERE
          train.trainNumber = ?
        AND trainroute.day = ?
        AND stationID BETWEEN ? AND ?
        AND nextStationID BETWEEN ? AND ?
        ;`,
        [
          query.trainnumber,
          query.day,
          query.from,
          query.to,
          query.from,
          query.to,
          query.trainnumber,
          query.day,
          query.from,
          query.to,
          query.from,
          query.to,
        ],
        (error, results, fields) => {
          console.log(results);
          for (var ids of results) {
            conn.query(
              `INSERT INTO ticket SET
              ticketNumber=?,
              bookedSeatID=?,
              userID=?;`,
              [ticketNumber, ids.id, query.userid],
              (error, results, fields) => {
                console.log({
                  ticketNumber: ticketNumber,
                  user: query.userid,
                  id: ids.id,
                });
              }
            );
          }
          conn.query(
            `UPDATE booking
                INNER JOIN 
                  (SELECT seatID
                FROM
                  (${seatQuery})
                table1 
                WHERE
                  available_seat IS NULL
                LIMIT 1)
                as seatbooked
                ON seatbooked.seatID=booking.seatID
                SET bookedByUserID=?
                WHERE stationID BETWEEN ? AND ?
                AND nextStationID BETWEEN ? AND ?
                ;`,
            [
              query.trainnumber,
              query.day,
              query.from,
              query.to,
              query.from,
              query.to,
              query.userid,
              query.from,
              query.to,
              query.from,
              query.to,
            ],
            (error, results, fields) => {
              console.log({ ...results });
            }
          );
          conn.release();
          if (error) reject(error);
          else {
            resolve(`tickeNumber:${ticketNumber}
            `);
          }
        }
      );
    });
  });
};

export const cancelTicket = async (query) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) throw err;
      conn.query(
        `UPDATE
          ticket SET
        isCancelled = 1
        WHERE ticketNumber =?;`,
        query.ticketNumber,
        (error, results, fields) => {
          conn.query(
            `UPDATE booking
            INNER JOIN
            (SELECT
              bookedSeatID
            FROM 
              ticket
            WHERE 
              ticketNumber=?
              ) as cancelled
              ON booking.id = cancelled.bookedSeatID
              SET bookedByUserID = NULL
              ;`,
            query.ticketNumber,
            (error, results, fields) => {
              console.log(`Ticket ${query.ticketNumber} Cancelled`);
            }
          );
          conn.release();
          console.log(results);
          if (error) reject(error);
          else if (results.affectedRows === 0) {
            resolve({ error: "not_found" });
          } else {
            resolve(`Ticket ${query.ticketNumber} Cancelled`);
          }
        }
      );
    });
  });
};
