"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var Box_1 = __importDefault(require("@mui/material/Box"));
var LinearProgress_1 = __importDefault(require("@mui/material/LinearProgress"));
function AuthorProgress(_a) {
    var authorName = _a.authorName, percentage = _a.percentage;
    return ((0, jsx_runtime_1.jsxs)(Box_1.default, __assign({ id: "progress-box", sx: { width: '90%', margin: '1rem' } }, { children: [(0, jsx_runtime_1.jsx)(LinearProgress_1.default, { variant: "determinate", value: percentage, "aria-describedby": "progress-box", "aria-busy": percentage < 100 ? true : false }), (0, jsx_runtime_1.jsx)("i", { children: authorName })] })));
}
exports.default = AuthorProgress;
