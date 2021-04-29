# Fitz

[Fitz](https://www.npmjs.com/package/fitzgerald) is a minimalist [modal window](https://en.wikipedia.org/wiki/Modal_window) for the browser implemented in pure JavaScript and CSS. It is fully customizable with options, [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) and [plugins](https://github.com/voronkovich/fitzgerald/tree/master/src/plugins).
The main difference between this project 

## Features

- Customizable with CSS variables
- Accessibility (ARIA)
- Animation (with [animate.css](https://github.com/animate-css/animate.css) and etc.)
- Custom plugins

## Installation

Install the package using [npm](https://www.npmjs.com/package/npm):

```sh
npm add fitzgerald
```

Or [yarn](https://yarnpkg.com/):

```sh
yarn add fitzgerald
```

And add imports:

```js
import modal from 'fitzgerald'
import 'fitzgerald/src/style.css'
```

Also you can just include JS script and CSS file into your HTML page:
```html
<link href="https://cdn.jsdelivr.net/npm/fitzgerald/dist/fitzgerald.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/fitzgerald/dist/fitzgerald.min.js">
```

## Usage example
```js
const popup = modal('Hey!')

popup.show()
```
