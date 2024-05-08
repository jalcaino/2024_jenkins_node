var express = require('express');
var router = express.Router();
var Transaction = require('../conection');
var moment = require('moment');



/* GET home page. */
router.get('/', function(req, res, next) {


		console.log("RUT:" + req.query.rut);

		getPersona(req.query.rut).then(function(FoundItems){
			
			//res.render("detailpersona", {docs:FoundItems, moment: moment});

			console.log(FoundItems);
			res.render("detailpersona", {docs:FoundItems, moment: moment});
		
		
		});


});

async function getPersona(rut){
	
	//const Items = await corredora.findOne({ rut: rut }, 'personas', function (err, build) {});
	
	const Items = await Transaction.findOne({rut: rut});

	//const Items = null;
	return Items;

	
}





module.exports = router;