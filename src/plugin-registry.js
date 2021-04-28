export class PluginRegistry {
    constructor() {
        this.plugins = new Map()
    }

    get(key) {
        return this.plugins.get(key)
    }

    add(options) {
        if ('function' === typeof options) {
            options = {
                key: Symbol(),
                callable: options,
                lazy: false,
            }
        }

        const {
            key,
            callable,
            lazy = true
        } = options

        if (!key || !['string', 'symbol'].includes(typeof key)) {
            throw Error('Plugin key must be not empty string or symbol.')
        }

        if (!callable || typeof callable !== 'function') {
            throw Error(`Plugin "${key}" must have callable.`)
        }

        return this.plugins.set(key, Object.freeze({
            key,
            callable,
            lazy,
        }))
    }

    has(key) {
        return this.plugins.has(key)
    }

    keys() {
        return this.plugins.keys()
    }

    all() {
        return this.plugins.values()
    }
}

export const applyPlugins = (registry, subject, options = {}) => {
    const optionsKeys = Object.keys(options)

    optionsKeys.forEach(key => {
        if (!registry.has(key)) {
            throw Error(`Plugin "${key}" is not defined.`)
        }
    })

    for (const { key, callable, lazy } of registry.all()) {
        if (lazy && !optionsKeys.includes(key)) {
            continue
        }

        callable(subject, options[key])
    }
}
