# Games Portofolio

### Overview
This is a simple client-side application, implemented with HTML5, CSS3 and Javascript ES6 for building a personal
user games portofolio. An initial collection of games is read from a .json file stored inside the project, and
the portofolio will be stored in the local storage of the browser. No third frameworks have been used, except 
for the building gulp-related tools. 


### Running the Application

Un-zip the file and copy the dist folder onto a local server. When accessing `http://localhost:[port]`, you should
be able to see the home page.


### Re-building the Application.

Prerequisites:

- Get Node.js.
- From under the root of the un-zipped folder, install the tool dependencies required for building: `npm install`
- Install gulp-cli.

Optional, you can first run `gulp jshint` for validation.

Run `gulp`, which will re-build the `dist` directory.

### Mentions

Throught the code, we adapted the convention of using the short name of a game as a replacement for an id.

### Future work

Testing!!! (Unfortunately, I chose to skip this part because of lack of time, while also being very busy working during 
weekends for my current job. Getting used with Karma would have required some amount of time, as I am only very familiar 
with server-side testing with Mocha. ) 

Extra features: 
- Keep a counter of how many times a game from the user's portofolio has been played (equivalent of how many times the 
Play button has been pressed).
- Order functionality by name and playing times.
- Implement with media-queries and Flex also a version of the grid with 2 items per row.
- Extract the templating HTML logic into another component, so that the entire structure is more decoupled.