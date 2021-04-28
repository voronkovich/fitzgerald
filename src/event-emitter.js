export default () => {
    const all = new Map()

    return Object.freeze({
        on(type, handler) {
            const handlers = all.get(type)

            const added = handlers && handlers.push(handler)

            if (!added) {
                all.set(type, [handler])
            }
        },

        off(type, handler) {
            const handlers = all.get(type)

            if (handlers) {
                handlers.splice(handlers.indexOf(handler) >>> 0, 1)
            }
        },

        async emit(type, data) {
            const handlers = (all.get(type) || [])

            return Promise.allSettled(
                handlers.map((handler) => handler(data))
            )
        }
    })
}
