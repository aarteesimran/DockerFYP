//exports.__esModule = true;
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var routes = require('./routes');
var user = require('./routes/user.js');
var session = require('express-session');
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
//const dbConnection = require('./routes/database');
const { body, validationResult } = require('express-validator');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pty = require("pty.js");
var mysql = require('mysql');
var app = express();
var expressWs = require('express-ws')(app);
var websocket = require("./routes/ws.js");
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//APPLY COOKIE SESSION MIDDLEWARE
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge: 3600 * 1000 // 1hr
}));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));
//console.log(session);

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
// -- from WS ---------
app.use("/shell", websocket);
//-------------------------
// DB Conn
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'dockerizedcloudide',
    multipleStatements: true
});

connection.connect(function(err) {
    if (!err) {
        console.log("Database is connected ... nn");
    } else {
        console.log("Error connecting database ... nn");
    }
});

global.db = connection;

// Routes

//app.get('/', routes.login); //call for main index page
app.get('/signup', user.signup); //call for signup page
app.post('/signup', user.signup); //call for signup post 
// app.get('/login', routes.login); //call for login page
app.post('/login', user.login); //call for login post
app.get('/dashboard', user.dashboard); //call for dashboard page after login
app.get('/logout', user.logout); //call for logout
app.get('/profile', user.profile); //to render users profile
app.post('/editprofile', user.editprofile); //to render users profile
//Middleware

// // DECLARING CUSTOM MIDDLEWARE
const ifNotLoggedin = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        console.log("Not Loggedin");
        return res.render('/login');
    }
    next();
}

const ifLoggedin = (req, res, next) => {
        if (req.session.isLoggedIn) {
            console.log("Scene On hai betaa!! ");
            return res.redirect('/home');
        }
        next();
    }
    //END OF CUSTOM MIDDLEWARE



// // ROOT PAGE
// app.get('/', ifNotLoggedin, (req, res, next) => {
//     db.execute("SELECT `first_name` FROM `users` WHERE `id`=?", [req.session.userID])
//         .then(([rows]) => {
//             res.render('/home', {
//                 name: rows[0].name
//             });
//         });

// }); // END OF ROOT PAGE


// // REGISTER PAGE
// app.post('/register', ifLoggedin,
//     // post data validation(using express-validator)
//     [
//         body('user_email', 'Invalid email address!').isEmail().custom((value) => {
//             return dbConnection.execute('SELECT `email` FROM `users` WHERE `email`=?', [value])
//                 .then(([rows]) => {
//                     if (rows.length > 0) {
//                         return Promise.reject('This E-mail already in use!');
//                     }
//                     return true;
//                 });
//         }),
//         body('user_name', 'Username is Empty!').trim().not().isEmpty(),
//         body('user_pass', 'The password must be of minimum length 6 characters').trim().isLength({ min: 6 }),
//     ], // end of post data validation
//     (req, res, next) => {

//         const validation_result = validationResult(req);
//         var today = new Date();
//         const { user_name, user_pass, user_email } = req.body;
//         // IF validation_result HAS NO ERROR
//         if (validation_result.isEmpty()) {
//             // password encryption (using bcrypt)
//             bcrypt.hash(user_pass, 12).then((hash_pass) => {
//                     // INSERTING USER INTO DATABASE
//                     dbConnection.execute("INSERT INTO `users`(`first_name`,`email`,`password`,`created`,`modified`) VALUES(?,?,?,?,?)", [user_name, user_email, hash_pass, today, today])
//                         .then(result => {
//                             alert("Account Successfully created !!!");

//                             //res.render('login-register');
//                             //(`your account has been created successfully, Now you can <a href="/">Login</a>`);
//                         }).catch(err => {
//                             // THROW INSERTING USER ERROR'S
//                             if (err) throw err;
//                         });
//                 })
//                 .catch(err => {
//                     // THROW HASING ERROR'S
//                     if (err) throw err;
//                 })
//         } else {
//             // COLLECT ALL THE VALIDATION ERRORS
//             let allErrors = validation_result.errors.map((error) => {
//                 return error.msg;
//             });
//             // REDERING login-register PAGE WITH VALIDATION ERRORS
//             // res.render('login-register', {
//             res.render('signup', {
//                 register_error: allErrors,
//                 old_data: req.body
//             });
//         }
//     }); // END OF REGISTER PAGE

// // LOGIN PAGE
// app.post('/', ifLoggedin, [
//     body('user_email').custom((value) => {
//         return dbConnection.execute('SELECT `email` FROM `users` WHERE `email`=?', [value])
//             .then(([rows]) => {
//                 if (rows.length == 1) {
//                     return true;

//                 }
//                 return Promise.reject('Invalid Email Address!');

//             });
//     }),
//     body('user_pass', 'Password is empty!').trim().not().isEmpty(),
// ], (req, res) => {
//     const validation_result = validationResult(req);
//     const { user_pass, user_email } = req.body;
//     if (validation_result.isEmpty()) {

//         dbConnection.execute("SELECT * FROM `users` WHERE `email`=?", [user_email])
//             .then(([rows]) => {
//                 bcrypt.compare(user_pass, rows[0].password).then(compare_result => {
//                         if (compare_result === true) {
//                             req.session.isLoggedIn = true;
//                             req.session.userID = rows[0].id;

//                             res.redirect('/home');
//                         } else {
//                             // res.render('login-register', {
//                             res.render('login', {
//                                 login_errors: ['Invalid Password!']
//                             });
//                         }
//                     })
//                     .catch(err => {
//                         if (err) throw err;
//                     });


//             }).catch(err => {
//                 if (err) throw err;
//             });
//     } else {
//         let allErrors = validation_result.errors.map((error) => {
//             return error.msg;
//         });
//         // REDERING login-register PAGE WITH LOGIN VALIDATION ERRORS
//         res.render('login-register', {
//             login_errors: allErrors
//         });
//     }
// });
// // END OF LOGIN PAGE
// // // first_name, email , password 

// // LOGOUT
// app.get('/logout', (req, res) => {
//     //session destroy
//     req.session = null;
//     res.redirect('/');
// });
// // END OF LOGOUT

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

//--------------------------------------------------------------------------
app.listen(3001);
module.exports = app;