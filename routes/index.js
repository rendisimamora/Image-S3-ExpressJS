var express = require('express');
var router = express.Router();
const AWS = require('aws-sdk')

const BUCKET_NAME = 'lunadorii-dev'
const IAM_USER_KEY = 'AKIAIDZ3JEHIHGIIFKDA'
const IAM_USER_SECRET = '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'
const REGION = 'ap-southeast-1'

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
       if (err) {
        console.log('error in callback');
        console.log(err);
       }else{
         console.log(data)
       }
      });
    })
})

module.exports = router;
