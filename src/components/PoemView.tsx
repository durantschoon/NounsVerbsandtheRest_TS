import React, { useState, useEffect } from "react";
import { compress, decompress } from "lz-string";
import * as R from "ramda";

import { Grid, Theme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import PoemSelector from "./PoemSelector";
import ParserChallenger from "./ParserChallenger";
import SnackbarAlerts from "./SnackbarAlerts";

import {
  AuthorClone,
  AuthorCloneUpdatorType,
  AuthorCloneUpdatorWithWordType,
  AuthorCloneApplyWordFuncType,
  AuthorName,
  AuthorUpdatorType,
  Line,
  PoemsByAuthor,
  PoemData,
  PoetryURL,
  TitlesByAuthor,
  Toast,
} from "src/type-definitions";

import Author, { defaultAuthor } from "../dataClasses/Author";
import { defaultParser } from "../dataClasses/Parser";
import Poem from "../dataClasses/Poem";
import poems, {
  defaultAuthorNames,
  defaultTitlesByAuthor,
} from "../data/poems";

import "./PoemView.css";

// Order poetry urls "best" to "worst" (highest priority first)
// Define as an enum so that we can create a types later
// const poetryURLs: PoetryURL[] = [
//   "http://fetch-should-fail.com",
//   "http://165.227.95.56:3000",
// ]
// debug values
// const poetryURLs: PoetryURL[] = ["https://poetrydb.org", "http://165.227.95.56:3000"]
const poetryURLs: PoetryURL[] = ["https://poetrydb.org"];

/* For the following data structures with these keys being valid
   'default', 'current' or a URL from poetryURLs
   - 'current' initially points to the 'default' entry, but after
     poems are fetched, 'current' will point the "best" values fetched from a url.
     See PoetryURLs for definition of "best"
  */

type FetchedAuthorDataSemantic = {
  default: PoemsByAuthor;
  current: PoemsByAuthor;
};
type FetchedAuthorDataURL = { [P in PoetryURL]?: PoemsByAuthor };
type FetchedAuthorData = FetchedAuthorDataSemantic & FetchedAuthorDataURL;

const fetchedAuthorData: FetchedAuthorData = {
  default: poems,
  current: poems,
};

type FetchedAuthorNamesSemantic = {
  default: AuthorName[];
  current: AuthorName[];
};
type FetchedAuthorNamesURL = { [P in PoetryURL]?: AuthorName[] };
type FetchedAuthorNames = FetchedAuthorNamesSemantic & FetchedAuthorNamesURL;

let authorNames: FetchedAuthorNames = {
  default: defaultAuthorNames,
  current: defaultAuthorNames,
};

type AuthorTitles = { [author: string]: string[] };
type FetchedTitlesByAuthorSemantic = {
  default: AuthorTitles;
  current: AuthorTitles;
};
type FetchedTitlesByAuthorURL = { [P in PoetryURL]?: AuthorTitles };
type FetchedTitlesByAuthor = FetchedTitlesByAuthorSemantic &
  FetchedTitlesByAuthorURL;

let titlesByAuthorClone = R.clone(defaultTitlesByAuthor);
let titlesByAuthor: FetchedTitlesByAuthor = {
  default: titlesByAuthorClone,
  current: titlesByAuthorClone,
};

type Compressible = FetchedAuthorData | FetchedTitlesByAuthor;

// two nested string keys access an array of any type
type NestedContainer = { [key1: string]: { [key2: string]: any[] } };

// Think of inpendNestedKeys as hierarchically categorizing everything
//   after the first arg into the first arg
// Access key1 of container and either INitialize or apPEND value to key2's list
function inpendNestedKeys(
  container: NestedContainer,
  key1: string,
  key2: string,
  value: any,
) {
  if (container[key1] === undefined) {
    container[key1] = { [key2]: [value] }; // initialize1
  } else {
    if (container[key1][key2] === undefined) {
      container[key1][key2] = [value]; // initialize2
    } else {
      container[key1][key2].push(value); // append
    }
  }
}

function getLines(poems: PoemData[], title: string): Line[] {
  const poem: PoemData = poems.filter(
    (poem: PoemData) => poem.title === title,
  )[0];
  return poem.lines;
}

function PoemView() {
  const [author, setAuthor] = useState(defaultAuthor as Author);
  const [toast, setToast] = useState({
    open: false,
    severity: "info",
    message: "",
  });

  const parser = defaultParser;

  const extraLargeScreen = useMediaQuery<Theme>((theme: Theme) =>
    theme.breakpoints.up("xl"),
  );

  function setSnackOpen(openOrClosed: boolean) {
    setToast((prevToast: Toast) => ({ ...prevToast, open: openOrClosed }));
  }

  function toastAlert(message: string, severity: string) {
    setToast({ message, severity, open: true });
  }

  /* setHighestRankFetchedPoem Update the fetched poems to the "best" results
      - sets the value of fetchedPoems 'current' key to the first-most URL of poetryURLs
      - calls setAuthor on the latest data
    */
  function setHighestRankFetchedPoem() {
    for (let url of poetryURLs) {
      if (
        fetchedAuthorData[url] === undefined ||
        fetchedAuthorData[url] === null
      ) {
        return;
      }
      const poems = fetchedAuthorData[url]!;
      if (Object.keys(poems).length > 0) {
        fetchedAuthorData.current = fetchedAuthorData[url]!;
        authorNames.current = authorNames[url]!;
        titlesByAuthor.current = titlesByAuthor[url]!;
        break;
      }
    }
    if (fetchedAuthorData.current !== fetchedAuthorData.default) {
      // Choose the 2nd poet just because we want it to be
      // Emily Dickinson if the vanilla poemdb server comes up.
      // But set it to 0th if we end up with only one poet
      // because some other data has loaded.
      const authorIndex = Math.min(1, authorNames.current.length - 1);
      const authorName: AuthorName = authorNames.current[authorIndex];

      const titles = titlesByAuthor.current[authorName];
      const title = titles[0];
      const lines = getLines(fetchedAuthorData.current[authorName], title);

      const currentPoem = new Poem(authorName, title, lines);

      setAuthor(
        new Author({
          name: authorName,
          titles: titles,
          authorNames: authorNames.current,
          currentPoem,
          currentParser: parser,
        }),
      );
    }
  }

  /* Updating Author (and Poem) state:
      - Chain together any number of functions that will modify the authorData
        and pass those into authorUpdater
      - Clones current authorData
      - Applies (chained) func(s) to modify clone (with any args)
      - Finally, sets the new author state to the modified clone
    */
  const authorUpdater: AuthorUpdatorType = (
    func: AuthorCloneUpdatorType,
    args?: any[],
  ) => {
    var clone = R.clone(author); // deep copy for modification and resetting
    func(clone, ...(args ?? []));
    setAuthor(clone);
  };

  const authorApplyWordFunc: AuthorCloneApplyWordFuncType = (
    clone: AuthorClone,
    func: AuthorCloneUpdatorWithWordType,
    line: number,
    word: number,
  ) => {
    func(clone, line, word);
    setAuthor(clone);
  };

  class AuthorStorage {
    storageKey(url: PoetryURL, keyType: string) {
      return `authorData::${url}::${keyType}`;
    }

    join(strings: string[]): string {
      return strings.join(",");
    }

    hasExactAuthors(url: PoetryURL) {
      const storedAuthorNames = localStorage.getItem(
        this.storageKey(url, "authorNames"),
      );
      return storedAuthorNames === this.join(authorNames[url]!);
    }

    setAuthorNames(url: PoetryURL, authorNames: AuthorName[]): void {
      localStorage.setItem(
        this.storageKey(url, "authorNames"),
        this.join(authorNames),
      );
    }

    // sets authorNames[url] when successful
    setData(
      url: PoetryURL,
      data: PoemsByAuthor,
      authorNames: AuthorName[],
    ): void {
      try {
        localStorage.setItem(
          this.storageKey(url, "PoemsByAuthor"),
          compress(JSON.stringify(data)),
        );
        localStorage.setItem(
          this.storageKey(url, "TitlesByAuthor"),
          JSON.stringify(titlesByAuthor[url]),
        );
        this.setAuthorNames(url, authorNames);
      } catch (e: any) {
        toastAlert(`Error setting data for ${url}: ${e}`, "error");
      }
    }

    getPoemsByAuthor(url: PoetryURL): PoemsByAuthor {
      const data = localStorage.getItem(this.storageKey(url, "PoemsByAuthor"));
      if (data === null) {
        throw Error(`Local Storage has no poems for ${url}`);
      }
      return JSON.parse(decompress(data)!);
    }

    getTitlesByAuthor(url: PoetryURL): TitlesByAuthor {
      const data = localStorage.getItem(this.storageKey(url, "TitlesByAuthor"));
      if (data === null) {
        throw Error(`Local Storage has no titles for ${url}`);
      }
      return JSON.parse(data);
    }
  }

  // Only fetch if author names has changed
  useEffect(() => {
    async function fetchPoems(url: PoetryURL) {
      const authorURL = url + "/author";
      let response = await fetch(authorURL);
      const authorJSON = await response.json();
      let countAuthors = 0;

      authorNames[url] = authorJSON.authors;
      if (authorNames[url]?.length === 0) {
        throw `No authors found at ${authorURL}`;
      }

      const authorLocalStorage = new AuthorStorage();
      if (authorLocalStorage.hasExactAuthors(url)) {
        toastAlert(
          `Author list has not changed from ${url}. Using cached data...`,
          "info",
        );
        fetchedAuthorData[url] = authorLocalStorage.getPoemsByAuthor(url)!;
        titlesByAuthor[url] = authorLocalStorage.getTitlesByAuthor(url)!;
        return;
      }

      const numAuthors = authorNames[url]!.length;
      let fetchMessage = `Fetching ${numAuthors} authors from ${url}`;
      let severity;
      if (numAuthors > 50) {
        fetchMessage += ` (this will take a while) ...`;
        severity = "warning";
      } else {
        fetchMessage += ` ...`;
        severity = "info";
      }
      toastAlert(fetchMessage, severity);

      // fetch all the new poems before triggering an author / title change
      for (let authorName of authorNames[url]!) {
        let poemsByAuthorURL = `${url}/author/${encodeURIComponent(
          authorName.trim(),
        )}`;

        response = await fetch(poemsByAuthorURL);
        let fetchedPoemsInitial = await response.json();

        titlesByAuthor.current[authorName] = []; // reset titlesByAuthor

        // Add catetorized data to titlesByAuthor and fetchedAuthorData
        const titleInfo = titlesByAuthor as NestedContainer; // for brevity
        const authorInfo = fetchedAuthorData as unknown as NestedContainer; // for brevity
        for (let poem of fetchedPoemsInitial!) {
          inpendNestedKeys(titleInfo, url, authorName, poem.title);
          const newPoemData: PoemData = {
            title: poem.title,
            lines: poem.lines,
          };
          inpendNestedKeys(authorInfo, url, authorName, newPoemData);
        }
      }

      authorLocalStorage.setData(
        url,
        fetchedAuthorData[url]!,
        authorNames[url]!,
      );
    }
    const fetchedPromises = poetryURLs.map(async (url: PoetryURL) => {
      try {
        return await fetchPoems(url);
      } catch (error: any) {
        const msg = "message" in error ? error.message : "Unknown error";
        return toastAlert(`${msg}: ${url}`, "error");
      }
    });
    Promise.all(fetchedPromises).then(() => setHighestRankFetchedPoem());
  }, []);

  // When the title changes, update the lines of poetry
  useEffect(() => {
    const authorName: AuthorName = author.name;
    const title = author.stagedTitleChange;

    if (fetchedAuthorData.current[authorName] === undefined) {
      return; // not ready yet
    }
    const newLines: Line[] = getLines(
      fetchedAuthorData.current[authorName],
      title,
    );

    authorUpdater((clone: AuthorClone) => {
      clone.setPoem(new Poem(authorName, title, newLines));
    });
  }, [author.stagedTitleChange]);

  // When the author name changes, set the current title to the first one fetched
  useEffect(() => {
    const authorName = author.name;
    if (fetchedAuthorData.current[authorName] === undefined) {
      return; // not ready yet
    }
    const newTitle = titlesByAuthor.current?.[authorName]?.[0];
    const newLines = getLines(fetchedAuthorData.current[authorName], newTitle);

    authorUpdater((clone: AuthorClone) => {
      // It is important to update the possible titles first,
      // so the selector will populate before the poem resets
      clone.titles = titlesByAuthor.current[clone.name];
      clone.setPoem(new Poem(authorName, newTitle, newLines));
    });
  }, [author.name]);

  return (
    <section>
      <Grid
        container
        spacing={2}
        direction={extraLargeScreen ? "row" : "column"}
      >
        <Grid item xs={6}>
          {author?.currentPoem && (
            <PoemSelector {...{ author, authorUpdater }} />
          )}
        </Grid>
        <Grid item xs={6}>
          <ParserChallenger
            {...{ author, authorUpdater, authorApplyWordFunc }}
          />
        </Grid>
      </Grid>
      <SnackbarAlerts {...{ ...toast, setSnackOpen }} />
    </section>
  );
}

export default PoemView;

export const exportedForTesting = {
  inpendNestedKeys,
  getLines,
};
