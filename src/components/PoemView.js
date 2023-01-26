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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
// import PropTypes from 'prop-types';
var react_1 = require("react");
var R = __importStar(require("ramda"));
var zod_1 = __importDefault(require("zod"));
var material_1 = require("@mui/material");
var useMediaQuery_1 = __importDefault(require("@mui/material/useMediaQuery"));
var PoemSelector_1 = __importDefault(require("./PoemSelector"));
var ParserChallenger_1 = __importDefault(require("./ParserChallenger"));
var SnackbarAlerts_1 = __importDefault(require("./SnackbarAlerts"));
var Author_1 = __importStar(require("../dataClasses/Author"));
var Parser_1 = require("../dataClasses/Parser");
var Poem_1 = __importDefault(require("../dataClasses/Poem"));
var sonnets_1 = __importStar(require("../data/sonnets"));
require("./PoemView.css");
// Order poetry urls "best" to "worst" (highest priority first)
// Define as an enum so that we can create a types later
// const PoetryURLs = z.enum([
//   "http://fetch-should-fail.com",
//   "http://165.227.95.56:3000",
// ]);
// debug values
// const PoetryURLs = z.enum(["https://poetrydb.org", "http://165.227.95.56:3000"]);
var poetryURLs = ["https://poetrydb.org", "http://165.227.95.56:3000"];
var zurl = zod_1.default.string().url();
var fetchedAuthorData = { default: sonnets_1.default, current: sonnets_1.default };
var authorNames = { default: sonnets_1.defaultAuthorNames, current: sonnets_1.defaultAuthorNames };
var titlesByAuthorClone = R.clone(sonnets_1.defaultTitlesByAuthor);
var titlesByAuthor = {
    default: titlesByAuthorClone,
    current: titlesByAuthorClone,
};
function PoemView() {
    var _this = this;
    // TODO: if the parser is on the author, do we need this separate state?
    var _a = (0, react_1.useState)(Parser_1.defaultParser), parser = _a[0], setParser = _a[1];
    var _b = (0, react_1.useState)(Author_1.defaultAuthor), author = _b[0], setAuthor = _b[1];
    var _c = (0, react_1.useState)({
        open: false,
        severity: "info",
        message: "",
    }), toast = _c[0], setToast = _c[1];
    var _d = (0, react_1.useState)({
        authorName: "",
        percentage: 0,
    }), loadingProgress = _d[0], setLoadingProgress = _d[1];
    var extraLargeScreen = (0, useMediaQuery_1.default)(function (theme) { return theme.breakpoints.up("xl"); });
    function setSnackOpen(openOrClosed) {
        setToast(function (prevToast) { return (__assign(__assign({}, prevToast), { open: openOrClosed })); });
    }
    function toastAlert(message, severity) {
        setToast({ message: message, severity: severity, open: true });
    }
    /* setHighestRankFetchedPoem Update the fetched poems to the "best" results
        - sets the value of fetchedPoems 'current' key to the first-most URL of poetryURLs
        - calls setAuthorData on the latest data
      */
    function setHighestRankFetchedPoem() {
        for (var _i = 0, poetryURLs_1 = poetryURLs; _i < poetryURLs_1.length; _i++) {
            var url = poetryURLs_1[_i];
            var poems = fetchedAuthorData[url];
            if (Object.keys(poems).length > 0) {
                fetchedAuthorData.current = fetchedAuthorData[url];
                authorNames.current = authorNames[url];
                titlesByAuthor.current = titlesByAuthor[url];
                break;
            }
        }
        if (fetchedAuthorData.current !== fetchedAuthorData.default) {
            // Choose the 2nd poet just because we want it to be
            // Emily Dickinson if the vanilla poemdb server comes up.
            // But set it to 0th if we end up with only one poet
            // because some other data has loaded.
            var authorIndex = Math.min(1, authorNames.current.length - 1);
            var author_1 = authorNames.current[authorIndex];
            var titles = titlesByAuthor.current[author_1];
            var title = titles[0];
            var lines = fetchedAuthorData.current.currentPoem.lines;
            var currentPoem = new Poem_1.default(author_1, title, lines);
            setAuthor(new Author_1.default({
                name: author_1,
                titles: titles,
                authorNames: authorNames.current,
                currentPoem: currentPoem,
                currentParser: parser,
            }));
        }
    }
    /* Updating:
        - Chain together any number of functions that will modify the authorData
          and pass those into authorUpdater
        - Clones current authorData
        - Applies (chained) func(s) to modify clone (with any args)
        - Finally, sets the new author state to the modified clone
      */
    var authorUpdater = function (func, args) {
        var clone = R.clone(author); // deep copy for modification and resetting    
        func.apply(void 0, __spreadArray([clone], (args !== null && args !== void 0 ? args : []), false));
        setAuthor(clone);
    };
    var authorApplyWordFunc = function (clone, func, line, word) {
        func(clone, line, word);
        setAuthor(clone);
    };
    // Initial useEffect hook tries to fetch poems from URLs
    (0, react_1.useEffect)(function () {
        function fetchPoems(url) {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                var authorURL, response, authorJSON, numAuthors, countAuthors, _loop_1, _i, _b, authorName;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            authorURL = url + "/author";
                            return [4 /*yield*/, fetch(authorURL)];
                        case 1:
                            response = _c.sent();
                            return [4 /*yield*/, response.json()];
                        case 2:
                            authorJSON = _c.sent();
                            numAuthors = authorNames.current.length;
                            countAuthors = 0;
                            authorNames[url] = authorJSON.authors;
                            if (((_a = authorNames[url]) === null || _a === void 0 ? void 0 : _a.length) === 0) {
                                throw "No authors found at ".concat(authorURL);
                            }
                            _loop_1 = function (authorName) {
                                var poemsByAuthorURL, fetchedPoemsInitial;
                                var _d, _e;
                                return __generator(this, function (_f) {
                                    switch (_f.label) {
                                        case 0:
                                            poemsByAuthorURL = "".concat(url, "/author/").concat(encodeURIComponent(authorName.trim()));
                                            setLoadingProgress({
                                                authorName: authorName,
                                                percentage: 100 * (++countAuthors / numAuthors),
                                            });
                                            return [4 /*yield*/, fetch(poemsByAuthorURL)];
                                        case 1:
                                            response = _f.sent();
                                            return [4 /*yield*/, response.json()];
                                        case 2:
                                            fetchedPoemsInitial = _f.sent();
                                            if (titlesByAuthor[url]) {
                                                titlesByAuthor[url][authorName] = [];
                                            }
                                            else {
                                                titlesByAuthor[url] = (_d = {}, _d[authorName] = [], _d);
                                            }
                                            if (fetchedAuthorData[url]) {
                                                fetchedAuthorData[url][authorName] = {};
                                            }
                                            else {
                                                fetchedAuthorData[url] = (_e = {}, _e[authorName] = {}, _e);
                                            }
                                            // for (let poem of fetchedPoemsInitial) {
                                            //   titlesByAuthor[url]![authorName].push(poem.title);
                                            //   fetchedAuthorData[url]?[authorName][poem.title] = poem.lines;
                                            // }
                                            // try forEach here
                                            // TODO: resolve Poem vs PoemData
                                            fetchedPoemsInitial.forEach(function (poem) {
                                                titlesByAuthor[url][authorName].push(poem.title);
                                                fetchedAuthorData[url] ? [authorName][poem.title] = poem.lines : ;
                                            });
                                            return [2 /*return*/];
                                    }
                                });
                            };
                            _i = 0, _b = authorNames[url];
                            _c.label = 3;
                        case 3:
                            if (!(_i < _b.length)) return [3 /*break*/, 6];
                            authorName = _b[_i];
                            return [5 /*yield**/, _loop_1(authorName)];
                        case 4:
                            _c.sent();
                            _c.label = 5;
                        case 5:
                            _i++;
                            return [3 /*break*/, 3];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        }
        var fetchedPromises = poetryURLs.map(function (url) { return __awaiter(_this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fetchPoems(url)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, toastAlert("".concat(error_1.message, ": ").concat(url), "warning")];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        Promise.all(fetchedPromises).then(function () { return setHighestRankFetchedPoem(); });
    }, []);
    // When the title changes, update the lines of poetry
    (0, react_1.useEffect)(function () {
        var authorName = author.name;
        var title = author.stagedTitleChange;
        var newLines = fetchedAuthorData.current[authorName][title];
        authorUpdater(function (aDataClone) {
            aDataClone.setPoem(new Poem_1.default(authorName, title, newLines));
        });
    }, [author.stagedTitleChange]);
    // When the author name changes, set the current title to the first one fetched
    (0, react_1.useEffect)(function () {
        var _a, _b;
        var authorName = author.name;
        var newTitle = (_b = (_a = titlesByAuthor.current) === null || _a === void 0 ? void 0 : _a[authorName]) === null || _b === void 0 ? void 0 : _b[0];
        // needed?
        // if (!fetchedPoems?.["current"]?.[authorName]?.[newTitle]) return;
        var newLines = fetchedAuthorData.current[authorName][newTitle];
        authorUpdater(function (authorClone) {
            // update the possible titles, so the selector will populate before the
            // poem resets
            authorClone.titles = titlesByAuthor.current[authorClone.name];
            authorClone.setPoem(new Poem_1.default(authorName, newTitle, newLines));
        });
    }, [author.name]);
    return ((0, jsx_runtime_1.jsxs)("section", { children: [(0, jsx_runtime_1.jsxs)(material_1.Grid, __assign({ container: true, spacing: 2, direction: extraLargeScreen ? "row" : "column" }, { children: [(0, jsx_runtime_1.jsx)(material_1.Grid, __assign({ item: true, xs: 6 }, { children: (author === null || author === void 0 ? void 0 : author.currentPoem) && ((0, jsx_runtime_1.jsx)(PoemSelector_1.default, __assign({}, { author: author, authorUpdater: authorUpdater, loadingProgress: loadingProgress }))) })), (0, jsx_runtime_1.jsx)(material_1.Grid, __assign({ item: true, xs: 6 }, { children: (0, jsx_runtime_1.jsx)(ParserChallenger_1.default, __assign({}, { author: author, authorUpdater: authorUpdater, authorApplyWordFunc: authorApplyWordFunc, parser: parser })) }))] })), (0, jsx_runtime_1.jsx)(SnackbarAlerts_1.default, __assign({}, __assign(__assign({}, toast), { setSnackOpen: setSnackOpen })))] }));
}
exports.default = PoemView;
