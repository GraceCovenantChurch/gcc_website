# Developing for the Website

## Setting up your Development Environment

1. Install Node.js https://nodejs.org/en/. Make sure that after installing, the binaries have been added to your `PATH` so you can run `node` and `npm` in your terminal.

2. Install MongoDB https://docs.mongodb.com/manual/administration/install-community/. Make sure that after installing, the binaries have been added to your `PATH` so you can run `mongod` and `mongo` in your terminal.

## Running the Code

1. Clone this repository. `git clone git@github.com:GraceCovenantChurch/gccweb.git`
2. `cd gccweb`
3. Check out the `react` branch where current development is happening. `git checkout react`
4. `npm install`. This will install all project dependencies. When dependencies change, you will need to run this command again.
5. Make sure your MongoDB server is running. You can check this by running `mongo`. If this command fails, open up another terminal window and run `mongod` to start the server.
6. `npm start`. This should start the development servers so you can run the website on the machine. Wait a bit and open up [`http://localhost:8080/`](http://localhost:8080/) in your browser. Hopefully, you should see the homepage for the website

## Development Workflow

For any task that needs to be done, a Github issue will be created to track it.
1. To work on the task, checkout a new branch from the current `react` development branch: `git checkout new-feature`.
2. When you finish working on it or need a review, push it to Github: `git push origin new-feature`
3. Iterate on any comments.
4. Once everything is merged in, the issue tracking the feature will be closed.
