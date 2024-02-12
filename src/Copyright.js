"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var Typography_1 = __importDefault(require("@mui/material/Typography"));
var Link_1 = __importDefault(require("@mui/material/Link"));
function Copyright() {
    return ((0, jsx_runtime_1.jsxs)(Typography_1.default, { variant: "body2", color: "text.secondary", align: "center", children: ["Copyright © ", (0, jsx_runtime_1.jsx)(Link_1.default, { color: "inherit", href: "https://mui.com/", children: "Your Website" }), " ", new Date().getFullYear(), "."] }));
}
exports.default = Copyright;
