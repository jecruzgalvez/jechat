"use strict";
exports.__esModule = true;
/*
 * GET logout route.
 */
exports.logout = function (req, res, next) {
    res.clearCookie('auth');
    res.clearCookie('userId');
    res.clearCookie('userName');
    res.end('Logout!');
    // res.redirect('/')
    next();
};
