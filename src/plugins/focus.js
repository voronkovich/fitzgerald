export default (modal, focus) => {
    if (false === focus) {
        return
    }

    focus = focus || '[data-fitz-focus]'

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
        return modal.content.querySelector(focus) || modal.content
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
