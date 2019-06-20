const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');

const User = require('./models/user');

sequelize
  .sync()
  .then(result => console.log(result))
  .catch(err => console.log(err));

const indexRouter = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res) => {
  res.status(404).render('error');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

module.exports = app;
