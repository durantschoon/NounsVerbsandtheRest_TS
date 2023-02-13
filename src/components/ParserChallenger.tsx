import { useState, useEffect } from "react";

import Author from "../dataClasses/Author";
import ParserSelector from "./ParserSelector";
import WordStats from "./WordStats";

import {
  AuthorClone,
  AuthorCloneUpdatorType,
  AuthorCloneUpdatorWithWordType,
  AuthorCloneApplyWordFuncType,
  AuthorUpdatorType,
  Stats,
} from "src/type-definitions";

type Props = {
  author: Author;
  authorUpdater: AuthorUpdatorType;
  authorApplyWordFunc: AuthorCloneApplyWordFuncType;
};

function ParserChallenger({
  author,
  authorUpdater,
  authorApplyWordFunc,
}: Props) {
  const [stats, setStats] = useState({ falsePos: 0, falseNeg: 0 } as Stats);

  const _drawNounOutlines: AuthorCloneUpdatorType = (author: AuthorClone) => {
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
    const stats = {
      falsePos: document.getElementsByClassName("non-noun inverted").length,
      falseNeg: document.getElementsByClassName("noun inverted").length,
    };
    setStats(stats);

    // update the clone before binding it in the click handlers
    author.updateCurrentStats(stats);
    _addClickHandlersToSpans(author);
  };
  // TODO: verify this rewrite works
  const drawNounOutlinesUpdater = () => authorUpdater(_drawNounOutlines);

  // changing the poem (lines) or parser will trigger redrawing of noun outlines
  useEffect(drawNounOutlinesUpdater, [
    author.currentPoem.title,
    author.currentParser.name,
  ]);

  const _invertNoun: AuthorCloneUpdatorWithWordType = (
    author: AuthorClone,
    line: number,
    word: number
  ) => {
    author.nounInverter!.flip(line, word);
    _drawNounOutlines(author);
  };
  const applyInvertNouns = (author: AuthorClone, line: number, word: number) =>
    authorApplyWordFunc(author, _invertNoun, line, word);

  // clicking on a word should also trigger redrawing of noun outlines
  function _addClickHandlersToSpans(author: AuthorClone) {
    // Side effect: Adds _initialized_inversion property to the target of the
    // event to prevent the click handler from being called more than once.
    const getWordsAndInvert = (event: any) => {
      event.stopPropagation();
      if (event.target._initialized_inversion === true) return;
      const [line, word] = event.target.id.split("_").slice(1);
      applyInvertNouns(author, +line, +word);
      Object.defineProperty(event.target, "_initialized_inversion", {
        value: true,
      });
    };

    // Oddly, at some point long after this was working otherwise spans stopped
    // detecting clicks but only on the first load. Actually, they triggered
    // twice which just toggled them back to the original state. This is a hack
    // to prevent that.
    document
      .getElementById("text-output")
      ?.addEventListener("click", getWordsAndInvert);

    const classNames = ["noun", "non-noun"];
    for (let className of classNames) {
      const spans = Array.from(document.getElementsByClassName(className));
      for (let span of spans) {
        span.addEventListener("click", getWordsAndInvert);
      }
    }
  }

  // the poem with tagged nouns is in the text-output div
  return (
    <>
      <ParserSelector
        {...{ authorUpdater, parserName: author.currentParser.name }}
      />

      <h1> Correct what is and is not a noun </h1>
      <ul>
        <li>
          Click on a word with the <span className="non-noun">Plus</span>{" "}
          <img id="non-noun-cursor-img"></img> cursor to change a word INTO a
          noun.
        </li>
        <li>
          Click on a word with the <span className="noun">Back</span>{" "}
          <img id="noun-cursor-img"></img> cursor to change a word BACK TO a
          non-noun.
        </li>
      </ul>
      <div id="text-output"></div>

      <WordStats {...{ parserName: author.currentParser.name, stats }} />
    </>
  );
}

export default ParserChallenger;
