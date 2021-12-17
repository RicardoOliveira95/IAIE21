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
const dir=__dirname;
console.log(__dirname)



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8080");
    res.header("Access-Control-Allow-Headers", "append,delete,entries,foreach,get,has,keys,set,values,Authorization, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });

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

/*
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
*/

//app.listen(port, ()=> console.log('Running at port ' + port));
app.listen(8080);
module.exports = {app:app,dir:dir};
const routes = require("./Back-End/routes/routes")
