# Fitzgerald

[![CI](https://github.com/voronkovich/fitzgerald/actions/workflows/ci.yaml/badge.svg)](https://github.com/voronkovich/fitzgerald/actions/workflows/ci.yaml)
[![Coverage Status](https://coveralls.io/repos/github/voronkovich/fitzgerald/badge.svg?branch=master)](https://coveralls.io/github/voronkovich/fitzgerald?branch=master)
[![Package Version](https://img.shields.io/npm/v/fitzgerald.svg)](https://www.npmjs.com/package/fitzgerald)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](LICENSE)

[Fitzgerald](https://www.npmjs.com/package/fitzgerald) (or just Fitz) is a minimalist [modal window](https://en.wikipedia.org/wiki/Modal_window) for the browser implemented in pure JavaScript and CSS. It is fully customizable with [options](#options), [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) and [plugins](https://github.com/voronkovich/fitzgerald/tree/master/src/plugins).

Demo is available [here](https://voronkovich.github.io/fitzgerald/demo/).

## Features

- Customization with CSS variables
- Accessibility ([ARIA](https://www.w3.org/TR/wai-aria/))
- [Focus trap](https://www.w3.org/TR/wai-aria-practices/#keyboard-interaction-7)
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
<link href="https://cdn.jsdelivr.net/gh/voronkovich/fitzgerald/dist/fitzgerald.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/gh/voronkovich/fitzgerald/dist/fitzgerald.min.js"></script>
```

## Usage example

Browser:

```html
<script>
const popup = Fitz.modal('Hey!')

popup.show()
</script>
```

Application:

```js
import modal from 'fitzgerald'
import 'fitzgerald/src/style.css'

const popup = modal('Hey!')

popup.show()
```

## Options

* **content** `string|HTMLElement`

  Sets modal's content.

  ```js
  const popup = modal({
      content: document.querySelector('#hello'),
  })
  ```

  ```js
  const popup = modal({
      content: `
          <h1>Lorem ipsum</h1>
          <p>Dolor sit amet...</p>
      `,
  })
  ```

* **id** `string`

  Sets an HTML attribute `id` for the modal.

* **class** `string`

  Sets an HTML attribute `class` for the modal.

* **position** `Object`

  Sets the modal's position on the screen. By default modal positioned on the center of screen.

  * **vertical** `string`

    Allowed values: `top`, `center`, `bottom`

  * **horizontal** `string`

    Allowed values: `left`, `center`, `right`

  ```js
  const popup = modal({
      position: {
          vertical: 'top',
          horizontal: 'right',
      }
  })
  ```
* **style** `Object`

  Configures the modal's style by adding CSS variables to it's root element. All available CSS variables can be found at [./src/style.css](src/style.css).

  ```js
  const popup = modal({
      style: {
          // --fitz-backdrop-backdrop
          backdropBackground: '#eeaaee',

          // --fitz-width
          width: '50%',
      }
  })
  ```

* **hide** `Object|string`

  Configures modal hiding behavior:

  * **click** `string`

    Selector for elements which will be used to close modal by clicking on them.

    Default: `[data-fitz-hide]`

  * **escape** `boolean`

    Allows the user to close the modal by pressing `ESC`.

    Default: `true`

  * **backdrop** `boolean`

    Allows the user to close the modal by clicking the backdrop.

    Default: `true`

  ```js
  const popup = modal({
      content: `
          <button class="close-btn">Close</button>
          <h1>Lorem ipsum</h1>
          <p>Dolor sit amet...</p>
      `,
      hide: '.close-btn',
  })
  ```

  ```js
  const popup = modal({
      hide: {
          hide: '[data-close]',
          escape: false,   // Disable <ESC>
          backdrop: false, // Disable backdrop
      }
  })
  ```

* **hash** `string`

  Allows to set a hash which will be used to show the modal.

  ```html
  <a href="#boo">Show modal</a>
  ```

  ```js
  const popup = modal({
      content: 'Boo!',
      hash: '#boo', 
  })
  ```

* **focus** `string`

  Sets a selector for an element which will be focused after the modal is showed.

  Default: `[data-fitz-focus]`

  ```js
  const popup = modal({
      content: `
          <label>Enter your name:</label>
          <input type="text" name="name" />
      `,
      focus: 'input',
  })
  ```

* **aria** `Object`

  Configures [ARIA](https://www.w3.org/TR/wai-aria/):

  * **role** `string`

    Modal role attribute.

    Default: `dialog`. See [dialog role](https://www.w3.org/TR/wai-aria-1.1/#dialog).

  * **label** `string`

    A string value that labels the modal. See [aria-label](https://www.w3.org/TR/wai-aria/#aria-label).

  * **labelledBy** `string`

    Selector for element which will be used to label the modal. See [aria-labelledby](https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby).

    Default: `[data-fitz-aria-labelledby]` 

  * **describedBy** `string`

    Selector for element which will be used to describe the modal. See [aria-describedby](https://www.w3.org/TR/wai-aria-1.1/#aria-describedby).
    
    Default: `[data-fitz-aria-describedby]` 

  ```js
  const popup = modal({
      content: `
          <h2>Lorem ipsum</h2>
          <p>Dolor sit amet</p>
          <p>Consetetur sadipscing</p>
      `,
      aria: {
          role: 'alertdialog',
          labelledBy: 'h2',
          describedBy: 'p:first-child',
      },
  })
  ```

* **animate** `Object`

  Allows to add CSS classes for arbitrary elements while the modal is being showing or hiding. You can use any library like [animate.css](https://github.com/animate-css/animate.css) or [cssanimation.io](https://github.com/yesiamrocks/cssanimation.io).

  To set an element which will be animated you can use keywords: `root`, `backdrop`, `content` or CSS selector.

  ```js
  const popup = modal({
      animate: {
          root: {
              show: 'animate__animated animate__fadeIn',
              hide: 'animate__animated animate__fadeOut',
          },
          content: {
              show: 'animate__animated animate__bounceInDown',
              hide: 'animate__animated animate__fadeOutLeft',
          },
          '[type=submit]': {
              show: 'animate__animated animate__slow animate__bounceInRight',
          },
      }
  })
  ```

## Instance API

### Properties

* **root** `HTMLElement`

  Root element that wraps the backdrop and the modal content container.

* **backdrop** `HTMLElement`

  Backdrop element (overlay).

* **content** `HTMLElement`

  Container for the modal content.

You can use properties to interact with the modal DOM (attach event listeners, add nodes and etc.):

```js
const popup = modal({ /* Options */ })

popup.content.addEventListener('submit', (e) => {
    // Handle form submit
})
```

### Methods

* `show()`

  Shows modal

* `hide()`

  Hides modal

* `setContent(content)`

  Sets the modal's content:

* `on(event, callback)`

  Adds an [event](#events) listener
  
* `off(event, callback)`

  Removes an [event](#events) listener

```js
const popup = modal()

popup.setContent('This popup will be closed after 5 seconds.')

popup.show()

setTimeout(popup.hide, 5000)
```
  
### Events

* `show:before`

  Occurs before showing the modal

* `show`

  Occurs after the modal has been show

* `hide:before`

  Occurs before hiding the modal
  
* `hide`

  Occurs after the modal has been hidden

```javascript
let counter = 0

const popup = modal()

popup.on('show:before', () => {
    popup.setContent(`You've seen this popup ${++counter} times!`)
})
```

## License

Copyright (c) Voronkovich Oleg. Distributed under the [MIT](LICENSE).
