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
    const root = document.createElement('div')
    root.className = 'fitz'

    const backdrop = document.createElement('div')
    backdrop.className = 'fitz-backdrop'

    const content = document.createElement('div')
    content.className = 'fitz-content'

    root.append(backdrop, content)
    root.style.visibility = 'hidden'

    const eventEmitter = createEventEmitter()

    let showPromise = null
    let hidePromise = null
    let destroyPromise = null

    const modal = {
        root,
        backdrop,
        content,

        ...eventEmitter,

        show: () => {
            if (modal.isDestroyed()) {
                return Promise.reject(Error('Modal is destroyed.'))
            }

            if (hidePromise) {
                return Promise.reject(Error('Hiding process is not completed.'))
            }

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
            if (modal.isDestroyed()) {
                return Promise.reject(Error('Modal is destroyed.'))
            }

            if (showPromise) {
                return Promise.reject(Error('Showing process is not completed.'))
            }

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

        isDestroyed: () => {
            return !!destroyPromise
        },

        destroy: () => {
            if (destroyPromise) {
                return destroyPromise
            }

            destroyPromise = eventEmitter.emit('destroy')

            return destroyPromise
        },
    }

    return modal
}
