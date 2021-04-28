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
        if (!(element instanceof Element)) {
            throw Error('Mount element must be instance of "Element".')
        }
    }

    target.append(modal.root)
}
