const express = require("express");
const bp = require("body-parser");
const session = require("express-session")
const bd = require("./config/config.js");
const app = express();
const port = process.env.PORT;
app.use(express.static('/css'))
app.use(bp.json())
app.use(bp.urlencoded({extended: true}))
//app.use('/assets', express.static('assets'))
//const dirname='C:/Users/Utilizador/Desktop/UM/PW/m_temp1'
var Moloni=require('moloni');
//GET CSS's and IMG's
app.use('/css',express.static('css'));
app.use('/static',express.static('static'));

app.use(cors({
  exposedHeaders: ['Location'],
}));

var moloni=new Moloni({
	client_id: '',
	client_secret: '',
	username: '',
	password= ''
});

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
	res.sendFile(__dirname+'/inde.html')
});

app.get('/login',(req,res)=>{
	res.sendFile(__dirname+'/login.html')
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
			res.sendFile(dirname+'/tecnicos.html')
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
	res.sendFile(__dirname+'/bilhetes.html');
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
	res.sendFile(__dirname+"/eventos1.html");
});

app.get('/eventos',(req,res)=>{
	let sql='SELECT * from Evento'
	bd.execSQLQuery(sql,res);
});

app.get('/regEvento',(req,res)=>{
	res.sendFile(__dirname+"/regEventos1.html");
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
	res.sendFile(__dirname+'/about.html');
})

app.listen(port, ()=> console.log('Running at port ' + port));
//app.listen(8080);
