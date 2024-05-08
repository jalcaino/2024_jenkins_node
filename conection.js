
const mongoose = require("mongoose"); 

//nos conectamos a BD CORREDORA

try {
        mongoose.connect("mongodb://127.0.0.1/corredora", {});
        console.log("CONECTADO A LA BD SATISFACTYORIAMENTE");
     } catch (error) {
        console.error('NO SE PUDO CONECTAR A LA BASE DE DATOS:', error.message);
	}
	


//TIPOS DE DATOS MONGO
//   `String` - Cadenas de caracteres.
//   `Integer` - Números enteros.
//   `Double` - Números con decimales.
//   `Boolean` - Booleanos verdaderos o falsos.
//   `Date` - Fechas.
//   `Timestamp` - Estampillas de tiempo.
//   `Null` - Valor nulo.
//   `Array` - Arreglos de otros tipos de dato.
//   `Object` - Otros documentos embebidos.
//   `ObjectID` - Identificadores únicos creados por MongoDB al crear documentos sin especificar valores para el campo `_id`.
//   `Data Binaria` - Punteros a archivos binarios.
//   `Javascript` - código y funciones Javascript.



//Eschema de la tabla persona
const transactionSchema = new mongoose.Schema({ 
	rut: String, 
	nombres: String, 
	apellidos: String, 
	fechanacimiento: Date, 
});


//Asociamos el schema anterior a la tabla persona
const Transaction = mongoose.model("personas", transactionSchema);


//VERSION PARA MYSQL
// var mysql = require('mysql2')
// var connection = mysql.createConnection({
// 	host: "localhost",
// 	user: "segiuser",
// 	password: "master2023#",
//   database: "corredora",
//   dateStrings: true   

// })
// connection.connect((err) => {
//   if (err) {
//     console.log(err)
//     return
//   }
//   console.log('Database connected')
// })



module.exports = Transaction;