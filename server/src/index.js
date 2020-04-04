const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const {notFound, errorHandler} = require('./middlewares');

const port = process.env.PORT || 8080;
const app = express();

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:8080',
}));

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!',
  });
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
