const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'db4free.net',
    user: 'isae21',
    password: 'isae2021',
    database: 'isae21'
  });

function execSQLQuery(sqlQry, res){
  
  connection.query(sqlQry, function(error, results, fields){
      if(error){
          console.error(error);
          res.status(500).end();
      }
        //res.json(error);
      else
        res.json(results);
      //connection.end();
      console.log('executou!');
});
}

module.exports={
  execSQLQuery: execSQLQuery,
  connection: connection
}

console.log('executou!');