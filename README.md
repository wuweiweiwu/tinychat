# README

This was really fun! I tried to make it as aesthetically pleasing as possible. A combination of pretty and functional components. And I also tried to organize it as best as I can for extensibility :) Its also done in React.js using Semantic UI components.

Skeleton created using create-react-app.

Its also deployed as a static site on my website. http://theweiweiwu.com/TinyChat

The git repo is at https://github.com/hungweiwu/TinyChat.

And you can also view the pretty markdown files there.

## What files live where

* `frontend_design_spec.md` has a copy of the information/requirements for this
  exercise.
* `backend_design_spec.md` contains all the specs for  the backend for this app.
* `public/index.html` is the main HTML page.
* Your JS code goes in `src` directory.
  * `containers` directory contains stateful components. This is where you will call functions defined in `src/api.js` to call the backend api.
  * `components` directory contains presentational components. They only have presentational states and all other stuff is passed as props.
  * `utils` directory contains utility functions such as date formatter.
  * `assets` directory contains pictures or whatever you're going to need in the website.
  * `api.js` this file specifies the skeleton functions to call the backend RESTful api. When it grows we can put it into an `api` directory and split up functions.
  * `index.js` actually renders the React on `index.html`.
* `public/fixtures` contains the fake data file, `fakedata.json`.

## Features

* Avatar change: click the image at top center to change your Avatar
* Name change: click the icon right under the Avatar to change your username
* Edit messages: messages that you can edit will have a small edit button (the ones that you sent)
* "real time" updating of messages based on **HTTP long polling** requests
* Using Semantic UI components as well as custom CSS to make the UI look pretty
* Where I would call the RESTFul api is commented in the code :).


## Viewing the app

Run development server using

```
npm install
npm start
```

Run production build and deply to gh pages

```
npm install
npm run build
npm run deploy
```
