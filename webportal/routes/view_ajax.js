var express = require('express');
var router = express.Router();
//For Blob
const path = require('path');
const args = require('yargs').argv;
const storage = require('azure-storage');

const blobService = storage.createBlobService();
const containerName = 'pupil-data';


const list = (blob_prefix) => {
    console.log('listing');
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

const executeCommand = async (res,date,mrnumber,dir) => {
    
    blob_prefix = mrnumber+"/"+date.replace(/-/g,"/");
    var result = [];
    const response = await list(blob_prefix);
        for(var i = 0; i < response_folder.data.entries.length; i++)
                {
                  var link = response_folder.data.entries[i].name;
                  result.push(link);
                }
    res.send(result);
}


router.post('/', function(req, res, next) {
  executeCommand(res,req.body.date,req.body.number,req.body.dir);
});



module.exports = router;