# Toki Pona dictionary for desktop

A simple Toki Pona - English dictionary with search function. Available as desktop app for macOS and [web](https://jprogr.github.io/TokiPonaDictionary/).

## Downloads

This a simple Toki Pona dictionary for macOS, just download it, open the .zip file and copy the app to your applications folder. [Latest version available](https://github.com/jProgr/TokiPonaDictionaryDesktop/releases).

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

To work with the app icons you need to know that the icon for macOS is in reality a set of images of many sizes. Once you have done actual graphic work, you need to generate 10 PNG images with the following names and sizes:

- icon_512x512@2x.png (1024, 1024)px
- icon_512x512.png (512, 512)px
- icon_256x256@2x.png (512, 512)px
- icon_256x256.png (256, 256)px
- icon_128x128@2x.png (256, 256)px
- icon_128x128.png (128, 128)px
- icon_32x32@2x.png (64, 64)px
- icon_32x32.png (32, 32)px
- icon_16x16@2x.png (32, 32)px
- icon_16x16.png (16, 16)px

Put them in a folder, rename the folder to `app_icon.iconset` and then use the following command to transform it to a `.icns` file:

```
iconutil -c icns app_icon.iconset
```

[More info on this](https://blog.macsales.com/28492-create-your-own-custom-icons-in-10-7-5-or-later/).
