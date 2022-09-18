const { appendFile } = require('fs');
const path = require('path'); 
const express = require('express');
const app = express();
const sequelize = require('./config/connection');
const routes = require('./controllers/')

const PORT = process.env.PORT || 3001;

//Handlebars
const exphbs = require('express-handlebars'); 
const hbs = exphbs.create({}); 

app.engine('handlebars', hbs.engine); 
app.set('view engine', 'handlebars'); 

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});