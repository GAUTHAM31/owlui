var express = require('express');
var request = require('request');
var router = express.Router();
const path = require('path');
const args = require('yargs').argv;
const storage = require('azure-storage');
var async    = require('async');
var archiver = require('archiver');
var fs = require('fs');

// create a file to stream archive data to.


function zipURLs(urls, res,value) {
	value= value.replace(/\//g,'_');
	var output = fs.createWriteStream(__dirname + '/example.zip');

	var archive = archiver('zip');

	archive.on('error', function(err) {
	res.status(500).send({error: err.message});
	});
	//on stream closed we can end the request
	archive.on('end', function() {
	console.log('Archive wrote %d bytes', archive.pointer());
	});

	//set the archive name
	res.attachment('archive-name.zip');

	//this is the streaming magic
	archive.pipe(res);

	async.eachLimit(urls, 3, function(url, done) {
		var stream = request.get(url);

		stream.on('error', function(err) {
		  return done(err);
		}).on('end', function() {
		  return done();
		});
		folder = url.split('/').slice(9);
		zip_folder = folder.join('/');
		archive.append(stream, { name : zip_folder  });
	});


	archive.finalize();

 }



const blobService = storage.createBlobService();
const containerName = 'owl-data';

/* GET home page. */
const list = (blob_prefix) => {
	console.log(blob_prefix);
    return new Promise((resolve, reject) => {
        blobService.listBlobsSegmentedWithPrefix(containerName,blob_prefix, null, (err, data) => {
            if(err) {
              console.log(err);
                reject(err);
            } else {

                resolve({ message: `Items in container '${containerName}':`, data: data });
            }
        });
    });
};

const executeCommand = async (res,blob_prefix) => {
    const response = await list(blob_prefix);
    var result = [];
    for(var i = 0; i < response.data.entries.length; i++)
    {
      var link = "https://srujana.blob.core.windows.net/owl-data/"+response.data.entries[i].name;
      result.push(link);
    }

    zipURLs(result, res,blob_prefix);
    //res.send(result);
}


router.post('/', function(req, res, next) {
	res.set('Content-Type', 'application/zip');
    res.set('Content-Disposition', 'attachment; filename=test.zip');
  	executeCommand(res,req.body.blob_name);
});


module.exports = router;
