console.log("here")
const bp = require("body-parser");
const app = express();
const categoryController = require('../controllers/categoryController');
const clientController = require('../controllers/clientController');
const eventController = require('../controllers/eventController');
const organizationController = require('../controllers/organizationController');
const ticketController = require('../controllers/ticketController');

app.get('/', (req, res) => {
	res.sendFile(__dirname+'/FrontEnd/inde.html')
});
/*
app.get('/login',(req,res)=>{
	res.sendFile(__dirname+'/FrontEnd/login.html')
});

app.post('/login1',(req,res)=>{
	var name=req.body.nome
	var password=req.body.pw
	var post=[name,password]

	let sql='SELECT * from tecnico WHERE nome = ? AND password = ?'

	bd.connection.query(sql,post)
});*/

app.get('/evento',(req,res)=>{
	console.log("GET")
	res.sendFile(__dirname+"/FrontEnd/eventos1.html");
});

app.get('/regEvento',(req,res)=>{
	res.sendFile(__dirname+"/FrontEnd/regEventos1.html");
});

app.get('/about',(req,res)=>{
	res.sendFile(__dirname+'/FrontEnd/about.html');
})


app.get('/eventos',eventController.read);