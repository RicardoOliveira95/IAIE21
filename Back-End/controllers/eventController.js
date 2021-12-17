const app = require('../../ind');
const router = require('express').Router();
const bd = require("../../config/config");
app.app.use('/', router);



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
	  const post = [data, desc, tipo];
	  const sql1 = bd.connection.query('INSERT INTO Evento SET data_inicio = ?, tipo = ?,descricao = ?',post,
	 function(req, res){
		console.log(sql1.sql); 
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
