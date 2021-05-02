import { PluginRegistry, applyPlugins } from './plugin-registry.js'
import createEventEmitter from './event-emitter.js'

export const createModalFactory = (plugins = []) => {
    const pluginRegistry = new PluginRegistry()

    const plugin = (options) => {
        pluginRegistry.add(options)
    }

    plugins.forEach(plugin)

    /**
     * Creates new modal instance
     *
     * @return {Object} Modal instance
     */
     const modal = (options = {}) => {
        if ('string' === typeof options || options instanceof Node) {
            options = {
                content: options,
            }
        }

        const modal = createModal()

        applyPlugins(pluginRegistry, modal, options)

        Object.freeze(modal)

        return modal
    }

    return Object.freeze({
        modal,
        plugin,
    })
}

/**
 * Creates modal instance
 *
 * @return {Object} Modal instance
 */
export const createModal = () => {
    const root = createRootElement()
    const backdrop = createBackdropElement()
    const content = createContentElement()

    root.append(backdrop, content)

    const eventEmitter = createEventEmitter()

    let showPromise = null
    let hidePromise = null

    const modal = {
        root,
        backdrop,
        content,

        ...eventEmitter,

        show: () => {
            if (showPromise) {
                return showPromise
            }

            if (modal.isVisible()) {
                return Promise.resolve()
            }

            showPromise = eventEmitter
                .emit('show:before')
                .then(() => {
                    modal.root.style.visibility = 'visible'

                    return eventEmitter.emit('show')
                })
                .finally(() => {
                    showPromise = null
                })

            return showPromise
        },

        hide: () => {
            if (hidePromise) {
                return hidePromise
            }

            if (modal.isHidden()) {
                return Promise.resolve()
            }

            hidePromise = eventEmitter
                .emit('hide:before')
                .then(() => {
                    modal.root.style.visibility = 'hidden'

                    return eventEmitter.emit('hide')
                })
                .finally(() => {
                    hidePromise = null
                })

            return hidePromise
        },

        isVisible: () => {
            return modal.root.style.visibility === 'visible'
        },

        isHidden: () => {
            return modal.root.style.visibility === 'hidden'
        },

        destroy: () => {
            root.remove()
        },
    }

    return modal
}

const createRootElement = () => {
    const root = document.createElement('div')

    root.className = 'fitz'

    Object.assign(root.style, {
        zIndex: maxZIndex() + 1,
        visibility: 'hidden',
    })

    return root
}

const createBackdropElement = () => {
    const backdrop = document.createElement('div')

    backdrop.className = 'fitz-backdrop'

    return backdrop
}

const createContentElement = () => {
    const content = document.createElement('div')

    content.className = 'fitz-content'

    return content
}

const maxZIndex = () => {
    return Array
        .from(document.querySelectorAll('*'))
        .reduce((max, element) => {
            const zIndex = +getComputedStyle(element).zIndex || 0

            return Math.max(max, zIndex)
        }, 0)
}
