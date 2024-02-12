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
exports.exportedForTesting = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var lz_string_1 = require("lz-string");
var R = __importStar(require("ramda"));
var material_1 = require("@mui/material");
var useMediaQuery_1 = __importDefault(require("@mui/material/useMediaQuery"));
var PoemSelector_1 = __importDefault(require("./PoemSelector"));
var ParserChallenger_1 = __importDefault(require("./ParserChallenger"));
var SnackbarAlerts_1 = __importDefault(require("./SnackbarAlerts"));
var Author_1 = __importStar(require("../dataClasses/Author"));
var Parser_1 = require("../dataClasses/Parser");
var Poem_1 = __importDefault(require("../dataClasses/Poem"));
var poems_1 = __importStar(require("../data/poems"));
require("./PoemView.css");
// Order poetry urls "best" to "worst" (highest priority first)
// Define as an enum so that we can create a types later
// const poetryURLs: PoetryURL[] = [
//   "http://fetch-should-fail.com",
//   "http://165.227.95.56:3000",
// ]
// debug values
// const poetryURLs: PoetryURL[] = ["https://poetrydb.org", "http://165.227.95.56:3000"]
var poetryURLs = ["https://poetrydb.org"];
var fetchedAuthorData = {
    default: poems_1.default,
    current: poems_1.default,
};
var authorNames = {
    default: poems_1.defaultAuthorNames,
    current: poems_1.defaultAuthorNames,
};
var titlesByAuthorClone = R.clone(poems_1.defaultTitlesByAuthor);
var titlesByAuthor = {
    default: titlesByAuthorClone,
    current: titlesByAuthorClone,
};
// Think of inpendNestedKeys as hierarchically categorizing everything
//   after the first arg into the first arg
// Access key1 of container and either INitialize or apPEND value to key2's list
function inpendNestedKeys(container, key1, key2, value) {
    var _a;
    if (container[key1] === undefined) {
        container[key1] = (_a = {}, _a[key2] = [value], _a); // initialize1
    }
    else {
        if (container[key1][key2] === undefined) {
            container[key1][key2] = [value]; // initialize2
        }
        else {
            container[key1][key2].push(value); // append
        }
    }
}
function getLines(poems, title) {
    var poem = poems.filter(function (poem) { return poem.title === title; })[0];
    return poem.lines;
}
function PoemView() {
    var _this = this;
    var _a = (0, react_1.useState)(Author_1.defaultAuthor), author = _a[0], setAuthor = _a[1];
    var _b = (0, react_1.useState)({
        open: false,
        severity: "info",
        message: "",
    }), toast = _b[0], setToast = _b[1];
    var parser = Parser_1.defaultParser;
    var extraLargeScreen = (0, useMediaQuery_1.default)(function (theme) {
        return theme.breakpoints.up("xl");
    });
    function setSnackOpen(openOrClosed) {
        setToast(function (prevToast) { return (__assign(__assign({}, prevToast), { open: openOrClosed })); });
    }
    function toastAlert(message, severity) {
        setToast({ message: message, severity: severity, open: true });
    }
    /* setHighestRankFetchedPoem Update the fetched poems to the "best" results
        - sets the value of fetchedPoems 'current' key to the first-most URL of poetryURLs
        - calls setAuthor on the latest data
      */
    function setHighestRankFetchedPoem() {
        for (var _i = 0, poetryURLs_1 = poetryURLs; _i < poetryURLs_1.length; _i++) {
            var url = poetryURLs_1[_i];
            if (fetchedAuthorData[url] === undefined ||
                fetchedAuthorData[url] === null) {
                return;
            }
            var poems_2 = fetchedAuthorData[url];
            if (Object.keys(poems_2).length > 0) {
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
            var authorName = authorNames.current[authorIndex];
            var titles = titlesByAuthor.current[authorName];
            var title = titles[0];
            var lines = getLines(fetchedAuthorData.current[authorName], title);
            var currentPoem = new Poem_1.default(authorName, title, lines);
            setAuthor(new Author_1.default({
                name: authorName,
                titles: titles,
                authorNames: authorNames.current,
                currentPoem: currentPoem,
                currentParser: parser,
            }));
        }
    }
    /* Updating Author (and Poem) state:
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
    var AuthorStorage = /** @class */ (function () {
        function AuthorStorage() {
        }
        Object.defineProperty(AuthorStorage.prototype, "storageKey", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (url, keyType) {
                return "authorData::".concat(url, "::").concat(keyType);
            }
        });
        Object.defineProperty(AuthorStorage.prototype, "join", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (strings) {
                return strings.join(",");
            }
        });
        Object.defineProperty(AuthorStorage.prototype, "hasExactAuthors", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (url) {
                var storedAuthorNames = localStorage.getItem(this.storageKey(url, "authorNames"));
                return storedAuthorNames === this.join(authorNames[url]);
            }
        });
        Object.defineProperty(AuthorStorage.prototype, "setAuthorNames", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (url, authorNames) {
                localStorage.setItem(this.storageKey(url, "authorNames"), this.join(authorNames));
            }
        });
        // sets authorNames[url] when successful
        Object.defineProperty(AuthorStorage.prototype, "setData", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (url, data, authorNames) {
                try {
                    localStorage.setItem(this.storageKey(url, "PoemsByAuthor"), (0, lz_string_1.compress)(JSON.stringify(data)));
                    localStorage.setItem(this.storageKey(url, "TitlesByAuthor"), JSON.stringify(titlesByAuthor[url]));
                    this.setAuthorNames(url, authorNames);
                }
                catch (e) {
                    toastAlert("Error setting data for ".concat(url, ": ").concat(e), "error");
                }
            }
        });
        Object.defineProperty(AuthorStorage.prototype, "getPoemsByAuthor", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (url) {
                var data = localStorage.getItem(this.storageKey(url, "PoemsByAuthor"));
                if (data === null) {
                    throw Error("Local Storage has no poems for ".concat(url));
                }
                return JSON.parse((0, lz_string_1.decompress)(data));
            }
        });
        Object.defineProperty(AuthorStorage.prototype, "getTitlesByAuthor", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (url) {
                var data = localStorage.getItem(this.storageKey(url, "TitlesByAuthor"));
                if (data === null) {
                    throw Error("Local Storage has no titles for ".concat(url));
                }
                return JSON.parse(data);
            }
        });
        return AuthorStorage;
    }());
    // Only fetch if author names has changed
    (0, react_1.useEffect)(function () {
        function fetchPoems(url) {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                var authorURL, response, authorJSON, countAuthors, authorLocalStorage, numAuthors, fetchMessage, severity, _i, _b, authorName, poemsByAuthorURL, fetchedPoemsInitial, titleInfo, authorInfo, _c, _d, poem, newPoemData;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            authorURL = url + "/author";
                            return [4 /*yield*/, fetch(authorURL)];
                        case 1:
                            response = _e.sent();
                            return [4 /*yield*/, response.json()];
                        case 2:
                            authorJSON = _e.sent();
                            countAuthors = 0;
                            authorNames[url] = authorJSON.authors;
                            if (((_a = authorNames[url]) === null || _a === void 0 ? void 0 : _a.length) === 0) {
                                throw "No authors found at ".concat(authorURL);
                            }
                            authorLocalStorage = new AuthorStorage();
                            if (authorLocalStorage.hasExactAuthors(url)) {
                                toastAlert("Author list has not changed from ".concat(url, ". Using cached data..."), "info");
                                fetchedAuthorData[url] = authorLocalStorage.getPoemsByAuthor(url);
                                titlesByAuthor[url] = authorLocalStorage.getTitlesByAuthor(url);
                                return [2 /*return*/];
                            }
                            numAuthors = authorNames[url].length;
                            fetchMessage = "Fetching ".concat(numAuthors, " authors from ").concat(url);
                            if (numAuthors > 50) {
                                fetchMessage += " (this will take a while) ...";
                                severity = "warning";
                            }
                            else {
                                fetchMessage += " ...";
                                severity = "info";
                            }
                            toastAlert(fetchMessage, severity);
                            _i = 0, _b = authorNames[url];
                            _e.label = 3;
                        case 3:
                            if (!(_i < _b.length)) return [3 /*break*/, 7];
                            authorName = _b[_i];
                            poemsByAuthorURL = "".concat(url, "/author/").concat(encodeURIComponent(authorName.trim()));
                            return [4 /*yield*/, fetch(poemsByAuthorURL)];
                        case 4:
                            response = _e.sent();
                            return [4 /*yield*/, response.json()];
                        case 5:
                            fetchedPoemsInitial = _e.sent();
                            titlesByAuthor.current[authorName] = []; // reset titlesByAuthor
                            titleInfo = titlesByAuthor;
                            authorInfo = fetchedAuthorData;
                            for (_c = 0, _d = fetchedPoemsInitial; _c < _d.length; _c++) {
                                poem = _d[_c];
                                inpendNestedKeys(titleInfo, url, authorName, poem.title);
                                newPoemData = {
                                    title: poem.title,
                                    lines: poem.lines,
                                };
                                inpendNestedKeys(authorInfo, url, authorName, newPoemData);
                            }
                            _e.label = 6;
                        case 6:
                            _i++;
                            return [3 /*break*/, 3];
                        case 7:
                            authorLocalStorage.setData(url, fetchedAuthorData[url], authorNames[url]);
                            return [2 /*return*/];
                    }
                });
            });
        }
        var fetchedPromises = poetryURLs.map(function (url) { return __awaiter(_this, void 0, void 0, function () {
            var error_1, msg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fetchPoems(url)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_1 = _a.sent();
                        msg = "message" in error_1 ? error_1.message : "Unknown error";
                        return [2 /*return*/, toastAlert("".concat(msg, ": ").concat(url), "error")];
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
        if (fetchedAuthorData.current[authorName] === undefined) {
            return; // not ready yet
        }
        var newLines = getLines(fetchedAuthorData.current[authorName], title);
        authorUpdater(function (clone) {
            clone.setPoem(new Poem_1.default(authorName, title, newLines));
        });
    }, [author.stagedTitleChange]);
    // When the author name changes, set the current title to the first one fetched
    (0, react_1.useEffect)(function () {
        var _a, _b;
        var authorName = author.name;
        if (fetchedAuthorData.current[authorName] === undefined) {
            return; // not ready yet
        }
        var newTitle = (_b = (_a = titlesByAuthor.current) === null || _a === void 0 ? void 0 : _a[authorName]) === null || _b === void 0 ? void 0 : _b[0];
        var newLines = getLines(fetchedAuthorData.current[authorName], newTitle);
        authorUpdater(function (clone) {
            // It is important to update the possible titles first,
            // so the selector will populate before the poem resets
            clone.titles = titlesByAuthor.current[clone.name];
            clone.setPoem(new Poem_1.default(authorName, newTitle, newLines));
        });
    }, [author.name]);
    return ((0, jsx_runtime_1.jsxs)("section", { children: [(0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, spacing: 2, direction: extraLargeScreen ? "row" : "column", children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 6, children: (author === null || author === void 0 ? void 0 : author.currentPoem) && ((0, jsx_runtime_1.jsx)(PoemSelector_1.default, { author: author, authorUpdater: authorUpdater })) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 6, children: (0, jsx_runtime_1.jsx)(ParserChallenger_1.default, { author: author, authorUpdater: authorUpdater, authorApplyWordFunc: authorApplyWordFunc }) })] }), (0, jsx_runtime_1.jsx)(SnackbarAlerts_1.default, __assign({}, toast, { setSnackOpen: setSnackOpen }))] }));
}
exports.default = PoemView;
exports.exportedForTesting = {
    inpendNestedKeys: inpendNestedKeys,
    getLines: getLines,
};
