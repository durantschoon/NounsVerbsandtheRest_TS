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
var react_1 = require("react");
var ParserSelector_1 = __importDefault(require("./ParserSelector"));
var WordStats_1 = __importDefault(require("./WordStats"));
function ParserChallenger(_a) {
  var author = _a.author,
    authorUpdater = _a.authorUpdater,
    authorApplyWordFunc = _a.authorApplyWordFunc,
    parser = _a.parser;
  var _b = (0, react_1.useState)({ falsePos: 0, falseNeg: 0 }),
    stats = _b[0],
    setStats = _b[1];
  var _drawNounOutlines = function (author) {
    author.recomputeNounOutlines();
    /* These are the expected ways _drawNounOutlines will be called
    
          1. from the useEffect in this component (when the poem title or parser
             changes) `authorUpdater` should start with the current author,
             clone it before calling this and set author to the clone in the
             usual way.
    
          2. from a click on a word in the text-output. In this case, there was a
             bound version of an author clone (that seems to be the right one to
             use) from the time the click handler was created. Changes to this clone
             are made from authorApplyFunc which will be used ultimately to
             update the official author state in an ancestor component.
    
        */
    var stats = {
      falsePos: document.getElementsByClassName("non-noun inverted").length,
      falseNeg: document.getElementsByClassName("noun inverted").length,
    };
    setStats(stats);
    // update the clone before binding it in the click handlers
    author.updateCurrentStats(stats);
    _addClickHandlersToSpans(author);
  };
  // TODO: verify this rewrite works
  var drawNounOutlinesUpdater = function () {
    return authorUpdater(_drawNounOutlines);
  };
  // changing the poem (lines) or parser will trigger redrawing of noun outlines
  (0, react_1.useEffect)(drawNounOutlinesUpdater, [
    author.currentPoem.title,
    author.currentParser.name,
  ]);
  var _invertNoun = function (author, line, word) {
    author.nounInverter.flip(line, word);
    _drawNounOutlines(author);
  };
  var applyInvertNouns = function (author, line, word) {
    return authorApplyWordFunc(author, _invertNoun, line, word);
  };
  // clicking on a word should also trigger redrawing of noun outlines
  function _addClickHandlersToSpans(author) {
    var classNames = ["noun", "non-noun"];
    for (
      var _i = 0, classNames_1 = classNames;
      _i < classNames_1.length;
      _i++
    ) {
      var className = classNames_1[_i];
      var spans = Array.from(document.getElementsByClassName(className));
      for (var _a = 0, spans_1 = spans; _a < spans_1.length; _a++) {
        var span = spans_1[_a];
        // span.addEventListener("click", (event: ClickEvent) : void => {
        span.addEventListener("click", function (event) {
          event.stopPropagation();
          var _a = event.target.id.split("_").slice(1),
            line = _a[0],
            word = _a[1];
          applyInvertNouns(author, +line, +word);
        });
      }
    }
  }
  return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
    children: [
      (0, jsx_runtime_1.jsx)(
        ParserSelector_1.default,
        __assign(
          {},
          {
            authorUpdater: authorUpdater,
            parserName: author.currentParser.name,
          }
        )
      ),
      (0, jsx_runtime_1.jsx)("h1", {
        children: " Correct what is and is not a noun ",
      }),
      (0, jsx_runtime_1.jsxs)("ul", {
        children: [
          (0, jsx_runtime_1.jsxs)("li", {
            children: [
              "Click on a word with the ",
              (0, jsx_runtime_1.jsx)(
                "span",
                __assign({ className: "non-noun" }, { children: "Plus" })
              ),
              " ",
              (0, jsx_runtime_1.jsx)("img", { id: "non-noun-cursor-img" }),
              " cursor to change a word INTO a noun.",
            ],
          }),
          (0, jsx_runtime_1.jsxs)("li", {
            children: [
              "Click on a word with the ",
              (0, jsx_runtime_1.jsx)(
                "span",
                __assign({ className: "noun" }, { children: "Back" })
              ),
              " ",
              (0, jsx_runtime_1.jsx)("img", { id: "noun-cursor-img" }),
              " cursor to change a word BACK TO a non-noun.",
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)("div", { id: "text-output" }),
      (0, jsx_runtime_1.jsx)(
        WordStats_1.default,
        __assign(
          {},
          {
            parserName: parser.name,
            falsePositiveCount: stats.falsePos,
            falseNegativeCountCount: stats.falseNeg,
          }
        )
      ),
    ],
  });
}
exports.default = ParserChallenger;
