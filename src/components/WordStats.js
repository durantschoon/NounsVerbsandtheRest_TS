"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
function WordStats(_a) {
    var parserName = _a.parserName, stats = _a.stats;
    return ((0, jsx_runtime_1.jsxs)("fieldset", { id: "stats-fieldset", children: [(0, jsx_runtime_1.jsx)("legend", { id: "stats-legend", children: (0, jsx_runtime_1.jsx)("b", { children: (0, jsx_runtime_1.jsxs)("i", { children: ["Statistics for ", parserName] }) }) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)("b", { children: "False Positives:" }), " ", stats.falsePos, " "] }), (0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)("b", { children: "False Negatives:" }), " ", stats.falseNeg] })] }), (0, jsx_runtime_1.jsx)("b", { children: "Total Incorrect:" }), " ", stats.falsePos + stats.falseNeg] }));
}
exports.default = WordStats;
