const express = require('express');
const path = require('path');
const routes = require('./routes/routes.js');
const session = require('express-session');
const flash = require('express-flash');
const conn = require('./db/conn.js');
const User = require('./models/User.js');

const app = express();

app.use(session({
  secret: "sdae¨%312jhbdsah",
  resave: true,
  saveUninitialized: true,
}));

app.use(flash());

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(routes); 

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

conn
  //.sync({ force: true })
  .sync()
  .then(() => {
    app.listen(4444, () => {
      console.log('Servidor rodando => http://localhost:4444')
    });
  });