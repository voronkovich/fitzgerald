export default (modal, focus) => {
    if (false === focus) {
        return
    }

    focus = focus || '[data-fitz-focus]'

    modal.content.tabIndex = -1

    const focusInitial = () => {
        const element = modal.content.querySelector(focus) || modal.content

        element.focus()
    }

    let previousActiveElement

    const saveActiveElement = () => {
        previousActiveElement = document.activeElement || document.body
    }

    const restoreActiveElement = () => {
        if (previousActiveElement) {
            previousActiveElement.focus()
        }
    }

    let destroyFocusTrap = () => {}

    modal.on('show', () => {
        saveActiveElement()

        destroyFocusTrap = createFocusTrap(modal.root)

        focusInitial()
    })

    modal.on('hide', () => {
        destroyFocusTrap()

        restoreActiveElement()
    })
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
    return node.querySelectorAll([
        'a[href]',
        'area[href]',
        'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
        'select:not([disabled]):not([aria-hidden])',
        'textarea:not([disabled]):not([aria-hidden])',
        'button:not([disabled]):not([aria-hidden])',
        'iframe',
        'object',
        'embed',
        '[contenteditable]',
        '[tabindex]:not([tabindex^="-"])',
    ].join(','))
}
