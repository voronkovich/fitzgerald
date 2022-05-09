export default (modal, element = document.body) => {
    if (false === element) {
        return
    }

    let target = element

    if ('string' === typeof element) {
        target = document.querySelector(element)

        if (!target) {
            throw Error(`Mount element "${element}" not found.`)
        }
    } else {
        if (!(element instanceof HTMLElement || element instanceof DocumentFragment)) {
            throw Error('Mount element must be instance of "HTMLElement" or "DocumentFragment".')
        }
    }

    target.append(modal.root)

    modal.on('destroy', () => {
        modal.root.remove()
    })
}
