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
import createModal from 'fitzgerald'
import 'fitzgerald/src/style.css'
import 'fitzgerald/src/default-theme.css'
```

Also you can just include JS script and CSS file into your HTML page:

```html
<link href="https://cdn.jsdelivr.net/gh/voronkovich/fitzgerald/dist/fitzgerald.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/gh/voronkovich/fitzgerald/dist/fitzgerald-default-theme.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/gh/voronkovich/fitzgerald/dist/fitzgerald.min.js"></script>
```

## Usage example

Application:

```js
import createModal from 'fitzgerald'
import 'fitzgerald/src/style.css'
import 'fitzgerald/src/default-theme.css'

const modal = createModal('Hey!')

modal.show()
```

Browser:

```html
<script>
const modal = Fitz.createModal('Hey!')

modal.show()
</script>
```

## Options

* **content** `string|HTMLElement`

  Sets modal's content.

  ```js
  const modal = createModal({
      content: document.querySelector('#hello'),
  })
  ```

  ```js
  const modal = createModal({
      content: `
          <h1>Lorem ipsum</h1>
          <p>Dolor sit amet...</p>
      `,
  })
  ```

* **id** `string`

  Sets an HTML attribute `id` for the modal.

* **class** `string|Object`

  Sets an HTML attribute `class` for the modal's [elements](#properties).
  
  ```js
  // Add class for the "root" element
  const modal = createModal({
      class: 'sign-in' 
  })
  ```

  ```js
  // TailwindCSS
  const modal = createModal({
      class: {
          backdrop: 'bg-purple-500 opacity-75',
          content: 'bg-white shadow-2xl rounded-xl p-6 mx-4 md:w-1/2 xl:w-1/3 focus:outline-none',
      }
  })
  ```

* **position** `Object`

  Sets the modal's position on the screen. By default modal positioned on the center of screen.

  * **vertical** `string`

    Allowed values: `top`, `center`, `bottom`

  * **horizontal** `string`

    Allowed values: `left`, `center`, `right`

  ```js
  const modal = createModal({
      position: {
          vertical: 'top',
          horizontal: 'right',
      }
  })
  ```
* **style** `Object`

  Configures the modal's style by adding CSS variables to it's root element. All available CSS variables can be found at [./src/style.css](src/style.css) and [./src/default-theme.css](src/default-theme.css).

  ```js
  const modal = createModal({
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
  const modal = createModal({
      content: `
          <button class="close-btn">Close</button>
          <h1>Lorem ipsum</h1>
          <p>Dolor sit amet...</p>
      `,
      hide: '.close-btn',
  })
  ```

  ```js
  const modal = createModal({
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
  const modal = createModal({
      content: 'Boo!',
      hash: '#boo', 
  })
  ```

* **focus** `string`

  Sets a selector for an element which will be focused after the modal is showed.

  Default: `[data-fitz-focus]`

  ```js
  const modal = createModal({
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
  const modal = createModal({
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
  const modal = createModal({
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

* **zIndex** `number|'auto'`

  Sets a [`z-index`](https://developer.mozilla.org/en-US/docs/Web/CSS/z-index) CSS property of modal's [root](#properties) element. By default this value is calculated automatically to make modal appearing on the top of other page elements.

  ```js
  const modal = createModal({
      zIndex: 100, 
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
const modal = createModal({ /* Options */ })

modal.content.addEventListener('submit', (e) => {
    // Handle form submit
})
```

### Methods

* `show()` *async*

  Shows modal.

* `hide()` *async*

  Hides modal.

* `destroy()` *async*

  Destroys modal.

* `setContent(content)`

  Sets the modal's content.

* `on(event, callback)`

  Adds an [event](#events) listener.
  
* `off(event, callback)`

  Removes an [event](#events) listener.

```js
const modal = createModal()

modal.setContent('This modal will be closed after 5 seconds.')

modal.show()

setTimeout(modal.hide, 5000)
```
  
### Events

* `show:before`

  Occurs before showing the modal.

* `show`

  Occurs after the modal has been show.

* `show:after`

  Occurs after the modal has been show and all animations completed.

* `hide:before`

  Occurs before hiding the modal.
  
* `hide`

  Occurs after the modal has been hidden.

* `destroy`

  Occurs when the modal is being destroyed.

```js
let counter = 0

const modal = createModal()

modal.on('show:before', () => {
    modal.setContent(`You've seen this modal ${++counter} times!`)
})
```

## License

Copyright (c) Voronkovich Oleg. Distributed under the [MIT](LICENSE).
