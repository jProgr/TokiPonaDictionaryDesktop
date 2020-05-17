# Toki Pona dictionary for desktop

A simple Toki Pona - English dictionary with search function. Available as desktop app for macOS and [web](https://jprogr.github.io/TokiPonaDictionary/).

## [Download it](https://github.com/jProgr/TokiPonaDictionaryDesktop/releases)

## Usage

This a simple Toki Pona dictionary for macOS, just download it, open the .zip file a copy the app to your applications folder.

## Development

### Prerequisites

To run this application with development purposes you need:

- Node.js 12.
- macOS (if you want to package the app).

### Installation

This repository uses [Git Submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules) so after downloading it you need to run

```
git submodule init
git submodule update
```

to download the submodule and set it in the correct commit. The submodule is the project [jProgr/TokiPonaDictionary](https://github.com/jProgr/TokiPonaDictionary). This project is just a [Electron](https://www.electronjs.org/) wrapper of that one.

Now, to install dependecies use NPM:

```
npm i
```

### Usage

The application can be started using

```
npm start
```

To package it a NPM script for [electron-packager](https://github.com/electron/electron-packager) is included:

```
npm run package
```
