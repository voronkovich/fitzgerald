import { createModalFactory } from './modal.js'

import animatePlugin from './plugins/animate.js'
import ariaPlugin from './plugins/aria.js'
import classPlugin from './plugins/class.js'
import contentPlugin from './plugins/content.js'
import focusPlugin from './plugins/focus.js'
import hashPlugin from './plugins/hash.js'
import hidePlugin from './plugins/hide.js'
import idPlugin from './plugins/id.js'
import mountPlugin from './plugins/mount.js'
import positionPlugin from './plugins/position.js'
import stylePlugin from './plugins/style.js'

const { modal, plugin } = createModalFactory([
    {
        key: 'animate',
        callable: animatePlugin,
        lazy: true,
    },
    {
        key: 'aria',
        callable: ariaPlugin,
        lazy: false,
    },
    {
        key: 'class',
        callable: classPlugin,
        lazy: true,
    },
    {
        key: 'content',
        callable: contentPlugin,
        lazy: false,
    },
    {
        key: 'focus',
        callable: focusPlugin,
        lazy: false,
    },
    {
        key: 'hash',
        callable: hashPlugin,
        lazy: true,
    },
    {
        key: 'hide',
        callable: hidePlugin,
        lazy: false,
    },
    {
        key: 'id',
        callable: idPlugin,
        lazy: true,
    },
    {
        key: 'mount',
        callable: mountPlugin,
        lazy: false,
    },
    {
        key: 'position',
        callable: positionPlugin,
        lazy: true,
    },
    {
        key: 'style',
        callable: stylePlugin,
        lazy: true,
    }
])

export default modal
export {
    modal,
    plugin,
}
