var storageName = "srujana";
var storageKey = "eyGTZvhwqj53SyJpjr9Nmly5i3e7pzYTpDahryXm8EDKG5LXhPLRLPJX4ShbP/1Cb89uxplv4zAk0K51RaqOBw==";
CloudStorageAccount storage = CloudStorageAccount.Parse(String.Format("DefaultEndpointsProtocol=https;AccountName={0};AccountKey={1}", storageName, storageKey));
CloudBlobClient cloudBlobClient = storage.CreateCloudBlobClient();
CloudBlobContainer container = cloudBlobClient.GetContainerReference("pupil-data"); 
CloudBlobDirectory dira = container.GetDirectoryReference("8765/2016/02/11/16_32_44");
List<IListBlobItem> blobs = dira.ListBlobs().ToList();
console.log(blobs);