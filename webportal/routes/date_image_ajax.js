var express = require('express');
var router = express.Router();
//For Blob
const path = require('path');
const args = require('yargs').argv;
const storage = require('azure-storage');

const blobService = storage.createBlobService();
const containerName = 'owl-data';

const list = (blob_prefix) => {
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

const executeCommand = async (res,date,mrnumber) => {
    blob_prefix = mrnumber+"/"+date.replace(/-/g,"/")
    const response = await list(blob_prefix);
    var result = [];
    console.log(blob_prefix);
    for(var i = 0; i < response.data.entries.length; i++)
    {
      var link = "https://srujana.blob.core.windows.net/owl-data/"+response.data.entries[i].name;
      result.push(link);
    }
    console.log(result);
    res.send(result);
}


router.post('/', function(req, res, next) {
  executeCommand(res,req.body.date,req.body.number);
});



module.exports = router;