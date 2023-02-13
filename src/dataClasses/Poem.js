"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultPoem = void 0;
var sonnets_1 = require("../data/sonnets");
var Poem = /** @class */ (function () {
  function Poem(author, title, lines) {
    Object.defineProperty(this, "author", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0,
    });
    Object.defineProperty(this, "title", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0,
    });
    Object.defineProperty(this, "lines", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0,
    });
    this.author = author;
    this.title = title;
    this.lines = lines;
  }
  return Poem;
})();
exports.default = Poem;
exports.defaultPoem = new Poem(
  sonnets_1.defaultAuthorName,
  sonnets_1.defaultTitle,
  sonnets_1.defaultPoemLines
);
