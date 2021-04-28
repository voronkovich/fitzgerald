export default (modal, hash) => {
    if (false === hash) {
        return
    }

    if ('string' !== typeof hash || !hash.startsWith('#')) {
        throw Error('Hash must be not empty string starting with "#".')
    }

    modal.on('show', () => {
        location.hash = hash
    })

    modal.on('hide', () => {
        if (location.hash === hash) {
            location.hash = ''
        }
    })

    const handler = () => {
        if (location.hash === hash) {
            modal.show()
        } else {
            modal.hide()
        }
    }

    window.addEventListener('hashchange', handler)

    handler()
}
