var express = require('express');
var router = express.Router();
//For Blob
const path = require('path');
const args = require('yargs').argv;
const storage = require('azure-storage');

const blobService = storage.createBlobService();
const containerName = 'owl-data';


const list_folder = (blob_prefix) => {
    return new Promise((resolve, reject) => {
        blobService.listBlobDirectoriesSegmentedWithPrefix(containerName,blob_prefix, null, (err, data) => {
            if(err) {
              console.log(err);
                reject(err);
            } else {

                resolve({ message: `Items in container '${containerName}':`, data: data });
            }
        });
    });
};

const list = (blob_prefix) => {
    return new Promise((resolve, reject) => {
        console.log(blob_prefix);
        var options = {'delimiter':'/'};
        blobService.listBlobsSegmentedWithPrefix(containerName,blob_prefix, null, options, (err, data) => {
            if(err) {
              console.log(err);
                reject(err);
            } else {

                resolve({ message: `Items in container '${containerName}':`, data: data });
            }
        });
    });
};

const executeCommand = async (res,date,mrnumber,time) => {
    
    blob_prefix = mrnumber+"/"+date.replace(/-/g,"/")+"/"+time;
    var result = {};
    var row = [];
    //check for os and od
    const response_folder = await list_folder(blob_prefix+"/Images/");
    console.log(blob_prefix);


    for(var i = 0; i < response_folder.data.entries.length; i++){
 
        var folder = response_folder.data.entries[i].name.slice(0, -1).split("/").pop();
        var folder_json ={};
        folder_json['type'] = 'dir';
        folder_json['name'] = folder;
        row.push(folder_json);
    }

    result['images'] = row;

    //check for config 
    var row_json  = {};
    row = [];
    const response = await list(blob_prefix+"/config.txt");
    if (response.data.entries.length) {
        var file = response.data.entries[0].name.split("/").pop();
        if ( file === "config.txt") {
            
            row_json['type'] = 'file';
            row_json['name'] = file;
            row.push(row_json);
        }
    }

    result['others'] = row;

    //check for other files in Images
    row = [];
    const response_other = await list(blob_prefix+"/Images/");
    if (response_other.data.entries.length) {
    for(var i = 0; i < response_other.data.entries.length; i++){

        var file_json = {};
        file_json['type'] = 'file';
        file_json['name'] = response_other.data.entries[i].name.split("/").pop();
        result.images.push(file_json);
    }
    }
 

    res.send(result);
}


router.post('/', function(req, res, next) {
  executeCommand(res,req.body.date,req.body.number,req.body.time);
});



module.exports = router;