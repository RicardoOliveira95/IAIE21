const app = require("../../ind");
const router = require('express').Router();
const bd = require("../../config/config.js");
app.app.use('/',router);
const categoryController = require('../controllers/categoryController');
const clientController = require('../controllers/clientController');
const eventController = require('../controllers/eventController');
const organizationController = require('../controllers/organizationController');
const ticketController = require('../controllers/ticketController');

router.get('/',function (req, res){
	res.sendFile(app.dir+'/FrontEnd/inde.html')
});
/*
router.get('/login',(req,res)=>{
	res.sendFile(app.dir+'/FrontEnd/login.html')
});

router.post('/login1',(req,res)=>{
	var name=req.body.nome
	var password=req.body.pw
	var post=[name,password]

	let sql='SELECT * from tecnico WHERE nome = ? AND password = ?'

	bd.connection.query(sql,post)
});*/

router.get('/evento',function(req,res){
	console.log("GET")
	res.sendFile(app.dir+"/FrontEnd/eventos1.html");
});
//CLIENTS
router.get('/cliente',function(req,res){
	res.sendFile(app.dir+'/FrontEnd/cliente.html');
})

router.get('/clientes',function(req,res){
	let sql='SELECT * from Evento'
	bd.execSQLQuery(sql,res);
})

router.get('/cliente/:id',function(req,res){
	res.sendFile(app.dir+'/FrontEnd/cliente.html')
})

//routes

router.get('/eventos', eventController.read);
router.post('/evento', eventController.post);
router.get('/tickets', ticketController.read);
router.post('/ticket', ticketController.post);

//CONTROLLER DOS EVENTOS(passar pos controllers)


router.get('/regEvento',function(req,res){
	res.sendFile(app.dir+"/FrontEnd/regEventos1.html");
});

router.get('/about',function(req,res){
	res.sendFile(__dirname+'/FrontEnd/about.html');
})

router.delete('/eventos/:id',(req,res)=>{
	const update=parseInt(req.params.id)
	const query=bd.connection.query('DELETE FROM Evento WHERE idEvento=?',update,function(err,rows,fields){
		console.log(query.sql)

		if(!err){
			console.log("Database updated successfully.")
		}
		else
			console.log(err)
	});
	res.end();
})
//Clients
router.get('/cliente',function(req,res){
	res.sendFile(app.dir+'../../FrontEnd/cliente.html');
})

router.get('/clientes',function(req,res){
	let sql='SELECT * from Evento'
	bd.execSQLQuery(sql,res);
})

router.post('/cliente',function(req,res){
	var idCliente=5;
	var nome=req.body.nome;
	var email=req.body.email;
	var nif=req.body.nif;
	var morada=req.body.morada;
	var cod_postal=req.body.cod_postal;
	var pais=req.body.pais;
	var qtd=req.body.qtd;
	
	var costumer = {
	"company_id":"0","vat":`${nif}`,"number":`${idCliente}`,"name":`${nome}`,"language_id":"2","address":`${morada}`,"zip-code":`${cod_postal}`,
	"city":"Braga","country_id":"1","email":"ze@mail.pt","website":"http://www.site.com","phone":"91999999","fax":"ns","contact_name":`#`,
	"contact_email":`${email}`,"contact_phone":"253999999","notes":"notas","salesman_id":"1","maturity_date_id":"1",
	"payment_day":"0","discount":"10","credit_limit":"100","qty_copies_document":"2","payment_method_id":"1",
	"delivery_method_id":"2","field_notes":"notas de campo"}
	console.log(costumer);
	app.moloni.customers('insert',costumer, function (error, result) {
		if (error)
			return console.error(error);

		console.log(result);
	});
});

module.exports=router;
//app.get('/eventos',eventController.read);
