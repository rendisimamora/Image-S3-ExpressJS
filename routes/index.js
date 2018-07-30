var express = require('express');
var router = express.Router();
const AWS = require('aws-sdk')

const BUCKET_NAME = 'BUCKET_NAME'
const IAM_USER_KEY = 'IAM_USER_KEY'
const IAM_USER_SECRET = 'IAM_USER_SECRET'
const REGION = 'REGION'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload-image', function(req, res, next){
    let s3bucket = new AWS.S3({
      accessKeyId: IAM_USER_KEY,
      secretAccessKey: IAM_USER_SECRET,
      Bucket: BUCKET_NAME
    });
    s3bucket.createBucket(function () {
      var params = {
        Bucket: BUCKET_NAME,
        Region: REGION,
        Key: 'avatars/' + Date.now() + ".jpg",
        Body: req.files.avatar.data,        
        ACL: 'public-read'
      };
      s3bucket.upload(params, function (err, data) {
       console.log(data)
       console.log(data.Location)
      });
    })
})

module.exports = router;
