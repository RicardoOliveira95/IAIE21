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
//FUNCOES DO MOLONI
var params = {
	"company_id":"0","vat":"1","number":"45","name":"Ze","language_id":"2","address":"Braga","zip-code":"4710-441","city":"Braga","country_id":"1","email":"ze@mail.pt"
	,"website":"www.site.com","phone":"91999999","fax":"ns","contact_name":"Jose","contact_email":"mail2.com","contact_phone":"253999999","notes":"notas",
	"salesman_id":"1","maturity_date_id":"1","payment_day":"30/12/2021","discount":"10","credit_limit":"100","qty_copies_document":"2",
	"payment_method_id":"1","delivery_method_id":"2","field_notes":"notas de campo"
};
//receipts
var params2={"company_id":"0","date":"2021-12-20T00:00:00+0000","document_set_id":"478381","costumer_id":"57839336","net_value":"40.00",
"associated_documents":{"associated_id":"453651858","value":"0"},"released_documents_notes":"..",
"payments":{"payment_method_id":"0","date":"2021-12-20T00:00:00+0000","value":"0","notes":".."},"notes":"..","status":"a pagar"};
//invoice
var params3={"company_id":"0","date":"2021-12-20T00:00:00+0000","expiration-date":"2021-12-22T00:00:00+0000","document_set_id":"478381",
"costumer_id":"57839336","alternate_address_id":"0","our_reference":"0","your_reference":"0","financial_discount":"0","salesman_id":"0","salesman_comission":"0",
"deduction_id":"0","special_discount":"0","associated_documents":{"associated_id":"453651858","value":"0"},"released_documents_notes":"..",
"products":{"product_id":"1"}}

var params4={"company_id":"5","date":"2021-12-21T00:00:00+0000","expiration-date":"2021-12-23T00:00:00+0000","costumer_id":"57883331","our_reference":"","your_reference":"",
"financial_discount":"0","salesman_id":"0","salesman_comission":"0","deduction_id":"0","special_discount":"0","associated_documents":{"associated_id":"0","value":"0"},"released_documents_notes":"",
"products":{"product_id":"102278759","name":"Bilhete Concerto Rock","summary":"","qty":"1","price":"50","discount":"0","order":"1","exemption_reason":"","warehouse_id":"0","taxes":{"tax_id":"2375013","value":"23","order":"1",
"cumulative":"0"}},"payments":{"payment_method_id":"1476187","date":"2021-12-21T00:00:00+0000","notes":""},"delivery_method_id":"0","delivery_datetime":"","delivery_departure_adress":"","delivery_departure_city":"",
"delivery_departure_zip_code":"","delivery_departure_country":"0","delivery_destination_adress":"","delivery_destination_city":"","delivery_destination_zip_code":"","delivery_destination_country":"0","vehicle_id":"0",
"notes":"","status":"1"};

var params5={"company_id":"0","category_id":"4644949","type":"1","name":"Bilhete Concerto Jazz","summary":"","reference":"MA_23_","ean":"","price":"20","unit_id":"1824561","has_stock":"0","stock":"0","pos_favorite":"0",
"at_product_category":"","exemption_reason":"1","taxes":{"tax_id":"2375396","value":"2.3","order":"3",
"cumulative":"0"},"suppliers":{"supplier_id":"","cost_price":""},"warehouses":{"warehouse_id":"","stock":""},"warehouse_id":""};

var params6={"company_id":"0","category_id":"4644949","type":"Serviço","name":"Bilhete Concerto Jazz","summary":"","reference":"MA_23_","ean":"","price":"20","unit_id":"1824561","has_stock":"0","stock":"0","pos_favorite":"0",
"at_product_category":"","exemption_reason":"","taxes":{},"suppliers":{},"warehouses":{},"warehouse_id":""};
//SERVICOID->4644949
/*moloni.customers('count', params, function (error, result) {
	if (error)
		return console.error(error);

	console.log(result);
});*/
//CRIAR CATEGORIA
/*var params6={"company_id":"0","parent_id":"0","name":"Servico especial","description":"","pos_enabled":"1"};

moloni.productCategories('insert',params6 ,function (error, result) {
	if (error)
		return console.error(error);

	console.log(result);*/
//ADICIONAR ARTIGO
moloni.products('insert',params5 ,function (error, result) {
	if (error)
		return console.error(error);

	console.log(result);
});

moloni.products('count' , {"category_id":"4644949"} ,function (error, result) {
	if (error)
		return console.error(error);

	console.log(result);
});

/*moloni.receipts('insert', params2, function (error, result) {
	if (error)
		return console.error(error);

	console.log(result);
});*/
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
