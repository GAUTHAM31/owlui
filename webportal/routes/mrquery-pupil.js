var express = require('express');
var router = express.Router();
//For Database
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var config = require('./db-pupil.js')



function queryDatabase(res,connection)
   { console.log('Reading rows from the Table...');

       // Read all rows from table
       var result   = [];
     request = new Request(
          "SELECT DISTINCT MRNO,Date,DeviceName,file_blob from Transaction_Record Order by Date DESC",
             function(err, rowCount, rows) 
                {
                    console.log(rowCount + ' row(s) returned');
                    res.send(result);
                }
            );

     request.on('row', function(columns) {
        var row_json = {}
        columns.forEach(function(column) {
          row_json[column.metadata.colName] = column.value;
         });
        result.push(row_json);
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
