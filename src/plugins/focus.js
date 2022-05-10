export default (modal, options = '[data-fitz-focus]') => {
    if (false === options) {
        return
    }

    modal.content.tabIndex = -1

    const getFocusElement = (element = options) => {
        if (element instanceof HTMLElement) {
            return element
        }

        if ('string' === typeof element) {
            const focusElement = modal.content.querySelector(element)

            if (focusElement) {
                return focusElement
            }
        }

        return modal.content
    }

    modal.setFocus = (element) => {
        getFocusElement(element).focus()
    }

    let restoreActiveElement = () => {}
    let destroyFocusTrap = () => {}

    modal.on('show', () => {
        restoreActiveElement = saveActiveElement()

        destroyFocusTrap = createFocusTrap(modal.content)
    })

    modal.on('show:after', modal.setFocus)

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
    return nodeQuerySelectorAll(node, tabbableSelector)
}

const nodeQuerySelectorAll = (node, selector) => {
    const result = Array.from(node.querySelectorAll(selector))

    const slots = node.querySelectorAll('slot')

    for (const slot of slots) {
        for (const assignedElement of slot.assignedElements()) {
            if (assignedElement.matches(selector)) {
                result.push(assignedElement)
            }

            assignedElement.querySelectorAll(tabbableSelector).forEach(item => {
                result.push(item)
            })
        }
    }

    return result
}

const tabbableSelector = [
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
].join(',')
