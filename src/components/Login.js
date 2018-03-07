"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var React = require("react");
// import 'bootstrap/dist/css/bootstrap.css';
var react_bootstrap_1 = require("react-bootstrap");
var Login = (function (_super) {
    __extends(Login, _super);
    function Login() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Login.prototype.render = function () {
        return (React.createElement(react_bootstrap_1.Form, { horizontal: true },
            React.createElement(react_bootstrap_1.FormGroup, { controlId: "formHorizontalEmail" },
                React.createElement(react_bootstrap_1.Col, { componentClass: react_bootstrap_1.ControlLabel, sm: 2 }, "Email"),
                React.createElement(react_bootstrap_1.Col, { sm: 10 },
                    React.createElement(react_bootstrap_1.FormControl, { type: "email", placeholder: "Email" }))),
            React.createElement(react_bootstrap_1.FormGroup, { controlId: "formHorizontalPassword" },
                React.createElement(react_bootstrap_1.Col, { componentClass: react_bootstrap_1.ControlLabel, sm: 2 }, "Password"),
                React.createElement(react_bootstrap_1.Col, { sm: 10 },
                    React.createElement(react_bootstrap_1.FormControl, { type: "password", placeholder: "Password" }))),
            React.createElement(react_bootstrap_1.FormGroup, null,
                React.createElement(react_bootstrap_1.Col, { smOffset: 2, sm: 10 },
                    React.createElement(react_bootstrap_1.Checkbox, null, "Remember me"))),
            React.createElement(react_bootstrap_1.FormGroup, null,
                React.createElement(react_bootstrap_1.Col, { smOffset: 2, sm: 10 },
                    React.createElement(react_bootstrap_1.Button, { type: "submit" }, "Sign in")))));
    };
    return Login;
}(React.Component));
exports["default"] = Login;
