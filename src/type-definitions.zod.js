"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadingProgress =
  exports.parserMap =
  exports.tags =
  exports.authorMethod =
  exports.authorData =
  exports.nounInverter =
  exports.nounInverterRep =
  exports.parser =
  exports.stats =
  exports.falseNegativeCount =
  exports.falsePositiveCount =
  exports.titlesByAuthor =
  exports.poemsByAuthor =
  exports.poem =
  exports.poemData =
  exports.line =
  exports.title =
  exports.authorName =
    void 0;
var zod_1 = require("zod");
var Parser_1 = require("./dataClasses/Parser");
var Poem_1 = __importDefault(require("./dataClasses/Poem"));
// Experiment: collect all the schemas in one file
exports.authorName = zod_1.z.string();
exports.title = zod_1.z.string();
exports.line = zod_1.z.string();
// "Data" suffix implies a parseable json object
exports.poemData = zod_1.z.record(exports.title, zod_1.z.array(exports.line));
exports.poem = zod_1.z.instanceof(Poem_1.default);
exports.poemsByAuthor = zod_1.z.record(exports.authorName, exports.poemData);
exports.titlesByAuthor = zod_1.z.record(
  exports.authorName,
  zod_1.z.array(exports.title)
);
exports.falsePositiveCount = zod_1.z.number().refine(
  function (val) {
    return val >= 0;
  },
  function (val) {
    return {
      message: "False Positive ".concat(
        val,
        " must be greater than or equal to 0"
      ),
    };
  }
);
exports.falseNegativeCount = zod_1.z.number().refine(
  function (val) {
    return val >= 0;
  },
  function (val) {
    return {
      message: "False Negative ".concat(
        val,
        " must be greater than or equal to 0"
      ),
    };
  }
);
exports.stats = zod_1.z.object({
  falsePos: exports.falsePositiveCount,
  falseNeg: exports.falseNegativeCount,
});
exports.parser = zod_1.z.instanceof(Parser_1.Parser);
// export const parserData = z.object({ name: z.string() })
// How NounInverter is represented internally
// for a given (line, word) in a poem, a nounInverter will tell you if the
//    noun state has been inverted (by the user in contrast to the parser)
// nounInverters are represented as `rep` by jagged arrays of arrays indexed by
//    (line, word) internally represented as zero-based arrays
//    but externally represented as one-based.
//    e.g. nounInverter.isInverted(1,1) is for the first word in the poem
//    e.g. nounInverter.isInverted(3,7) === true
//      means that the noun-state assigned by the parser for the word
//      at line 3, word 7 has been inverted by the user
//    i.e. inverted means now should be considered not-a-noun if originally
//      a noun and vice-versa
exports.nounInverterRep = zod_1.z.array(zod_1.z.array(zod_1.z.boolean()));
exports.nounInverter = zod_1.z.object({
  parser: exports.parser,
  falsePositiveCount: exports.falsePositiveCount,
  falseNegativeCountCount: exports.falseNegativeCount,
  rep: exports.nounInverterRep,
  recomputeNounOutlines: zod_1.z.function(),
});
// "Data" suffix implies a parseable json object
exports.authorData = zod_1.z.object({
  name: exports.authorName,
  titles: zod_1.z.array(exports.title),
  authorNames: zod_1.z.array(exports.authorName),
  currentPoem: exports.poem,
  currentParser: exports.parser,
});
exports.authorMethod = zod_1.z.function();
// Parsing
// used by the parser to store the results of parsing a poem
exports.tags = zod_1.z.array(
  zod_1.z.tuple([zod_1.z.string(), zod_1.z.string()])
);
exports.parserMap = zod_1.z.record(
  zod_1.z.string(),
  zod_1.z.instanceof(Parser_1.Parser)
);
// Loading
var percentage = zod_1.z.number().refine(function (val) {
  return val >= 0 && val <= 100;
});
exports.loadingProgress = zod_1.z.object({
  authorName: zod_1.z.string(),
  percentage: percentage,
});
