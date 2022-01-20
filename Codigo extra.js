/*
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


 */


 
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

	console.log(result);
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
});*/

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