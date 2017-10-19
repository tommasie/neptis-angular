
// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

// Get our API routes
const api = require('./server/routes/api');

const app = express();

app.set('superSecret', 'provaSecret'); // secret variable

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.post('/login', (req,res) => {
  console.log("arrivo");
  if(req.body.email == "prova@prova.it") {
    if(req.body.password == "123") {
      const payload = {
        admin: req.body.email
      };
      var token = jwt.sign(payload, app.get('superSecret'), {
        expiresIn: "24h"// expires in 24 hours
      });
      res.json({
        success: true,
        message: 'Enjoy your token!',
        token: token
      });
    }
  }
});

app.post('/addCityAttraction', (req,res) => {
  let name = req.body.name;
  let latitude = req.body.latitude;
  let longitude = req.body.longitude;
  let radius = req.body.radius;

  console.log(name, latitude, longitude, radius);
});
/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
