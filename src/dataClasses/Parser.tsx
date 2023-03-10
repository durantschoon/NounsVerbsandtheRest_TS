import { Tagger, Lexer } from "parts-of-speech";
import { Tag } from "en-pos";

import { Line, ParsersByName } from "src/type-definitions";
class Parser {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  tagWordsInLine(arg0: any) {
    throw new Error("Method not implemented.");
  }
}

class PartsOfSpeech extends Parser {
  info: { title: string; body: string; link: string };
  constructor() {
    super("parts-of-speech");
    this.info = {
      title: "Parts-of-Speech",
      body: "Javascript port of Mark Watson's FastTag Part of Speech Tagger which was itself based on Eric Brill's trained rule set and English lexicon",
      link: "https://github.com/dariusk/pos-js#readme",
    };
  }
  tagWordsInLine(line: Line) {
    let words = new Lexer().lex(line);
    let tagger = new Tagger();
    return tagger.tag(words);
  }
}

class EnPos extends Parser {
  info: { title: string; body: string; link: string };
  constructor() {
    super("en-pos");
    this.info = {
      title: "en-pos",
      body: "A better English POS tagger written in JavaScript",
      link: "https://github.com/finnlp/en-pos#readme",
    };
  }
  tagWordsInLine(line: string) {
    const words = line.split(/\s/).filter(Boolean); // remove falsey values
    var tags = new Tag(words)
      .initial() // initial dictionary and pattern based tagging
      .smooth().tags; // further context based smoothing
    const tagged = tags.map((tag, i) => [words[i], tag]);
    return tagged;
  }
}

const PoS = new PartsOfSpeech();
const EnP = new EnPos();

const parsers = [PoS, EnP];
const defaultParser = parsers[0];

let buildParsersByName: ParsersByName = {};
for (let parser of parsers) {
  buildParsersByName[parser.name] = parser;
}
const parsersByName = Object.freeze(buildParsersByName);

export { Parser, parsers, defaultParser, parsersByName, PoS, EnP };
