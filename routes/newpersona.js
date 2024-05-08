var express = require('express');
var router = express.Router();
var corredora = require('../conection');
const dayjs = require('dayjs')



router.route('/')
  .get((req, res) => {
         res.render('newpersona', {});
  })
  .post((req, res) => {
	  
		let vRut = req.body.rut; 
		let vNombres = req.body.nombres; 
		let vApellidos = req.body.apellidos;
		let vFechanacimiento_1 = req.body.fechanacimiento;
		  
	  	  
	  //formateamos la fecha antes de enviarla desde dfatepicker
		let fecha_recuperada_2 = new Date(vFechanacimiento_1);
		console.log('FECHA ANTES DE GRABAR SIN FORMATO: ' + fecha_recuperada_2);
		fecha_recuperada_2.setMinutes(fecha_recuperada_2.getMinutes() + fecha_recuperada_2.getTimezoneOffset());
		let fecha_formateada_2 = dayjs(fecha_recuperada_2).format("DD-MM-YYYY");
		console.log('FECHA ANTES DE GRABAR FORMATEADA :' + fecha_formateada_2);
		let vFechanacimiento = fecha_formateada_2;
	    
	  
		console.log("antes de grabar!");
		
	 
	  	var t = new corredora({ 
			rut: vRut, 
			nombres: vNombres, 
			apellidos: vApellidos, 
			fechanacimiento: vFechanacimiento, 
		}); 

	  
	  
		// Saving the transaction in the database. 
		t.save(); 
		
	  
	  	console.log("después grabar!");
	  	//return res.status(200).json(user);
	  

		// Sending response that we have saved the data 
	  //res.send("Datos grabados"); 
	  res.redirect('/');
	  

  })
  .put((req, res) => {
    res.send('Update the book')
  })



/*

ESTABA ASI ANTES, el GET funcionaba, cuando agregué el POST se caia
la solución : lode arriba

router.get('/', function(req, res, next) {

     res.render('newpersona', {});

});


router.post("/", function (req, res) { 

	let vRut = req.body.rut; 
	let vNombres = req.body.nombres; 
	let vApellidos = req.body.apellidos;
	let vFechanacimiento = req.body.fechanacimiento;
	
	console.log("Connected!");
	var sql = "INSERT INTO persona (rut,nombres,apellidos,fechanacimiento) VALUES ('"+vRut+"','"+vNombres+"','"+vApellidos+"','"+vFechanacimiento+"')";
	pool.query(sql, function (err, result) {
		if (err) throw err;
		console.log("1 registro insertado");
	});

	// Sending response that we have saved the data 
	res.send("Datos grabados"); 
}); 

*/



/////////////////BLOQUE FUNCIONES UTILES///////////////
/////////////////BLOQUE FUNCIONES UTILES///////////////
/////////////////BLOQUE FUNCIONES UTILES///////////////


// Function to get the current date 
function getDate() { 

	// Creating new date object 
	var date = new Date(); 

	// Converting date to string 
	date = date.toString(); 

	// Returning the date 
	return date.substring(0, 10); 
} 

// Function to get the current time 
function getTime() { 
	var today = new Date(); 
	return today.getHours() + ":"
		+ today.getMinutes() 
		+ ":" + today.getSeconds(); 
}



module.exports = router;