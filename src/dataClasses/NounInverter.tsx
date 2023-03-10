import * as R from "ramda";

import Author from "./Author";
import { Line, NounInverterRep, Stats, Tags } from "src/type-definitions";
import { Parser } from "./Parser";

const spannedWord = (
  mainClass: string,
  extraClasses: string,
  lineNum: number,
  wordNum: number,
  word: string
) =>
  `<span class="${mainClass} ${extraClasses}" id="word_${lineNum}_${wordNum}">${word}</span>`;

const punct = /([.,\/#!$%\^&\*;:{}=\-_`~()']+)/gm;
const spacePunct = /([\s.,\/#!$%\^&\*;:{}=\-_`~()']+)/gm;
const UNICODE_NBSP = "\u00A0";

/* A Noun Inverter
  for a specific parser and poem (lines of text) which are extracted from
  AuthorData

  Records weather the user has inverted the value of a word in a poem (changed
  "noun" -> "non-noun" or vice-versa)
  */
export class NounInverter {
  stats: Stats;
  parser: Parser;
  poemTextLines: Line[];
  rep: NounInverterRep;
  taggedWordsHTML: string | undefined;
  constructor(author: Author) {
    this.parser = author.currentParser;
    const lines = (this.poemTextLines = author.currentPoem.lines);

    this.stats = { falseNeg: 0, falsePos: 0 };
    // nounInverters are represented by jagged arrays of arrays indexed by
    //    (line, word) internally represented as zero-based arrays
    //    but externally represented as one-based.
    //    e.g. nounInverter.isInverted(3,7) === true
    //      means that the noun-state assigned by the parser for the word
    //      at line 3, word 7 has been inverted by the user
    //    i.e. inverted means now should be considered not-a-noun if originally
    //      a noun or vice-versa
    this.rep = lines ? new Array(lines.length).fill([]) : [[]];
    this.recomputeNounOutlines(); // completes initialization
  }

  // line, word are 1-based
  isInverted(line: number, word: number) {
    return this.rep[line - 1][word - 1];
  }

  // line, word are 1-based
  setInverted(line: number, word: number, wordIsInverted: boolean) {
    this.rep[line - 1][word - 1] = wordIsInverted;
  }

  // line, word are 1-based
  flip(line: number, word: number) {
    this.setInverted(line, word, !this.isInverted(line, word));
  }

  // lineNum is 1-based
  initLineIfNeeded(lineNum: number, lineLength: number) {
    if (this.rep.length === 0) return;
    if (this.rep[lineNum - 1].length === 0) {
      this.rep[lineNum - 1] = new Array(lineLength).fill(false);
    }
  }

  // Return the HTML of all the words tagged (as either noun or non-noun)
  _getTaggedWordsHTML() {
    const lines: Line[] = this.poemTextLines;
    const parser = this.parser;

    if (!lines) {
      return "";
    }
    let outlined: string[] = [];

    const addNounSpans = (tagged: Tags, lineNum: number) => {
      let mainClass;
      let extraClasses;
      let wordNum = 1; // 1-based

      return tagged.map(([word, tag]) => {
        extraClasses = "";
        let nounTest: boolean = tag === "NN" || tag === "NNS";
        if (this.isInverted(lineNum, wordNum)) {
          nounTest = !nounTest;
          extraClasses = "inverted";
        }
        mainClass = nounTest ? "noun" : "non-noun";
        return spannedWord(mainClass, extraClasses, lineNum, wordNum++, word);
      });
    };

    /* Algorithm
      - match the spaces and punctuation, save that as matchedSpacePunct
      - remove all the punctuation from the words and tag, saving in as
        parser.tagWordsInLine
      - Use the word count of each line to initialize each line of the NounInverter
      - Even out the saved punctuation and lines for recombination
      - Recombine the spaces and words in the right order, save as outlined
      - mark the current NounInverter as cloneable now that initialization is complete
    */
    lines.forEach((line: Line, index: number) => {
      let lineNum = index + 1;

      if (line === "") {
        outlined.push("");
        return;
      }
      const matchedSpacePunct =
        line.match(spacePunct)?.map((s) => s.replace(/ /g, UNICODE_NBSP)) || [];

      let taggedWords = parser.tagWordsInLine(
        line.replaceAll(punct, "")
      ) as unknown as Tags;
      this.initLineIfNeeded(lineNum, taggedWords.length);

      // even out the lengths of the two arrays for zipping
      if (matchedSpacePunct.length < taggedWords.length) {
        matchedSpacePunct.push("");
      } else if (taggedWords.length < matchedSpacePunct.length) {
        taggedWords.push(["", ""]);
      }

      // zip results in the correct order (i.e. starting with a space or not)
      let first, second;
      if (line[0].match(/\s/)) {
        first = matchedSpacePunct;
        second = addNounSpans(taggedWords, lineNum);
      } else {
        first = addNounSpans(taggedWords, lineNum);
        second = matchedSpacePunct;
      }
      const recombined = R.unnest(R.zip(first, second)).join("");
      outlined.push(recombined);
    });
    return outlined.join("<br>");
  }

  recomputeNounOutlines() {
    // Using getElementById here because the typical alternative seems far too
    // complicated: invoking useRef. We'd have to pass the ref through
    // authorData which contains the nounInverter. Note that the nounInverter
    // is cached so it seems like a potential problem if it references a ref
    // that gets re-created when the page rerenders.
    const textOuput = document.getElementById("text-output");
    if (!textOuput) return;
    textOuput.innerHTML = this.taggedWordsHTML = this._getTaggedWordsHTML();
  }
}

// Note: Uses string names as identifiers of the parser and poem because JS
// Map objects with non-string keys are unwieldy
export function nounInverterID(author: Author) {
  const stringIDs = [
    author.currentParser.name,
    author.name,
    author.currentPoem.title,
  ];
  const joinedArgs = stringIDs.join(" -- ");
  return joinedArgs;
}

/* store and reuse nounInverters in the memo cache
  keys are noun inverter IDs
  values are nounInverter objects 
*/
let memoCache = new Map();

/* NounInverterFactory

  Essentially maps (parser, poem) -> nounInverter (new or cached)

  Parser and poem are extracted from the current values of an AuthorData object

  Behaves as if (parserName, authorName, poemTitle) is a tuple key.

  The factory returns the existing nounInverter if it already exists (in the
  memoCache) or creates a new one.
*/
export class NounInverterFactory {
  inverter: any;
  constructor(author: Author) {
    this.get(author);
  }

  get(author: Author) {
    const id = nounInverterID(author);
    if (!memoCache.has(id)) {
      memoCache.set(id, new NounInverter(author));
    }
    return (this.inverter = memoCache.get(id));
  }
}

export default NounInverter;
