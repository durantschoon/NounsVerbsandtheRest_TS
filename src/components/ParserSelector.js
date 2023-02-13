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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var Radio_1 = __importDefault(require("@mui/material/Radio"));
var RadioGroup_1 = __importDefault(require("@mui/material/RadioGroup"));
var FormControlLabel_1 = __importDefault(
  require("@mui/material/FormControlLabel")
);
var FormControl_1 = __importDefault(require("@mui/material/FormControl"));
var FormLabel_1 = __importDefault(require("@mui/material/FormLabel"));
var ParserDescriptions_1 = __importDefault(require("./ParserDescriptions"));
var Parser_1 = require("../dataClasses/Parser");
function ParserSelector(_a) {
  var authorUpdater = _a.authorUpdater,
    parserName = _a.parserName;
  // function handleParserChange(event: ChangeEvent) {
  function handleParserChange(event) {
    authorUpdater(function (clone) {
      clone.currentParser = Parser_1.parsersByName[event.target.value];
    });
  }
  return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
    children: [
      (0, jsx_runtime_1.jsx)("h1", {
        children: " Choose your Natural Language Parser ",
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        children: [
          (0, jsx_runtime_1.jsx)(ParserDescriptions_1.default, {}),
          (0, jsx_runtime_1.jsxs)(FormControl_1.default, {
            children: [
              (0, jsx_runtime_1.jsx)(
                FormLabel_1.default,
                __assign(
                  { id: "parsers-radio-buttons-group-label" },
                  { children: "Parsers" }
                )
              ),
              (0, jsx_runtime_1.jsxs)(
                RadioGroup_1.default,
                __assign(
                  {
                    row: true,
                    "aria-labelledby": "parsers-radio-buttons-group-label",
                    defaultValue: Parser_1.defaultParser.name,
                    name: "parserName",
                    /* value={defaultParser.name} */
                    value: parserName,
                    onChange: handleParserChange,
                  },
                  {
                    children: [
                      (0, jsx_runtime_1.jsx)(FormControlLabel_1.default, {
                        value: "parts-of-speech",
                        control: (0, jsx_runtime_1.jsx)(Radio_1.default, {}),
                        label: "Parts-of-Speech",
                      }),
                      (0, jsx_runtime_1.jsx)(FormControlLabel_1.default, {
                        value: "en-pos",
                        control: (0, jsx_runtime_1.jsx)(Radio_1.default, {}),
                        label: "en-pos",
                      }),
                    ],
                  }
                )
              ),
            ],
          }),
        ],
      }),
    ],
  });
}
exports.default = ParserSelector;
