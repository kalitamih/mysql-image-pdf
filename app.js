const sequelize = require('./util/database');
const User = require('./models/user');

sequelize
  .sync({ force: true })
  .then(result => console.log(result))
  .catch(err => console.log(err));
