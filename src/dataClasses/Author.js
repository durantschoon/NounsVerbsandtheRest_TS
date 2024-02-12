"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultAuthor = void 0;
var NounInverter_1 = require("./NounInverter");
var Parser_1 = require("./Parser");
var Poem_1 = require("./Poem");
var poems_1 = require("../data/poems");
var Author = /** @class */ (function () {
    function Author(data) {
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "authorNames", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // current list of alternative author names
        Object.defineProperty(this, "nounInverterFactory", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "titles", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "stagedTitleChange", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "currentPoem", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "nounInverter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "currentParser", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // TS does not allow Object.assign by itself
        //   because it cannot be certain currentPoem is set
        // Object.assign(this, data);
        this.name = data.name;
        this.titles = data.titles;
        this.authorNames = data.authorNames;
        this.currentPoem = data.currentPoem;
        this.currentParser = data.currentParser;
        this.nounInverterFactory = new NounInverter_1.NounInverterFactory(this);
        this.stagedTitleChange = this.currentPoem.title;
        this.recomputeNounOutlines();
    }
    Object.defineProperty(Author.prototype, "recomputeNounOutlines", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            this.nounInverter = this.nounInverterFactory.get(this);
            this.nounInverter.recomputeNounOutlines();
        }
    });
    Object.defineProperty(Author.prototype, "setPoem", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (newPoem) {
            this.currentPoem = newPoem;
            this.recomputeNounOutlines();
        }
    });
    Object.defineProperty(Author.prototype, "setParser", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (newParser) {
            this.currentParser = newParser;
            this.recomputeNounOutlines();
        }
    });
    Object.defineProperty(Author.prototype, "updateCurrentStats", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (stats) {
            var nounInverter = this.nounInverter;
            if (nounInverter) {
                nounInverter.stats = stats;
            }
        }
    });
    return Author;
}());
exports.default = Author;
exports.defaultAuthor = new Author({
    name: poems_1.defaultAuthorName,
    titles: poems_1.defaultTitles,
    authorNames: poems_1.defaultAuthorNames,
    currentPoem: Poem_1.defaultPoem,
    currentParser: Parser_1.defaultParser,
});
