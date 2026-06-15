const express = require("express");
const db = require("./db");

const app = express();

app.use(express.json());

/* =========================
   AUTORES
========================= */

// Obtener todos los autores
app.get("/api/autores", (req, res) => {

  db.query("SELECT * FROM autores", (error, resultados) => {

    if (error) {
      return res.status(500).json(error);
    }

    res.json(resultados);

  });

});

// Crear un autor
app.post("/api/autores", (req, res) => {

  const { nombre, email, imagen } = req.body;

  const sql =
    "INSERT INTO autores (nombre, email, imagen) VALUES (?, ?, ?)";

  db.query(sql, [nombre, email, imagen], (error, resultado) => {

    if (error) {
      return res.status(500).json(error);
    }

    res.json({
      mensaje: "Autor creado correctamente",
      id: resultado.insertId
    });

  });

});


/* =========================
   POSTS
========================= */

// Obtener todos los posts con los datos del autor
app.get("/api/posts", (req, res) => {

  const sql = `
    SELECT
      posts.id,
      posts.titulo,
      posts.descripcion,
      posts.fecha_creacion,
      posts.categoria,
      autores.id AS autor_id,
      autores.nombre,
      autores.email,
      autores.imagen
    FROM posts
    JOIN autores
      ON posts.autor_id = autores.id
  `;

  db.query(sql, (error, resultados) => {

    if (error) {
      return res.status(500).json(error);
    }

    res.json(resultados);

  });

});


// Crear un post
app.post("/api/posts", (req, res) => {

  const {
    titulo,
    descripcion,
    fecha_creacion,
    categoria,
    autor_id
  } = req.body;

  const sql = `
    INSERT INTO posts
    (titulo, descripcion, fecha_creacion, categoria, autor_id)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      titulo,
      descripcion,
      fecha_creacion,
      categoria,
      autor_id
    ],
    (error, resultado) => {

      if (error) {
        return res.status(500).json(error);
      }

      res.json({
        mensaje: "Post creado correctamente",
        id: resultado.insertId
      });

    }
  );

});


// Obtener los posts de un autor concreto
app.get("/api/autores/:id/posts", (req, res) => {

  const id = req.params.id;

  const sql = `
    SELECT *
    FROM posts
    WHERE autor_id = ?
  `;

  db.query(sql, [id], (error, resultados) => {

    if (error) {
      return res.status(500).json(error);
    }

    res.json(resultados);

  });

});


app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente");
});


app.listen(3000, () => {
  console.log("Servidor iniciado en http://localhost:3000");
});