import { string, z } from "zod";

import { Parser } from "./dataClasses/Parser";
import Poem from "./dataClasses/Poem";

// Experiment: collect all the schemas in one file

export const authorName = z.string();
export const title = z.string();
export const line = z.string();

// "Data" suffix implies a parseable json object
export const poemData = z.object({
    title: title,
    lines: z.array(line)
});
export const poem = z.instanceof(Poem);

export const poemsByAuthor = z.record(authorName, z.array(poemData));
export const titlesByAuthor = z.record(authorName, z.array(title));

export const falsePositiveCount =  z.number().refine(
    (val) => val >= 0,
    (val) => ({ message: `False Positive ${val} must be greater than or equal to 0` })
)
export const falseNegativeCount = z.number().refine(
    (val) => val >= 0,
    (val) => ({ message: `False Negative ${val} must be greater than or equal to 0` })
)
export const stats = z.object({
    falsePos: falsePositiveCount, 
    falseNeg: falseNegativeCount
})

export const parser = z.instanceof(Parser);
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
export const nounInverterRep = z.array(z.array(z.boolean()))
export const nounInverter = z.object({
    parser,
    falsePositiveCount,
    falseNegativeCount,
    rep: nounInverterRep,
    recomputeNounOutlines: z.function(),
})

// "Data" suffix implies a parseable json object
export const authorData = z.object({
    name: authorName,
    titles: z.array(title),
    authorNames: z.array(authorName),
    currentPoem: poem,
    currentParser: parser,
})

export const authorMethod = z.function()

// Parsing
// used by the parser to store the results of parsing a poem
export const tags = z.array(z.tuple([z.string(), z.string()]))
export const parserMap = z.record(z.string(), z.instanceof(Parser));

// Loading
const percentage = z.number().refine(
    (val) => val >= 0 && val <= 100,
)

export const url = z.string().url();
export const poetryURL = url;

export const toast = z.object({ 
    message: z.string(), 
    severity: z.union([z.literal("error"), z.literal("warning"), z.literal("info"), z.literal("success")]),
    open: z.boolean() 
});