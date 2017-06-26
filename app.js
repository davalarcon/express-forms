const express = require ('express');

const app = express();

app.set('view engine', 'ejs');

app.set('views', 'views');
//since my folder is also called /views I do not really need the second 'views'.
//i could just leave it as app.set('views');


//-----Morgan middleware
const morgan = require ('morgan');
//--- console.logs info about the connection
app.use(morgan('dev'));


//----our fake middleware------------
app.use((req, res, next) => {
  console.log('OUR MIDDLEWARE 🏄 🙈');

  req.pizza = '🌮🥕🍿';

  next();
});
//------------------------------------

app.use(express.static('public'));


const expressLayouts = require ('express-ejs-layouts');

app.use(expressLayouts);

app.set('layout');
//since my file is also called /layout.ejs there is no need for a second argument.

//--POST BODY PARSER RELATED STUFF GO HERE👇👇👇 ------------------

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));





//--ROUTES GO HERE👇👇👇 ------------------

app.get('/', (req, res, next)=>{
  res.render('home-page-view.ejs');
});

app.get('/search', (req, res, next)=>{
  console.log('In the /search route ' + req.pizza);
                          //            req.pizza comes from our fake middleware
  res.render('search-form-view.ejs');
});

app.get('/results', (req, res, next)=>{
  //   |      |_____________________
  //   |____________                |
  //                |               |
  //                |               |
    // <form method="get" action="/results">
  const myTerm = req.query.searchTerm;
  const myCheckbox = req.query.interestThing;

    if (myCheckbox === 'on') {
      res.render('pizza-results.ejs',{
        theSearch : myTerm
      });
    }
    else {
      res.render('results-view.ejs',{
        theSearch : myTerm
      });
    }
});


// ----- STEP #1 OF OUR LOGIN form submission ----
app.get('/login', (req, res, next)=>{
  res.render('login-view.ejs');
});

// ----- STEP #2 OF OUR LOGIN form submission ----
app.post('/check-login', (req, res, next)=>{

// these two const are connected with the /login-view.ejs
//userEmail or userPass can be named whatever I want.

                // <input name="emailValue">
              //                  |
  const userEmail = req.body.emailValue;
  const userPass = req.body.passwordValue;
              //                   |
              // <input name="passwordValue">



    if ( userEmail === 'a@a.com' && userPass === 'swordfish'){
      res.render('welcome-view.ejs');
    }
    else{
      res.render('go-away-view.ejs');
    }
  });
//------------------------------------

app.listen(3000);
