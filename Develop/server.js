const sequelize = require('./config/connection');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const path = require('path');
const associations = require('./models/associations');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection successful');
    return sequelize.sync({ force: false });
  })
  .then(() => {
    console.log('Database synced successfully');


    // Configure and use SequelizeStore
    const sess = {
      secret: 'Super secret secret',
      cookie: {},
      resave: false,
      saveUninitialized: true,
      store: new SequelizeStore({
        db: sequelize,
      }),
    };

    app.use(session(sess));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, 'public')));

    app.use(routes);

    app.listen(PORT, () => console.log('Now listening'));
  })
  .catch((error) => {
    console.error('Error during Sequelize initialization:', error);
  });
