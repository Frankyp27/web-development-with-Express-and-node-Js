const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyparser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 3000;

require('./src/config/passport')(app);

app.use(morgan('tiny'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'library' }));


app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const books = [
  {
    title: 'River and the source',
    genre: 'fiction',
    author: 'Peter myles',
    read: false,
  },
  {
    title: 'A man of the people',
    genre: 'fiction',
    author: 'Chinua chebe',
    read: false,
  },
  {

    title: 'Encounters from Africa',
    genre: 'fiction',
    author: 'Peter myles',
    read: false,
  },
  {
    title: 'River runs red',
    genre: 'fiction',
    author: 'will smith',
    read: false,


  },
];
const nav = [
  { link: '/books', title: 'Books' },
  { link: '/authors', title: 'Authors' },
];
const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);
const authRouter = require('./src/routes/authRoutes')(nav);

app.use('/books', bookRouter);


app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.get('/', (req, res) => {
  res.render(
    'index',
    {
      nav: [{ link: '/books', title: 'Books' },
        { link: '/authors', title: 'Authors' }],
      title: 'Library',
    },
  );
});

app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});
