const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, './')));

app.post('/order', (req, res) => {
  const fs = require('fs');
  fs.appendFile('./orders.txt', JSON.stringify(req.body) + '\n', function(err) {
    if (err) {
      res.status(500).send('Server error');
      return console.log(err);
    }
    console.log('Data saved: ' + JSON.stringify(req.body));
    res.send('Data saved');
  });
});

app.post('/subscibe', (req, res) => {
  const fs = require('fs');
  fs.appendFile('./subscibers.txt', JSON.stringify(req.body) + '\n', function(err) {
    if (err) {
      res.status(500).send('Server error');
      return console.log(err);
    }
    console.log('Data saved: ' + JSON.stringify(req.body));
    res.send('Data saved');
  });
});

console.log(
  'Server is running on',
  process.env.PORT || 3000,
  process.env.IP || '0.0.0.0'
);

app.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0');
