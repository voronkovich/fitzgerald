import { parseCSSClasses } from '../utils.js'

export default (modal, classes) => {
    if (false === classes) {
        return
    }

    if ('string' === typeof classes) {
        classes = {
            root: classes,
        }
    }

    Object.entries(classes).forEach((entry) => {
        const [ key, classes ] = entry

        const element = modal[key]

        if (!element) {
            throw Error(`Couldn't set class for "${key}" element because it not exists.`)
        }

        parseCSSClasses(classes)
            .forEach((className) => {
                element.classList.add(className)
            })
    })
}
