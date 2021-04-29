export default (modal, options = {}) => {
    if (false === options) {
        return
    }

    const opts = Object.assign({
        focusSelector: '[data-fitz-focus]'
    }, options)

    let previousActiveElement

    const saveActiveElement = () => {
        previousActiveElement = document.activeElement || document.body
    }

    const restoreActiveElement = () => {
        if (previousActiveElement) {
            previousActiveElement.focus()
        }
    }

    const getFocusTarget = () => {
        return modal.content.querySelector(opts.focusSelector) || modal.content
    }

    modal.content.tabIndex = -1

    modal.on('show', () => {
        saveActiveElement()

        getFocusTarget().focus()
    })

    modal.on('hide', () => {
        restoreActiveElement()
    })
}
