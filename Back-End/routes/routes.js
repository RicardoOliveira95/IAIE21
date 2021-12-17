const app = require("../../ind");
const router = require('express').Router();
const bd = require("../../config/config.js");
app.app.use('/',router);
/*const categoryController = require('../controllers/categoryController');
const clientController = require('../controllers/clientController');
const eventController = require('../controllers/eventController');
const organizationController = require('../controllers/organizationController');
const ticketController = require('../controllers/ticketController');*/

router.get('/', (req, res) => {
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

router.get('/evento',(req,res)=>{
	console.log("GET")
	res.sendFile(app.dir+"/FrontEnd/eventos1.html");
});
//CONTROLLER DOS EVENTOS(passar pos controllers)
router.get('/eventos',(req,res)=>{
	let sql='SELECT * from Evento'
	bd.execSQLQuery(sql,res);
});

router.get('/regEvento',(req,res)=>{
	res.sendFile(app.dir+"/FrontEnd/regEventos1.html");
});

app.get('/about',(req,res)=>{
	res.sendFile(__dirname+'/FrontEnd/about.html');
})

module.exports=router;
//app.get('/eventos',eventController.read);
