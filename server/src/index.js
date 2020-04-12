const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const {notFound, errorHandler} = require('./middlewares');
const app = express();
require('dotenv').config();
const logs = require('./api/logs');
const port = process.env.PORT || 8080;

mongoose.connect(process.env.DATABASE, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  origin: process.env.CROS_ORIGIN,
}));

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!',
  });
});

app.use('/api/logs', logs);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
