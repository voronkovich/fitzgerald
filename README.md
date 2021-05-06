# Fitzgerald

[![CI](https://github.com/voronkovich/fitzgerald/actions/workflows/ci.yaml/badge.svg)](https://github.com/voronkovich/fitzgerald/actions/workflows/ci.yaml)

[Fitzgerald](https://www.npmjs.com/package/fitzgerald) (or just Fitz) is a minimalist [modal window](https://en.wikipedia.org/wiki/Modal_window) for the browser implemented in pure JavaScript and CSS. It is fully customizable with [options](#options), [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) and [plugins](https://github.com/voronkovich/fitzgerald/tree/master/src/plugins).

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
<script src="https://cdn.jsdelivr.net/npm/fitzgerald/dist/fitzgerald.min.js"></script>
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

  ```javascript
  const popup = modal({
      content: document.querySelector('#hello'),
  })
  ```

  ```javascript
  const popup = modal({
      content: `
          <h1>Lorem ipsum</h1>
          <p>Dolor sit amet...</p>
      `,
  })

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

  ```javascript
  const popup = modal({
      position: {
          vertical: 'top',
          horizontal: 'right',
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

  ```javascript
  const popup = modal({
      content: `
          <button class="close-btn">Close</button>
          <h1>Lorem ipsum</h1>
          <p>Dolor sit amet...</p>
      `,
      hide: '.close-btn',
  })
  ```

  ```javascript
  const popup = modal({
      hide: {
          hide: '[data-close]',
          escape: false,   // Disable <ESC>
          backdrop: false, // Disable backdrop
      }
  })

* **hash** `string`

  Allows to set a hash which will be used to show the modal.

  ```html
  <a href="#boo">Show modal</a>
  ```

  ```javascript
  const popup = modal({
      content: 'Boo!',
      hash: '#boo', 
  })

* **focus** `string`

  Sets a selector for an element which will be focused after the modal is showed.

  Default: `[data-fitz-focus]`

  ```javascript
  const popup = modal({
      content: `
          <label>Enter your name:</label>
          <input type="text" name="name" />
      `,
      focus: 'input',
  })

* **aria** `Object`

  Configures [ARIA](https://www.w3.org/TR/wai-aria-1.1/):

  * **role** `string`

    Modal role attribute.

    Default: `dialog`. See [dialog role](https://www.w3.org/TR/wai-aria-1.1/#dialog).

  * **contentRole** `string`

    Modal content role attribute.

    Default: `document`. See [document role](https://www.w3.org/TR/wai-aria-1.1/#document).

  * **modal** `boolean`

    Use `aria-modal` attribute. See [aria-modal](https://www.w3.org/TR/wai-aria-1.1/#aria-modal).

    Default: `true` 

  * **hidden** `boolean`

    Use `aria-hidden` attribute. See [aria-hidden](https://www.w3.org/TR/wai-aria-1.1/#aria-hidden).

    Default: `false` 

  * **labelledBy** `string`

    Selector for element which will be used to label the modal. See [aria-labelledby](https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby).

    Default: `[data-fitz-aria-labelledby]` 

  * **describedBy** `string`

    Selector for element which will be used to describe the modal. See [aria-describedby](https://www.w3.org/TR/wai-aria-1.1/#aria-describedby).
    
    Default: `[data-fitz-aria-describedby]` 

  ```javascript
  const popup = modal({
      content: `
          <h2>Lorem ipsum</h2>
          <p>Dolor sit amet</p>
          <p>Consetetur sadipscing</p>
      `,
      aria: {
          role: 'alertdialog',
          hidden: true,
          labelledBy: 'h2',
          describedBy: 'p:first-child',
      },
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

```javascript
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

```javascript
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

## Focus trap

Creating the [focus trap](https://www.w3.org/TR/wai-aria-practices/#keyboard-interaction-7) is not an easy task, so this package doesn't support this feature out of the box. But, you could use any third-party package like [focus-trap](https://github.com/focus-trap/focus-trap) to implement such feature:

```js
import { createFocusTrap } from 'focus-trap'
import { modal, plugin } from 'fitzgerald'
import 'fitzgerald/src/style.css'

plugin((modal) => {
    const trap = createFocusTrap(modal.content)

    modal.on('show', () => {
        trap.activate()
    })

    modal.on('hide', () => {
        trap.deactivate()
    })
})

const popup = modal({
    content: document.querySelector('#sign-in'),
    hash: '#sign-in',
})
```
