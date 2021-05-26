import { PluginRegistry, applyPlugins } from './plugin-registry.js'
import createEventEmitter from './event-emitter.js'

export const createModalFactory = (plugins = []) => {
    const pluginRegistry = new PluginRegistry()

    const usePlugin = (options) => {
        pluginRegistry.add(options)
    }

    const createModal = (options = {}) => {
        if ('string' === typeof options || options instanceof Node) {
            options = {
                content: options,
            }
        }

        const modal = createModalInstance()

        applyPlugins(pluginRegistry, modal, options)

        Object.freeze(modal)

        return modal
    }

    plugins.forEach(usePlugin)

    return Object.freeze({
        createModal,
        usePlugin,
    })
}

const createModalInstance = () => {
    const root = document.createElement('div')
    root.className = 'fitz'

    const backdrop = document.createElement('div')
    backdrop.className = 'fitz-backdrop'

    const container = document.createElement('div')
    container.className = 'fitz-container'

    const wrapper = document.createElement('div')
    wrapper.className = 'fitz-wrapper'

    const content = document.createElement('div')
    content.className = 'fitz-content'

    wrapper.append(content)

    container.append(wrapper)

    root.append(backdrop, container)

    const eventEmitter = createEventEmitter()

    let showPromise = null
    let hidePromise = null
    let destroyPromise = null

    const modal = {
        root,
        backdrop,
        container,
        wrapper,
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
                    modal.root.classList.add('fitz-visible')

                    return eventEmitter
                        .emit('show')
                        .then(() => {
                            return eventEmitter.emit('show:after')
                        })
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
                    modal.root.classList.remove('fitz-visible')

                    return eventEmitter.emit('hide')
                })
                .finally(() => {
                    hidePromise = null
                })

            return hidePromise
        },

        isVisible: () => {
            return modal.root.classList.contains('fitz-visible')
        },

        isHidden: () => {
            return !modal.isVisible()
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
