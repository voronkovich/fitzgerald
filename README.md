# modest-popup

[Modest Popup](https://www.npmjs.com/package/modest-popup) is a minimalist [modal window](https://en.wikipedia.org/wiki/Modal_window) for the browser implemented in pure JavaScript and CSS. It is fully customizable with options, [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) and [plugins](https://github.com/voronkovich/modest-popup/tree/master/src/plugins).

## Installation

Install the package using [npm](https://www.npmjs.com/package/npm):

```sh
npm add modest-popup
```

Or [yarn](https://yarnpkg.com/):

```sh
yarn add modest-popup
```

And add imports:

```js
import modal from 'modest-popup'
import 'modest-popup/src/style.css'
```

Also you can just include JS script and CSS file into your HTML page:
```html
<link href="https://cdn.jsdelivr.net/npm/modest-popup/dist/modest-popup.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/modest-popup/dist/modest-popup.min.js">
```

## Usage example
```js
const popup = modal('Hey!')

popup.show()
```
