const express = require("express");
const bp = require("body-parser");
const session = require("express-session");
var cors = require('cors');
var request = require('request');
const bd = require("./config/config.js");
const app = express();
const router = express.Router();
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
var id=0;

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

// access token
/*router.post('/getToken', function(req, res) {
  var options = {
    'method': 'POST',
    'url': "https://identity.primaverabss.com/core/connect/token",
    'headers': {
      'Content-Type': ['application/x-www-form-urlencoded', 'application/x-www-form-urlencoded'],
      'Authorization': 'Basic SVNJRk9PRDo2MWMyNzUyYS1kNjIxLTQ1ZWYtODUxOC01YjQxOGI5ZDViYjc='
    },
    form: {
      'client_id': "IAIEPL7G1",
      'client_secret': "24661ff6-09f8-4cf8-b3ba-7d94154e126a",
      'grant_type': 'client_credentials',
      'scope': 'application'
    }
  };
  request(options, function(error, response) {
    if (error) {
      throw new Error(error);
      console.log(response.body)
    }
    else {
      let result = JSON.parse(response.body);
      saveTokens(result.access_token);
      console.log("jasmin auth ok");
    }
  });
});*/

var moloni=new Moloni({
	client_id: 'pl7g1iaie',
	client_secret: 'd3d0d84848b8d4c3d160344361506f37acb29aea',
	username: 'a72349@alunos.uminho.pt',
	password: 'iaiepl7g1',
	sandbox: true
});
//MOLONI FUNCTIONS
moloni.users('getMe', function (error, result) {
	if (error)
		return console.error(error);

	console.log(result);
});

//Tirar o ultimo id;
function getLastNumber(){
	moloni.customers('getLastNumber', function (error, result) {
		if (error)
			return console.error(error);

		id=parseInt(result.number)+1;
		console.log("IDCLIENTE: ",id);
	});
	return id;
}
var idCli=getLastNumber();
console.log("IDCliente7: ",idCli);

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

var category={"company_id":"0","parent_id":"0","name":"Servicos","description":"servicos","pos_enabled":""};

var invoice={
    'company_id': '0',
    'date': '2023-12-23T00:00:00+0000',
    'expiration_date': '2024-12-25T00:00:00+0000',
    'document_set_id': '501359',
    'customer_id': '59860969',
    'our_reference': 'Nossa referência',
    'your_reference': 'Referência Cliente',
    'financial_discount': '10',
    'salesman_id': '0',
    'salesman_commision': '0',
    'deduction_id':'0',
    'special_discount': '0',
    'associated_documents[0][associated_id]':'454439554',
    'associated_documents[0][value]':'20',
    'related_documents_notes':'',
    'products[0][product_id]': '108087819',
    'products[0][name]': 'Bilhete Concerto Jazz',
    'products[0][summary]': '',
    'products[0][qty]': '1',
    'products[0][price]': '20',
    'products[0][discount]': '0',
    'products[0][order]': '1',
    'products[0][exemption_reason]':'M01',
    'products[0][warehouse_id]': '0',
    'products[0][taxes][0][tax_id]': '2376294',
    'products[0][taxes][0][value]': '23',
    'products[0][taxes][0][order]': '1',
    'products[0][taxes][0][cumulative]': '0',
    'payments[0][payment_method_id]':'1476187',
    'payments[0][date]':'',
    'payments[0][value]':'15',
    'payments[0][notes]':'',
    'delivery_method_id': '1512402',
    'delivery_datetime': '2021-12-25',
    'delivery_departure_address': '4700-001',
    'delivery_departure_city': 'Braga',
    'delivery_departure_zip_code': '0',
    'delivery_departure_country': '1',
    'delivery_destination_address': '4200-440',
    'delivery_destination_city': 'Lisboa',
    'delivery_destination_zip_code': '1000-100',
    'delivery_destination_country': '1',
    'vehicle_id':'0',
    'notes': 'Notas',
    'status': '1'
 };

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


moloni.invoices('insert',invoice ,function (error, result) {
	if (error)
		return console.error(error);

	console.log(result);
});

//app.listen(port, ()=> console.log('Running at port ' + port));
app.listen(8080);
module.exports = {app:app,dir:dir,moloni:moloni,category:category,idCli:idCli};
const routes = require("./Back-End/routes/routes")
