"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
function WordStats(_a) {
  var parserName = _a.parserName,
    falsePositiveCount = _a.falsePositiveCount,
    falseNegativeCountCount = _a.falseNegativeCountCount;
  return (0, jsx_runtime_1.jsxs)(
    "fieldset",
    __assign(
      { id: "stats-fieldset" },
      {
        children: [
          (0, jsx_runtime_1.jsx)(
            "legend",
            __assign(
              { id: "stats-legend" },
              {
                children: (0, jsx_runtime_1.jsx)("b", {
                  children: (0, jsx_runtime_1.jsxs)("i", {
                    children: ["Statistics for ", parserName],
                  }),
                }),
              }
            )
          ),
          (0, jsx_runtime_1.jsxs)("div", {
            children: [
              (0, jsx_runtime_1.jsxs)("span", {
                children: [
                  (0, jsx_runtime_1.jsx)("b", { children: "False Positives:" }),
                  " ",
                  falsePositiveCount,
                  " ",
                ],
              }),
              (0, jsx_runtime_1.jsxs)("span", {
                children: [
                  (0, jsx_runtime_1.jsx)("b", { children: "False Negatives:" }),
                  " ",
                  falseNegativeCountCount,
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)("b", { children: "Total Incorrect:" }),
          " ",
          falsePositiveCount + falseNegativeCountCount,
        ],
      }
    )
  );
}
exports.default = WordStats;
