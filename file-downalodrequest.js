function downloadFile(bucketName, srcFilename,customerEmail) {
    // [START storage_download_file]
    // Imports the Google Cloud client library
    const Storage = require('@google-cloud/storage');
  
  
    // Instantiates a client
    const storage = Storage();
  
    /*const options = {
      // The path to which the file should be downloaded, e.g. "./file.txt"
      destination: destFilename,
    };*/
  
    // Downloads the file
    storage
      .bucket(bucketName)
      .file(srcFilename)
      .then(() => {
        var smtpTrans = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: 'myemail',
              pass: 'mypass'
            }
          });
          var mailOptions = {
            to: "it@baanbanchi.com",
            from: customerEmail,
            subject: 'Request for File download',
            text: 'Hello,\n\n' +
              ' - This is a request mail for download a file with filename '+ srcFilename+' from my bucket ' + bucketName + '.\n'
          };
          smtpTrans.sendMail(mailOptions, function(err) {
            // req.flash('success', 'Success! Your request has been sent.');
            done(err);
          });
        console.log(
          `gs://${bucketName}/${srcFilename}`
        );
      })
      .catch(err => {
        console.error('ERROR:', err);
      });
    // [END storage_download_file]
  }


