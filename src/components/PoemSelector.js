"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var FormControl_1 = __importDefault(require("@mui/material/FormControl"));
var InputLabel_1 = __importDefault(require("@mui/material/InputLabel"));
var MenuItem_1 = __importDefault(require("@mui/material/MenuItem"));
var Select_1 = __importDefault(require("@mui/material/Select"));
function capitalizeFirstLetter(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}
// generic selector used for authors and titles
function selector(selName, value, setter, valList) {
    var menuKey = 0;
    return ((0, jsx_runtime_1.jsxs)(FormControl_1.default, { margin: "dense", children: [(0, jsx_runtime_1.jsx)(InputLabel_1.default, { id: "".concat(selName, "-select-label"), children: capitalizeFirstLetter(selName) }), (0, jsx_runtime_1.jsx)(Select_1.default, { labelId: "".concat(selName, "-select-label"), id: "".concat(selName, "-select"), value: value, label: capitalizeFirstLetter(selName), onChange: function (event) { return setter(event.target.value); }, children: valList.map(function (s) { return ((0, jsx_runtime_1.jsx)(MenuItem_1.default, { value: s, children: s }, menuKey++)); }) })] }));
}
function PoemSelector(_a) {
    var _b;
    var author = _a.author, authorUpdater = _a.authorUpdater;
    function authorSelector() {
        function setAuthorName(name) {
            return authorUpdater(function (clone) {
                clone.name = name;
            });
        }
        var name = author.name, authorNames = author.authorNames;
        return selector("author", name, setAuthorName, authorNames);
    }
    function titleSelector() {
        function setTitle(title) {
            return authorUpdater(function (aDataClone) {
                aDataClone.stagedTitleChange = title;
            });
        }
        var title = author.currentPoem.title;
        var titles = author.titles;
        return selector("title", title, setTitle, titles);
    }
    var joinedLines = author.currentPoem.lines
        ? author.currentPoem.lines.join("\n")
        : "";
    var aD = author;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h1", { children: " Select a poem " }), aD && aD.name && aD.authorNames && authorSelector(), aD && ((_b = aD.currentPoem) === null || _b === void 0 ? void 0 : _b.title) && aD.titles && titleSelector(), (0, jsx_runtime_1.jsx)("textarea", { value: joinedLines, id: "text-input", readOnly: true })] }));
}
exports.default = PoemSelector;
