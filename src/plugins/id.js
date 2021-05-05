export default (modal, id) => {
    if (false === id) {
        return
    }

    if (!id || 'string' !== typeof id) {
        throw Error('An "id" must be not empty string.')
    }

    modal.root.id = id
}
