# Image-S3-ExpressJS
Upload file S3 AWS - Amazon Web Services

# Instalasi

Pertama - tama install AWS SDK untuk S3 dengan cara : 

> npm i aws-sdk

Lalu install Busboy body parser 

Body Parser untuk formulir multipart / formulir-data dalam Express. Ini akan menambahkan kolom reguler ke req.body sesuai dengan parser-body tetapi juga akan menambahkan file yang diunggah ke req.files.

> npm i busboy-body-parser

# Konfigurasi

Buat html untuk upload gambar ke S3

```
 <form action="/upload-image" method="POST" enctype="multipart/form-data"> 
    <input type='file' name="avatar" accept="image/*" id="imgInp" required />  
    <button class="button"><i class="fa fa-lock"></i> Upload Image</button>
</form>

```
Pada form jangan lupa untuk menambahkan
> enctype="multipart/form-data"

Setelah selesai membuat html untuk form. 

buat konfigurasi untuk busboy pada app.js.
Agar dapat membaca req.files.avatar pada input file yang dikirimkan melalui form.

```
const busboyBodyParser = require('busboy-body-parser');

var app = express();
app.use(busboyBodyParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

```

> const busboyBodyParser = require('busboy-body-parser');

> app.use(busboyBodyParser());


Tambahkan fungsi berikut kedalam folder routes > index.js.

```
const AWS = require('aws-sdk')

const BUCKET_NAME = 'bucket_name'
const IAM_USER_KEY = 'IAM KEY'
const IAM_USER_SECRET = 'SECRET KEY'
const REGION = 'REGION'

```

Lalu Tambahkan fungsi untuk mengirim gambar ke S3 pada folder routes > index.js. 

```
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

```

> Key: 'avatars/' + Date.now() + ".jpg",

Avatars sebagai nama folder didalam bucket S3. jadi di sesuaikan dengan bucket anda.
Date.now sebagai unique name agar tidak terjadi kesamaan nama pada gambar.

> Body: req.files.avatar.data,

Body sebagai badan dari file yang ingin dikirimkan ke S3. 
req.files.avatar.data = avatar adalah nama dari input name html dan .data sebagai data file yang akan dikirimkan ke S3

Jika ingin mengambil url dari gambar yang sudah dikirmkan ke S3. 

Hanya perlu memanggil fungsi 

> data.Location


Selamat Mencoba 
