'use strict';
var connection = require('./config');
var companyNames = require('./companynames_config');
const bucketName = null;;
module.exports.getBuckets=function(req,res){
  var email=req.body.email;
  connection.query('SELECT * FROM userlogin WHERE mailid = ?',[email], function (error, results, fields) {
    if (error) {
        res.json({
          status:false,
          message:'there are some error with query'
          })
    }else{
      if(results[0].customername == companyNames.companies){
        bucketName = results[0].customername;
      }    
    }
      
  });
}
  async function openBucket(bucketName) {
    // [START storage_open_bucket]
    // Imports the Google Cloud client library
    const {Storage} = require('@google-cloud/storage');
  
    // Creates a client
    const storage = new Storage({
      projectId: 'baanbanchi1',
     // keyFilename: 'keyfile.json'
    });
  
    // opens the bucket
    await storage.bucket(bucketName).getFiles();
  
    console.log(`Bucket ${bucketName} is opened.`);
    // [END storage_open_bucket]
  }