var express = require('express');
var router = express.Router();
//For Database
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var config = require('./db.js')



function queryDatabase(res,connection)
   { console.log('Reading rows from the Table...');

       // Read all rows from table
       var result = [];
     request = new Request(
          "SELECT DISTINCT cast(Date as date) from Transaction_Record",
             function(err, rowCount, rows) 
                {
                    console.log(rowCount + ' row(s) returned');
                    res.send(result);
                }
            );

     request.on('row', function(columns) {
        columns.forEach(function(column) {
          var date = new Date(column.value);
          console.log(column.value);
          result.push(column.value);
         });
             });
     connection.execSql(request);
   }

router.post('/', function(req, res, next) {
 	var obj = {};
 	console.log('Function');
 	var connection = new Connection(config);
 	connection.on('connect', function(err) 
   {
     if (err) 
       {
          console.log('Not-Connected!');
          console.log(err);
       }
    else
       {
       		console.log('Connected');
        	queryDatabase(res,connection);
       }
   }
 );
});



module.exports = router;