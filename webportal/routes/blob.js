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
        blobService.listBlobsSegmentedWithPrefix(containerName,'MR01', null, (err, data) => {
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

const executeCommand = async () => {
    const response = await list();

    console.log(response.data);
}

executeCommand();