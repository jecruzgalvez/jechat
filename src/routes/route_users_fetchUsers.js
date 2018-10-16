"use strict";
exports.__esModule = true;
var user_1 = require("../models/user");
/*
 * GET fetchUsers API
 */
exports.fetchUsers = function (req, res, next) {
    user_1.User.find({}, { firstName: 1 })
        .exec(function (err, users) {
        if (err) {
            res.status(500).send();
        }
        else if (users) {
            // debugger;
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ users: users }));
        }
    });
};
