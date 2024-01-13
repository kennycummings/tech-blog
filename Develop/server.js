const sequelize = require('./config/connection');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const associations = require('./models/associations');
const dashboardRoutes = require('./controllers/dashboardRoutes');
const homeRoutes = require('./controllers/homeRoutes');
const loginRoutes = require('./controllers/loginRoutes');
const signupRoutes = require('./controllers/signupRoutes');

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

    // Add routes middleware after initializing other middleware
    app.use('/dashboard', dashboardRoutes);
    app.use('/login', loginRoutes);
    app.use('/signup', signupRoutes);
    app.use('/', homeRoutes);

    app.listen(PORT, () => console.log('Now listening'));
  })
  .catch((error) => {
    console.error('Error during Sequelize initialization:', error);
  });
