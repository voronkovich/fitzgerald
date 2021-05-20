export default (modal, zIndex) => {
    if (false === zIndex) {
        return
    }

    if ('undefined' === typeof zIndex) {
        modal.root.style.zIndex = maxZIndex() + 1

        return
    }

    if (Number.isInteger(zIndex) || 'auto' === zIndex) {
        modal.root.style.zIndex = zIndex

        return
    }

    throw Error(`Invalid z-index value: "${zIndex}".`)
}

const maxZIndex = () => {
    return Array
        .from(document.querySelectorAll('*'))
        .reduce((max, element) => {
            const zIndex = +getComputedStyle(element).zIndex || 0

            return Math.max(max, zIndex)
        }, 0)
}
