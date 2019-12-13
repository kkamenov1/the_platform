const express = require('express');

const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./routes/adminPage')(app);

const PORT = process.env.PORT || 3001;
app.listen(
  PORT,
  () => console.log(`APP LISTENING ON PORT ${PORT} ; ENV=${process.env.NODE_ENV}`),
);
