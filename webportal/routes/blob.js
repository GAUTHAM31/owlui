if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}
const path = require('path');
const args = require('yargs').argv;
const storage = require('azure-storage');

const blobService = storage.createBlobService();
const containerName = 'owl-data';

const list = () => {
    return new Promise((resolve, reject) => {
        blobService.listBlobsSegmentedWithPrefix(containerName,'MR01/2018/', null, (err, data) => {
            if(err) {
            	console.log(err);
                reject(err);
            } else {
            	console.log('Connected');
                resolve({ message: `Items in container '${containerName}':`, data: data });
            }
        });
    });
};

const download = () => {
    const dowloadFilePath = './download.jpg'
    var blobName = 'MR01/2018/7/30/13_4_20/Images/OS/1.jpg'
    return new Promise((resolve, reject) => {
        blobService.getBlobToLocalFile(containerName, blobName, dowloadFilePath, err => {
            if(err) {
                reject(err);
            } else {
                resolve({ message: `Download of '${blobName}' complete` });
            }
        });
    });
};
const executeCommand = async () => {
    const response = await list();

    console.log(response.data.entries);
}

executeCommand();