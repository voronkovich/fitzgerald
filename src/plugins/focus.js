export default (modal, options = '[data-fitz-focus]') => {
    if (false === options) {
        return
    }

    modal.content.tabIndex = -1

    const getTargetElement = () => {
        if (options instanceof HTMLElement) {
            return options
        }

        if ('string' === typeof options) {
            const element = modal.content.querySelector(options)

            if (element) {
                return element
            }
        }

        return modal.content
    }

    let restoreActiveElement = () => {}
    let destroyFocusTrap = () => {}

    modal.on('show', () => {
        restoreActiveElement = saveActiveElement()

        destroyFocusTrap = createFocusTrap(modal.content)
    })

    modal.on('show:after', () => {
        getTargetElement().focus()
    })

    modal.on('hide', () => {
        restoreActiveElement()

        destroyFocusTrap()
    })
}

const saveActiveElement = () => {
    const activeElement = document.activeElement

    return () => {
        if (document.activeElement) {
            document.activeElement.blur()
        }

        if (activeElement) {
            activeElement.focus()
        }
    }
}

const createFocusTrap = (node) => {
    const handler = (e) => {
        if (e.key !== 'Tab') {
            return
        }

        const tabbables = queryTabbables(node)

        if (0 === tabbables.length) {
            e.preventDefault()

            return
        }

        const first = tabbables[0]
        const last = tabbables[tabbables.length - 1]

        if (e.shiftKey) {
            if (document.activeElement === first) {
                last.focus()
                e.preventDefault()
            }
        } else {
            if (document.activeElement === last) {
                first.focus()
                e.preventDefault()
            }
        }
    }

    node.addEventListener('keydown', handler)

    return () => {
        node.removeEventListener('keydown', handler)
    }
}

const queryTabbables = (node) => {
    return node.querySelectorAll(`
        a[href],
        area[href],
        input:not([disabled]):not([type="hidden"]):not([aria-hidden]),
        select:not([disabled]):not([aria-hidden]),
        textarea:not([disabled]):not([aria-hidden]),
        button:not([disabled]):not([aria-hidden]),
        iframe,
        object,
        embed,
        [contenteditable],
        [tabindex]:not([tabindex^="-"])
    `)
}
