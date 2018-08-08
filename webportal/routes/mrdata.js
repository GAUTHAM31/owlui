var express = require('express');
var router = express.Router();
//For Blob
const path = require('path');
const args = require('yargs').argv;
const storage = require('azure-storage');

const blobService = storage.createBlobService();
const containerName = 'owl-data';

const list = (mrnumber) => {
    return new Promise((resolve, reject) => {
        blobService.listBlobsSegmentedWithPrefix(containerName,mrnumber, null, (err, data) => {
            if(err) {
              console.log(err);
                reject(err);
            } else {

                resolve({ message: `Items in container '${containerName}':`, data: data });
            }
        });
    });
};

const executeCommand = async (res,mrnumber) => {
    const response = await list(mrnumber);
    var result = [];
    for(var i = 0; i < response.data.entries.length; i++)
    {
      var link = "https://srujana.blob.core.windows.net/owl-data/"+response.data.entries[i].name;
      result.push(link);
    }

    res.send(result);
}


router.post('/', function(req, res, next) {
  executeCommand(res,req.body.number);
});



module.exports = router;