var express = require('express');
var router = express.Router();
var Transaction = require('../conection');
var moment = require('moment');



/* GET home page. */
router.get('/', function(req, res, next) {


    //para enviar nada
    //res.render('index', { docs: '' })
  
  	
		getItems().then(function(FoundItems){
			
			res.render("index", {docs:FoundItems, moment: moment});

		});
  


});


async function getItems(){

  const Items = await Transaction.find({});
  return Items;

}

module.exports = router;
