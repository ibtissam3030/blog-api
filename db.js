const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Misesionmysql55*",
  database: "blog"
});


connection.connect((error) => {
  if (error) {
    console.log("Error de conexión:", error);
  } else {
    console.log("Conexión a MySQL realizada correctamente");
  }
});

module.exports = connection;