# addeventlistener-with-dispatch

A lightweight only 1.8k (or 806 bytes gzipped) polyfill for `addEventListener` and `removeEventListener`, but also polyfills `dispatchEvent` and the `DOMContentLoaded` event, whilst supporting custom events.



## Usage

It works passively, just include the script before anything that requires addEventListener and it will be available to use along with removeEventListener, DispatchEvent and the DOMContentloaded event.

## Install

The package is available from bower, npm or download the minified file and add it directly.

```
npm install addeventlistener-with-dispatch

bower install addeventlistener-with-dispatch
```

## Build From Source

You can build from the source file(s) by cloning the repo and running the following npm commands from the command line

```
npm install
npm run build
```

## Test

Run the following command to launch a web browser. __*NB:*__ As the code is aimed at polyfilling IE8 its advisable to run it against that. 

```
npm test
```

### Notes

Designed for use in IE8 as thats the newest IE available to Windows XP users, which there is still a large user base in some territories. IE9 and above all implement addEventListener correctly so does not replace the built in functionality.