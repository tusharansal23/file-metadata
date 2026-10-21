var express = require('express');
var cors = require('cors');
var multer = require('multer');
require('dotenv').config();

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// Keep the uploaded file in memory. We only need its metadata, so nothing is saved to disk.
var upload = multer({ storage: multer.memoryStorage() });

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// The field name "upfile" must match the name attribute of the file input
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  if (!req.file) {
    return res.json({ error: 'No file uploaded' });
  }

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});