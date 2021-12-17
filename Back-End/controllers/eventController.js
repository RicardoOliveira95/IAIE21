const app = require('../../ind');
const router = require('express').Router();
const bd = require("./config/config.js");
app.use('/', router);
/*
app.get('/eventos',(req,res)=>{
	let sql='SELECT * from Evento'
	bd.execSQLQuery(sql,res);
});
*/
function read(req, res) {
    const query = connect.con.query('SELECT * FROM Evento',
        function (err, rows, fields) {
            console.log(query.sql);
            if(err){
                console.log(err);
            } else{
                    res.send(rows);
            }
        });
};

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

module.exports = {
    read: read
}
