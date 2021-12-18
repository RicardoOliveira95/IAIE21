const app = require('../../ind');
const { json } = require('express');
const router = require('express').Router();
const bd = require("../../config/config");
app.app.use('/', router);


function read(req, res) {
    const query = bd.connection.query('SELECT * FROM Bilhete',
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
	
	var idEvento=req.body.idEvento;
    var nome=req.body.nome;
    var email=req.body.email;
    var morada=req.body.morada
    var nif=req.body.nif;
	  const post = [idEvento,nome,email,morada,nif];
	  const sql1 = bd.connection.query('INSERT INTO Bilhete  SET idEvento = ?,nome = ?,email = ?,morada = ?,nif = ?',post,
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


module.exports = {
    read: read,
	post: post
}