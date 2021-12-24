const app = require('../../ind');
const router = require('express').Router();
const bd = require("../../config/config");
app.app.use('/', router);
const { json } = require('express');



function read(req, res) {
    const query = bd.connection.query('SELECT * FROM Evento',
        function (err, rows, fields) {
            console.log(query.sql);
            if(err){
                console.log(err);
            } else{
                    res.send(rows);
            }
        });
};

function post(req, res){
	
	var data=req.body.data_inicio;
	var desc=req.body.descricao;
	var tipo=req.body.tipo;
	var preco=req.body.preco;
	//moloni product [POST no MOLONI]
	var product={"company_id":"0","category_id":"4655137","type":"1","name":`${desc}`,
"summary":"","reference":"MA_26_","ean":"","price":`${preco}`,"unit_id":"1824561","has_stock":"0",
"stock":"0","pos_favorite":"0","at_product_category":"","exemption_reason":"1",
"taxes":{"tax_id":"2375396","value":"2.3","order":"3","cumulative":"0"},
"suppliers":{"supplier_id":"","cost_price":""},"warehouses":{"warehouse_id":"","stock":""},"warehouse_id":""};

	app.moloni.products("insert",product,function(error,result){
		if(error)
			return console.error(error);
		
		console.log(result);
	})
	
	  const post = [data, desc, tipo, preco];
	  const sql1 = bd.connection.query('INSERT INTO Evento SET data_inicio = ?,descricao = ?,tipo = ?',post,
	  function (err, rows, fields) {
		console.log(sql1.sql);
		if(err){
			console.log(err);
		} else{
				res.send(rows);
		}
	}
	)
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
	post: post
}
