export const parseCSSClasses = (classes) => {
    if (Array.isArray(classes)) {
        return classes
    }

    if ('string' !== typeof classes) {
        throw Error(`Invalid CSS classes list type: "${typeof classes}". Only strings and arrays allowed.`)
    }

    return classes
        .trim()
        .split(/\s+/)
}
