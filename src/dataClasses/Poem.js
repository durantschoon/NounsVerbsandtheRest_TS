"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultPoem = void 0;
var poems_1 = require("../data/poems");
var Poem = /** @class */ (function () {
    function Poem(author, title, lines) {
        Object.defineProperty(this, "author", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "title", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "lines", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.author = author;
        this.title = title;
        this.lines = lines;
    }
    return Poem;
}());
exports.default = Poem;
exports.defaultPoem = new Poem(poems_1.defaultAuthorName, poems_1.defaultTitle, poems_1.defaultPoemLines);
