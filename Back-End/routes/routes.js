const app = require("../../ind");
const router = require('express').Router();
const bd = require("../../config/config.js");
app.app.use('/',router);
const eventController = require('../controllers/eventController');
const ticketController = require('../controllers/ticketController');
var idCliente=app.idCli+29;  //ID DO MOLONI
var logged=true;
var id_evento=0;
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
	const update=parseInt(req.params.id)
	idEvento=update;
	//console.log("IDEVT: ",idEvento);
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

router.get('/eventos/:id?', function(req, res){
	const update=parseInt(req.params.id)
	idEvento=update;
	const query=bd.connection.query('SELECT * FROM Evento WHERE idEvento=?',update,function(err,rows,fields){
		console.log(query.sql)

		if(err){
			console.log(err)
		}
		else
			res.send(rows)
	});
	//res.end();
})
    

router.delete('/eventos/:id',(req,res)=>{
	const update=parseInt(req.params.id)
	idEvento=update;
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
	var nome_evt=req.body.nome_evt;
	//console.log("ID-evt: ",parseInt(req.params.id));

	/*app.moloni.customers('getLastNumber', function (error, result) {
		if (error)
			return console.error(error);

		idCliente=parseInt(result.number)+1;
		console.log("IDCliente: ",idCliente);
	});*/
	//Tirar o ultimo id
	console.log("IDCLIENTE: ",idCliente);
	console.log("Nome evento: ",nome_evt);

	var costumer = {
	"company_id":"0","vat":`${nif}`,"number":`${idCliente}`,"name":`${nome}`,"language_id":"2","address":`${morada}`,"zip-code":`${cod_postal}`,
	"city":`${cidade}`,"country_id":"1","email":`${email}`,"website":"http://www.site.com","phone":`${telefone}`,"fax":"ns","contact_name":`#`,
	"contact_email":`${email}`,"contact_phone":`${telefone}`,"notes":"notas","salesman_id":"1","maturity_date_id":"1",
	"payment_day":"0","discount":"10","credit_limit":"100","qty_copies_document":"2","payment_method_id":"1",
	"delivery_method_id":"2","field_notes":"notas de campo"}
	console.log(costumer);

	app.moloni.customers('getByVat',{"vat":`${nif}`},function(error,result){
  if (error)
    return console.error(error);
  
  console.log("VAT GET: ",result[0].customer_id);
  if(result.length>0){
  app.moloni.customers('update',{"customer_id":result[0].customer_id},function(error,result){
    if (error)
      return console.error(error);

  idCliente=result.customer_id;
  console.log("::::::::::CUSTOMER->",idCliente)
  app.moloni.products('getByName',{'name':nome_evt},function(error,result){
		if(error)
			console.log(error)
		else{
			console.log(result);
			var prod_id=result[0].product_id;
			console.log("ID do produto: ",prod_id)

			var invoice={
        'company_id': '0',
        'date': '2027-12-24',
        'expiration_date': '2027-12-25T00:00:00+0000',
        'document_set_id': '504207',
        'customer_id': `${idCliente}`,
        'our_reference': "",
        'your_reference': "",
        'financial_discount': '10',
        'salesman_id': '0',
        'salesman_commision': '0',
        'deduction_id':'0',
        'special_discount': '0',
        'associated_documents[0][associated_id]':'0',
        'associated_documents[0][value]':'0',
        'related_documents_notes':'',
        'products[0][product_id]': `${result[0].product_id}`,
        'products[0][name]': `${nome_evt}`,
        'products[0][summary]': '',
        'products[0][qty]': '1',
        'products[0][price]': `${result[0].price}`,
        'products[0][unit_id]': '1882336',
        'products[0][discount]': '0',
        'products[0][order]': '1',
        'products[0][exemption_reason]':'M01',
        'products[0][warehouse_id]': '0',
        'products[0][taxes][0][tax_id]': '2405778',
        'products[0][taxes][0][value]': '23',
        'products[0][taxes][0][order]': '1',
        'products[0][taxes][0][cumulative]': '0',
        'payments[0][payment_method_id]':'1476187',
        'payments[0][date]':'',
        'payments[0][value]':'15',
        'payments[0][notes]':'',
        'delivery_method_id': '1512402',
        'delivery_datetime': '2027-12-25',
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

		app.moloni.invoices('insert',invoice,function(error,result){
		console.log("Cheguei");
        if (error)
          return console.error(error);
      	
      	//console.log("ID: ",idEvento)
		console.log(result);
		  //LINK DA FACTURA
		  app.moloni.documents('getPDFLink',{"document_id":result.document_id},function(error,result){
  if (error)
    return console.error(error);

  //console.log(result.url);  //LINK DA FACTURA
  res.redirect(result.url);
});
      });
		}
	})

    console.log("UPDATE: ",result);
  })
}else{
	app.moloni.customers('insert',costumer, function (error, result) {
		if (error)
			return console.error(error);

		idCliente = result.customer_id;
        console.log(result.customer_id,idCliente)
		console.log(result);

		app.moloni.products('getByName',{'name':nome_evt},function(error,result){
		if(error)
			console.log(error)
		else{
			console.log(result);
			var prod_id=result[0].product_id;
			console.log("ID do produto: ",prod_id)

			var invoice={
        'company_id': '0',
        'date': '2027-12-24',
        'expiration_date': '2027-12-27T00:00:00+0000',
        'document_set_id': '504207',
        'customer_id': `${idCliente}`,
        'our_reference': "",
        'your_reference': "",
        'financial_discount': '10',
        'salesman_id': '0',
        'salesman_commision': '0',
        'deduction_id':'0',
        'special_discount': '0',
        'associated_documents[0][associated_id]':'0',
        'associated_documents[0][value]':'0',
        'related_documents_notes':'',
        'products[0][product_id]': `${result[0].product_id}`,
        'products[0][name]': `${nome_evt}`,
        'products[0][summary]': '',
        'products[0][qty]': '1',
        'products[0][price]': `${result[0].price}`,
        'products[0][unit_id]': '1882336',
        'products[0][discount]': '0',
        'products[0][order]': '1',
        'products[0][exemption_reason]':'M01',
        'products[0][warehouse_id]': '0',
        'products[0][taxes][0][tax_id]': '2405778',
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

		app.moloni.invoices('insert',invoice,function(error,result){
		console.log("Cheguei");
        if (error)
          return console.error(error);
      	
      	//console.log("ID: ",idEvento)
		console.log(result.document_id);
		//GERAR LINK DO PDF
app.moloni.documents('getPDFLink',{"document_id":result.document_id},function(error,result){
  if (error)
    return console.error(error);

  console.log(result.url);  //LINK DA FACTURA
  res.redirect(result.url);
});
		  //LINK DA FACTURA
      });
		}
	})
	});
}

})
	//idCliente+=1;
	 //var id_cliente = 0;
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

router.get('/eventos1',function(req,res){
	app.moloni.products('getAll',{'category_id':'4773567'},function(error,result){
		if (error)
			return console.error(error);
		console.log(result);
	})
});

module.exports=router;
//app.get('/eventos',eventController.read);
