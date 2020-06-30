//---------------------------------------------signup page call------------------------------------------------------
exports.signup = function(req, res) {
    message = '';
    if (req.method == "POST") {
        var post = req.body;
        var email = post.email;
        var password = post.password;
        var first_name = post.first_name;
        var last_name = post.last_name;
        var mobile_no = post.mobile_no;

        var sql = "INSERT INTO `users`(`first_name`,`last_name`,`mobile_no`,`email`, `password`) VALUES ('" + first_name + "','" + last_name + "','" + mobile_no + "','" + email + "','" + password + "')";

        var query = db.query(sql, function(err, result) {

            message = "Succesfully! Your account has been created.";
            res.render('signup.ejs', { message: message });
        });

    } else {
        res.render('signup');
    }
};

//-----------------------------------------------login page call------------------------------------------------------
exports.login = function(req, res) {
    var message = '';
    console.log("Working fine");
    var sess = req.session;

    if (req.method == "POST") {
        var post = req.body;
        var email = post.email;
        var password = post.password;

        var sql = "SELECT userid, first_name, last_name, email FROM `users` WHERE `email`='" + email + "' and password = '" + password + "'";
        db.query(sql, function(err, results) {
            if (results.length) {
                req.session.userid = results[0].userid;
                req.session.user = results[0];
                //console.log("User ID" + JSON.stringify(results[0].userid));
                // console.log(results[0].id);
                res.redirect('/home');

            } else {
                message = 'Wrong Credentials.';
                res.render('login.ejs', { message: message });
            }

        });
    } else {
        res.render('login.ejs', { message: message });
    }

};
//------------------------------Update--------------------------------------

//-----------------------------------------------dashboard page functionality----------------------------------------------

exports.dashboard = function(req, res, next) {

    var user = req.session.user,
        userId = req.session.userid;
    console.log('User ID=' + userId);
    if (userId == null) {
        res.redirect("/login");
        return;
    }

    var sql = "SELECT * FROM `users` WHERE `userid`='" + userId + "'";

    db.query(sql, function(err, results) {
        res.render('dashboard.ejs', { user: user });
    });
};

//------------------------------------logout functionality----------------------------------------------
exports.logout = function(req, res) {
    console.log("Logout " + (req.session = null))
    req.session = null;
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

    res.redirect("/login");

};

//--------------------------------render user details after login--------------------------------
exports.profile = function(req, res) {

    var userId = req.session.userid;
    var username = req.session.user.first_name;
    if (userId == null) {
        res.redirect("/login");
        return;
    }

    var sql = "SELECT * FROM `users` WHERE `userid`='" + userId + "'";
    db.query(sql, function(err, result) {
        res.render('profile.ejs', {
            data: result,
            username: username
        });
    });
};
//---------------------------------edit users details after login----------------------------------
exports.editprofile = function(req, res) {
    message = '';
    var userId = req.session.userid;
    if (userId == null) {
        res.redirect("/login");
        return;
    }
    if (req.method == "POST") {
        var post = req.body;
        var email = post.email;
        var password = post.password;
        var first_name = post.first_name;
        var last_name = post.last_name;
        var mobile_no = post.mobile_no;

        var sql = "INSERT INTO `users`(`first_name`,`last_name`,`mobile_no`,`email`, `password` WHERE `userid`='" + userId + "') VALUES('" + first_name + "', '" + last_name + "', '" + mobile_no + "', '" + email + "', '" + password + "')";
        var query = db.query(sql, function(err, result) {

            message = "Succesfully! Your account has been Updated.";
            res.render('dashboard.ejs', { message: message });
        });

    } else {
        res.render('home.ejs');
    }
};