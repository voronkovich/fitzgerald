export default (modal, classes) => {
    if (false === classes) {
        return
    }

    if (!classes || 'string' !== typeof classes) {
        throw Error('Class must be not empty string.')
    }

    classes
        .split(/\s/)
        .forEach((className) => {
            modal.root.classList.add(className)
        })
}
