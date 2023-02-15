# NounsVerbsAndREST (TypeScript edition)

# Install

Running `npm install` first by itself seemed to work if I then followed it with parcel as a second command:

`npm install -D parcel`

Because of some weird vite dependencies, I often find I have to install new packages with --force, due to version mismatch warnings.

# Run

`npm run serve`

# Features

## Loads poem data from poetrydb.org

and caches the results in local storage 
(it fetches on the next load if the list of author names changes)

![NVR_using_cache](https://user-images.githubusercontent.com/12535192/219119332-154f5935-3f47-48f0-ac45-7dfaebb5ab5a.png)


## Choose a Poet from the drop down menu

![NVR_choose_poet](https://user-images.githubusercontent.com/12535192/219119366-6ac82a14-b24b-44de-98f0-bb7ce826996a.png)


## Choose a Poem from the drop down menu

![NVR_choose_poem](https://user-images.githubusercontent.com/12535192/219119444-5ec99d01-bd78-4385-a076-662027efbbbe.png)


## Choose a Parser (parts-of-speech)

Manually challenge the parser's choices (for what is a noun) by clicking on the words in the right box. View live statistics for false positives (red circles) and false negatives (blue rectangles) [the red dashed boxes where the user has clicked for parser errors are in the UI].

![NVR_pos](https://user-images.githubusercontent.com/12535192/219119487-fd7906e9-f604-4e1b-955f-165c31ce9980.png)


## Choose a different Parser (en-pos)

Again manually challenge the parser's choices and switch back and forth between parser results by clicking on the parser name radio buttons (top magenta box)

![NVR_en](https://user-images.githubusercontent.com/12535192/219119530-34651dc3-5fa6-4331-bae0-1c10510e9f3f.png)


# What is this?

This is a project I started where I was going to build a new react app every day for practice. However, I kept modifying this project instead of starting new ones.

I stopped around Valentine's Day 2023 (hence the sort-of Valentine's Day theme).

## Notes

​
- This started out as a vite-mui javascript project on stackblitz. I converted it to typescript by hand.

- This has no tests (but I definitely plan to start with tests and try TDD on my next practice project)

- It's set up to load from multiple URLs (I briefly hosted a test server on Digital Ocean, see my [poetrydb](https://github.com/durantschoon/poetrydb) fork). The code for multiple URLs is still in this repo, but it adds complexity if you only care about loading from a single source.

- I started to explore using [react-query](https://react-query-v3.tanstack.com) in this app, but realized it would not work well with arbitrary multiple URLs to fetch from so I removed it.

- I explored MUI, including setting up a theme, modifying styles, toast alerts, pop ups for parser descriptions and adding a little responsiveness (when the window narrows).

- I started with a progress bar, but you can't set state from inside a loop so I removed it. I recently thought of a way to make it work, but I probably won't implement it in this project (I'd keep the list of remaining poets, update the progress bar and set the state of remaining poets to be the list with the last one popped off, then call the function again until there are no more poets left in the list). Now I just have a warning the first time you load the poets that downloading will take a while.

- I eventually converged to a single store for all the state manually. Next project I will explore state management tools.
