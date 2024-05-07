import express from "express";
const app = express();

app.use(express.json());

import mysql from "mysql2";

// connecting Database
const connection = mysql.createPool({
  host: "localhost",
  user: "segiuser",
  password: "master2023#",
  database: "corredora",
});

// post request

app.post("/users", async (req, res) => {
  try {
    const { rut, nombres, apellidos, fechanacimiento } = req.body;
    const [{ insertId }] = await connection.promise().query(
      `INSERT INTO persona (rut, nombres, apellidos, fechanacimiento) 
          VALUES (?, ?,?,?)`,
      [rut, nombres, apellidos, fechanacimiento]
    );
    res.status(202).json({
      message: "Persona creada",
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

app.get("/users", async (req, res) => {
  try {
    const data = await connection.promise().query(`SELECT *  from persona;`);
    res.status(200).json({
      users: data[0],
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await connection
      .promise()
      .query(`SELECT *  from persona where rut = ?`, [id]);
    res.status(200).json({
      user: data[0][0],
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

app.patch("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    //no importan en el orden que vengan en el body, importante que se llamen igual
    const { nombres, apellidos, fechanacimiento, rut } = req.body;
    const update = await connection
      .promise()
      .query(
        `UPDATE persona set nombres = ?, apellidos = ?, fechanacimiento = ? where rut = ?`,
        [ nombres, apellidos, fechanacimiento,rut]
      );
    res.status(200).json({
      message: "persona actualizada",
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

app.delete("/user/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const update = await connection
        .promise()
        .query(
          `DELETE FROM persona where rut = ?`,
          [id]
        );
      res.status(200).json({
        message: "persona borrada",
      });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  });

app.listen(5000, () => {
  console.log("Servidor escuchando en http://localhost:5000");
});
