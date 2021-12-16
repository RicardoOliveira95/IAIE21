const express = require("express");
const bp = require("body-parser");
const session = require("express-session");
var cors = require('cors');
const bd = require("./config/config.js");
const app = express();
const port = process.env.PORT;
app.use(express.static('./FrontEnd'))
app.use(bp.json())
app.use(bp.urlencoded({extended: true}))
//app.use('/assets', express.static('assets'))
//const dirname='C:/Users/Utilizador/Desktop/UM/PW/m_temp1'
var Moloni=require('moloni');
//GET CSS's and IMG's
//app.use('/FrontEnd/css',express.static('css'));
//app.use('/FrontEnd/static',express.static('static'));

console.log(__dirname)

//CSS...
app.use('/account.css', express.static(__dirname + '/FrontEnd/css/account.css'))
app.use('/bootstrap.min.css', express.static(__dirname + '/FrontEnd/css/bootstrap.min.css'))
app.use('/form.css', express.static(__dirname + '/FrontEnd/css/form.css'))
app.use('/glyphicons-font-awesome-migrate.css', express.static(__dirname + '/FrontEnd/css/glyphicons-font-awesome-migrate.min.css'))
app.use('/portalbasictheme.css', express.static(__dirname + '/FrontEnd/css/portalbasictheme.css'))
app.use('/tbl.css', express.static(__dirname + '/FrontEnd/css/tbl.css'))
app.use('/theme.css', express.static(__dirname + '/FrontEnd/css/theme.css'))
//IMGs
app.use('/About Us.png', express.static(__dirname + '/FrontEnd/static/About Us.png'))
app.use('/Analytics.png', express.static(__dirname + '/FrontEnd/static/Analytics.png'))
app.use('/Diagnose.png', express.static(__dirname + '/FrontEnd/static/Diagnose.png'))
app.use('/Edit.png', express.static(__dirname + '/FrontEnd/static/Edit.png'))
app.use('/Growth.png', express.static(__dirname + '/FrontEnd/static/Growth.png'))
app.use('/Homehero.png', express.static(__dirname + '/FrontEnd/static/Homehero.png'))
app.use('/Logo.png', express.static(__dirname + '/FrontEnd/static/Logo.png'))
app.use('/Product A.png', express.static(__dirname + '/FrontEnd/static/Product A.png'))
app.use('/Product B.png', express.static(__dirname + '/FrontEnd/static/Product B.png'))

var moloni=new Moloni({
	client_id: 'iaiepl7g1',
	client_secret: '7d1bd1209a8d661c1d56c8e52d952f862e4ecc30',
	username: 'jcmoliveirapt@gmail.com',
	password: 'iaiepl7g1',
	sandbox: true
});
//MOLONI FUNCTIONS
moloni.users('getMe', function (error, result) {
	if (error)
		return console.error(error);

	console.log(result);
});

var params = {
	"company_id":"0","vat":"1","number":"45","name":"Ze","language_id":"2","address":"Braga","zip-code":"4710-441","city":"Braga","country_id":"1","email":"ze@mail.pt"
	,"website":"www.site.com","phone":"91999999","fax":"ns","contact_name":"Jose","contact_email":"mail2.com","contact_phone":"253999999","notes":"notas",
	"salesman_id":"1","maturity_date_id":"1","payment_day":"30/12/2021","discount":"10","credit_limit":"100","qty_copies_document":"2",
	"payment_method_id":"1","delivery_method_id":"2","field_notes":"notas de campo"
};

moloni.customers('count', params, function (error, result) {
	if (error)
		return console.error(error);

	console.log(result);
});

/*app.use(cors({
  exposedHeaders: ['Location'],
}));

/*const permittedLinker = ['localhost', '127.0.0.1', 'https://isae21.herokuapp.com/', process.env.IP]; // who can link here?
app.use(function(req, res, next) {
  let i = 0,
    notFound = 1,
    referer = req.get('Referer');
  if ((req.path === '/') || (req.path === '')) {
    res.send('{"message" : "Unauthorized access", "desc": "Your domain is not registered"}');
  } 
  if (referer) {
    while ((i < permittedLinker.length) && notFound) {
      notFound = (referer.indexOf(permittedLinker[i]) === -1);
      i++;
    }
  }
  if (notFound) {
    console.log("notfound");
    res.send('{"message" : "Unauthorized access", "desc": "Your domain is not registered"}');
  }
  else {
    next(); // access is permitted, go to the next step in the ordinary routing
  }
});*/

app.use(session({
	secret: 'pnsbn',
	resave: false,
	saveUninitialized: true,
	cookie:{
		secure: false,
		maxAge: 50000,
		httpOnly: true,
	}
}));

app.use(function(req,res,next){
	if(global.sessData==undefined){
		global.sessData=req.session;
		global.sessData.ID=req.sessionID;
	}else{
		console.log("session exists",global.sessData.ID);
	}
	next()
})

app.get('/', (req, res) => {
	res.sendFile(__dirname+'/FrontEnd/inde.html')
});

app.get('/login',(req,res)=>{
	res.sendFile(__dirname+'/FrontEnd/login.html')
});

app.post('/login1',(req,res)=>{
	var name=req.body.nome
	var password=req.body.pw
	var post=[name,password]

	let sql='SELECT * from tecnico WHERE nome = ? AND password = ?'

	bd.connection.query(sql,post)
});

app.post('/login',(req,res)=>{
	var name=req.body.nome
	var password=req.body.pw
	var post=[name,password]

	let sql='SELECT * from tecnico WHERE nome = ? AND password = ?'

	if(name&&password){
	const techs=bd.connection.query(sql,post,function(error,results,fields){
		if(results.length>0){
			req.session.loggedIn=true;
			console.log("AUTH!",req.session.loggedIn);
			res.sendFile(dirname+'/FrontEnd/tecnicos.html')
		}else{
			res.send('Incorrect name and password.')
		}
		res.end()
		})
	}else{
		res.send('Please enter valid username and password..')
		res.end();
	}
});

app.get('/bilhetes',(req,res)=>{
	res.sendFile(__dirname+'/FrontEnd/bilhetes.html');
});

app.get('/bilhete',(req,res)=>{
	let sql='SELECT * from Bilhete'
	bd.execSQLQuery(sql,res);
});

app.post('/regServico',(req,res)=>{
	console.log("POST",req.body.idTecnico)

	var id=req.body.idTecnico;
	var funcao=req.body.funcao;
	const post={descricao: funcao,idTecnico: id}
	let sql='INSERT INTO serviço SET ?'
	bd.connection.query(sql,post);
	res.status(200).send(req.body)
});

app.post('/bilhete', (req, res) => {
	var name=req.body.name;
	var desc=req.body.desc;
	const post={nome: name,funcao: desc};
	console.log(name,desc)
	let sql1='INSERT INTO tecnico SET ?'
	bd.connection.query(sql1,post);
	res.status(200).send(req.body)
});
//CONTROLLERS
app.get('/evento',(req,res)=>{
	console.log("GET")
	res.sendFile(__dirname+"/FrontEnd/eventos1.html");
});

app.get('/eventos',(req,res)=>{
	let sql='SELECT * from Evento'
	bd.execSQLQuery(sql,res);
});

app.get('/regEvento',(req,res)=>{
	res.sendFile(__dirname+"/FrontEnd/regEventos1.html");
});

app.post('/evento', (req, res) => {
	var data=req.body.data_inicio;
	var desc=req.body.descricao;
	var tipo=req.body.tipo;
	const post={data_inicio: data,tipo: tipo,descricao: desc};
	console.log(data,desc)
	let sql1='INSERT INTO Evento SET ?'
	bd.connection.query(sql1,post);
	res.status(200).send(req.body)
});

app.delete('/evento/:id',(req,res)=>{
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

app.put('/evento/:id',(req,res)=>{
	const idEvento=parseInt(req.params.id);
	var data=req.body.data_inicio;
	var desc=req.body.descricao;
	var tipo=req.body.tipo;
	const update={data_inicio: data,tipo: tipo,descricao: desc,idEvento: idEvento};
	const query=bd.connection.query('UPDATE Evento SET data_inicio=?,tipo=?,descricao=? WHERE idEvento=?',update,function(err,rows,fields){
		console.log(query.sql)

		if(!err){
			console.log("Database updated successfully.")
		}
		else
			console.log(err)
	});
})

app.get('/about',(req,res)=>{
	res.sendFile(__dirname+'/FrontEnd/about.html');
})

app.listen(port, ()=> console.log('Running at port ' + port));
//app.listen(8080);

