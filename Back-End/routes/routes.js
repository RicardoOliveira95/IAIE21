const app = require("../../ind");
const router = require('express').Router();
const bd = require("../../config/config.js");
app.app.use('/',router);
const eventController = require('../controllers/eventController');
const ticketController = require('../controllers/ticketController');
var idCliente=app.idCli+1;  //ID DO MOLONI
var logged=true;
//meter false para fazer o login (user->admin,pw->12345)

router.get('/',function (req, res){
	console.log("IDCliente: ",idCliente);
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
	if(req.session.loggedIn||logged){
		console.log("REGISTAR EVENTO PAGE");
	res.sendFile(app.dir+"/FrontEnd/regEventos1.html");}
	else{res.sendFile(app.dir+'/FrontEnd/login.html');}
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
	var nome=req.body.nome;
	var email=req.body.email;
	var nif=req.body.nif;
	var morada=req.body.morada;
	var cod_postal=req.body.cod_postal;
	var pais=req.body.pais;
	var qtd=req.body.qtd;
	var telefone=req.body.telefone;
	var cidade=req.body.cidade;

	app.moloni.customers('getLastNumber', function (error, result) {
		if (error)
			return console.error(error);

		idCliente=parseInt(result.number)+1;
		console.log("IDCliente: ",idCliente);
	});
	//Tirar o ultimo id
	console.log("IDCLIENTE: ",idCliente);
	var costumer = {
	"company_id":"0","vat":`${nif}`,"number":`${idCliente}`,"name":`${nome}`,"language_id":"2","address":`${morada}`,"zip-code":`${cod_postal}`,
	"city":`${cidade}`,"country_id":"1","email":`${email}`,"website":"http://www.site.com","phone":`${telefone}`,"fax":"ns","contact_name":`#`,
	"contact_email":`${email}`,"contact_phone":`${telefone}`,"notes":"notas","salesman_id":"1","maturity_date_id":"1",
	"payment_day":"0","discount":"10","credit_limit":"100","qty_copies_document":"2","payment_method_id":"1",
	"delivery_method_id":"2","field_notes":"notas de campo"}
	console.log(costumer);
	app.moloni.customers('insert',costumer, function (error, result) {
		if (error)
			return console.error(error);

		console.log(result);
	});
	idCliente+=1;
});
//LOGINS
router.post('/sign-up',function(req,res){
    if(req.method=="POST"){
        var post = req.body;
        var name = post.username;
        var pass = post.password;
        var salt = 10;
        
        let hash = bcrypt.hashSync(pass,salt);
        
        var query = bd.connection.query('INSERT INTO Admin (username, password) VALUES (?, ?)',[name,hash],function(err,result){
            var message = "Your account was successfully created!";
            console.log(hash);
            res.send(message);
        });
    }else{
        res.sendFile('signup');
    }
});

router.post('/auth',function(req,res){
    console.log("HERE")
	var username = req.body.username;
	var password = parseInt(req.body.password);
	console.log(req.body);
	if(username&&password){
		bd.connection.query('SELECT * FROM Admin WHERE Nome = ? AND Password = ?', [username, password], function(error,results,fields){
			if(results.length>0){
				req.session.loggedIn=true;
				logged=true;
				req.session.user=username;
				console.log(username+password," logged in!");
				res.redirect('/');
			} else{
				res.send('Incorrect username or password!');
			}
			res.end();
		});
	}else{
		res.send('Please enter username and password!');
		res.end();
	}
});

router.post('logout',function(req, res, err) {
    req.session.destroy(function(err){
        if(err){
            console.log(err);
        }
        logged=false;
        res.send("LOGOUT");
    });
});

module.exports=router;
//app.get('/eventos',eventController.read);
