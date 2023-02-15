# NounsVerbsAndREST (TypeScript edition)

# Install

Running `npm install` first by itself seemed to work if I then followed it with parcel as a second command:

`npm install -D parcel`

# Run

`npm run serve`

# Features

## Loads poems data from poetrydb.org

and caches the results in local storage 
(fetches on load if the list of author names changes)


## Choose a Poet from the drop down menu

## Choose a Poem from the drop down menu

## Choose a Parser (parts-of-speech)

Manually challenge the parsers choices (for what is a noun) by clicking on the words in the right box. View live statistics for false positives (red circles) and false negatives (blue rectangles).

## Choose a different Parser (en-pos)

Again manually challenge the parser choices and switch back and forth between parser results by clicking on the parser name radio buttons (top magenta box)

# What is this?

This is a project I started where I was going to build a new react app every day for practice. However, I kept modifying this project instead of starting new ones.

I stopped around Valentine's Day 2023 (hence the sort-of Valentine's Day theme).

## Notes

- This has no tests (but I definitely plann to start with tests and try TDD on my next practice project)
- It's set up to load from multiple URLs (I briefly hosted a test server on Digital Ocean, see my [poetrydb](https://github.com/durantschoon/poetrydb) fork). The code for multiple URLs is still in this repo, but it adds complexity if you only care about loading from a single source.
- I started to explore using [react-query](https://react-query-v3.tanstack.com) in this app, but realized it would not work well with arbitrary multiple URLs to fetch from so I removed it.
- I explored MUI, including setting up a theme, modifying styles, toast alerts and adding a little responsiveness (when the window narrows).
- I started with a progress bar, but you can't set state from inside a loop so I removed it. I recently thought of a way to make it work, but I probably won't implement it in this project (I'd keep the list of remaining poets, update the progress bar and set the state of remaining poets to be the list with the last one popped off, then call the function again until there are no more poets left in the list). Now I just have a warning the first time you load the poets that downloading will take a while.
- I eventually converged to a single store for all the state manually. Next project I will explore state management tools. 
