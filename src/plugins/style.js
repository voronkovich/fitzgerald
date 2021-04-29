export default (modal, options) => {
    if (false === options) {
        return
    }

    for (const [key, value] of Object.entries(options)) {
        const property = `--fitz-${snakeCase(key, '-')}`

        modal.root.style.setProperty(property, value)
    }
}

const snakeCase = (str, delimiter = '_') => {
    return str.replace(/[A-Z]/g, (letter) => {
        return `${delimiter}${letter.toLowerCase()}`
    })
}
