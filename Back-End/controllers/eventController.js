const app = require('../../ind');
const router = require('express').Router();
const bd = require("../../config/config");
app.app.use('/', router);
const { json } = require('express');
var reference=82;
var nome = "";
var preco_bilhete = 0;
var id_product = 0;
let serviceID=0;

//ADICIONAR CATEGORIA

app.moloni.productCategories('insert', app.category ,function (error, result) {
	if (error)
		return console.error(error);

	serviceID=result.category_id;
	console.log(serviceID);});

function read(req, res) {
    const query = bd.connection.query('SELECT * FROM Evento',
        function (err, rows, fields) {
            console.log(query.sql);
            if(err){
                console.log(err);
            } else{
            	var ref="MA_"+reference+"_";
            	for(row of rows){
            		ref+=1
            		var product={"company_id":"0","category_id":`${serviceID}`,"type":"1","name":`${row.descricao}`,
"summary":`${row.idEvento}`,"reference":`${ref}`,"ean":"","price":`${row.preco}`,"unit_id":"1882336","has_stock":"0",
"stock":"0","pos_favorite":"0","at_product_category":"","exemption_reason":"1",
"taxes":{"tax_id":"2375396","value":"2.3","order":"3","cumulative":"0"},
"suppliers":{"supplier_id":"","cost_price":""},"warehouses":{"warehouse_id":"","stock":""},"warehouse_id":""};
		var nome_ev=""
		var prod_id=0
		app.moloni.products('getByName',{'name':row.descricao},function(error,result){
  if(error)
    return console.error(error);

	if(result.length!=0){
		for(i=0;i<result.length;i++)
			if(result[i].name!=undefined)
				nome_ev=result[i].name;
			
			/*app.moloni.products('delete',{'product_id':result[0].product_id},function(error,result){
				if(error)
					return console.error(error);
		
			//id_product = result.product_id;
			console.log("DELETED",result);
			})*/
	}

  console.log(result);
})
		if(nome_ev!=""){
		app.moloni.products("insert",product,function(error,result){
			if(error)
				return console.error(error);
		
			id_product = result.product_id;
			console.log(result);
		})}
				//console.log("IDEVENTO: ",row.idEvento,", DATA: ",row.data_inicio,", tipo: ",row.tipo,", desc: ",row.descricao,",preco: ",row.preco);

            		console.log(row);
            	}

                    res.send(rows);
            }
        });
};

function post(req, res){
	var id_evt=0;
	var data=req.body.data_inicio;
	var desc=req.body.descricao;
	var tipo=req.body.tipo;
	var preco=req.body.preco;
	var ref="MA_"+reference+"_";
	  const post = [data, desc, tipo, preco];
	  const sql1 = bd.connection.query('INSERT INTO Evento SET data_inicio = ?,descricao = ?,tipo = ?,preco = ?',post,
	  function (err, rows, fields) {
		console.log(sql1.sql);
		if(err){
			console.log(err);
		} else{
			id_evt=rows.insertId;

			//moloni product [POST no MOLONI]
	var product={"company_id":"0","category_id":`${serviceID}`,"type":"1","name":`${desc}`,
"summary":`${id_evt}`,"reference":`${ref}`,"ean":"","price":`${preco}`,"unit_id":"1882336","has_stock":"0",
"stock":"0","pos_favorite":"0","at_product_category":"","exemption_reason":"1",
"taxes":{"tax_id":"2375396","value":"2.3","order":"3","cumulative":"0"},
"suppliers":{"supplier_id":"","cost_price":""},"warehouses":{"warehouse_id":"","stock":""},"warehouse_id":""};

	nome = desc;
    preco_bilhete = preco;

	app.moloni.products("insert",product,function(error,result){
		if(error)
			return console.error(error);
		
		id_product = result.product_id;
		console.log(result);
	})
				res.send(rows);
		}
	}
	)
	  reference+=1;
};
/*
router.delete('/evento/:id',function(req,res){
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

router.put('/evento/:id',function(req,res){
	const idEvento=parseInt(req.params.id);
	const data=req.body.data_inicio;
	const desc=req.body.descricao;
	const tipo=req.body.tipo;
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
*/
module.exports = {
    read: read,
	post: post,
	id_product: id_product,
	nome: nome,
	preco_bilhete: preco_bilhete,
	serviceID: serviceID
}