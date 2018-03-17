# Contributor's Guide

## Getting Started

All work should be done on a separate fork of the repository. To create a fork, go to the main repository https://github.com/GraceCovenantChurch/gcc_website and click "fork" at the top right of the screen to create a copy on your own Github.

Then, clone your fork of the repository so you have a working copy on your machine:
```
git clone git@github.com:YOUR-USERNAME/gcc_website.git
```

You will now have a local copy of the code as well as a "remote" copy on Github at `git@github.com:YOUR-USERNAME/gcc_website.git`. By default, this remote is named `origin`. Next, you should add the GraceCovenantChurch repository as an additional remote so you can stay up to with the latest changes. This remote will be called "upstream".

```
git remote add upstream git@github.com:GraceCovenantChurch/gcc_website.git
```

Here's Github's documentation on creating a fork: https://help.github.com/articles/fork-a-repo/

## Github Issues

Every task that needs to be done will be listed as a Github issue. https://github.com/GraceCovenantChurch/gcc_website/issues. Feel free to take and work on any issue you would like to tackle. Don't be afraid to comment and ask clarifying questions in the issue as well as post status updates so that you can get feedback early :)

## Making Changes

All work should be done in a new branch off of the `develop` branch. To start a new feature or fix an issue, make sure sure your develop branch is up to date.


**Fetch the upstream code**
```
git fetch upstream
```

**Switch your local repository to the `develop` branch**
```
git checkout develop
```

**Update your `develop` branch**
```
git merge upstream/develop
```

**Create a new branch for your feature**
```
git checkout -b my-new-feature
```

**Make your changes on your branch**

**Make sure you pass all style checks and tests**. `npm run test` and `npm run lint` should pass without errors. Warnings are okay.

**Commit your changes**

**Push your branch to your remote repository**
```
git push origin my-new-feature
```

**Create a pull request to the `develop` branch of the GraceCovenantChurch repository.** https://help.github.com/articles/creating-a-pull-request/

In your pull request, be sure to link to the issue that your code is for. Once your code is reviewed and approved, it will be merged into the `develop` branch! Good work!
