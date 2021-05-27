import { parseCSSClasses } from '../utils.js'

export default (modal, options) => {
    if (false === options) {
        return
    }

    for (const [key, opts]  of Object.entries(options)) {
        if (opts.show) {
            animateShow(modal, key, opts.show)
        }

        if (opts.hide) {
            animateHide(modal, key, opts.hide)
        }
    }

    const waitElements = [
        modal.root,
        modal.backdrop,
        modal.content,
    ]

    modal.on('hide:before', () => {
        return Promise.allSettled(waitElements.map(waitAnimationsFinished))
    })
}

const animateShow = (modal, key, classes) => {
    classes = parseCSSClasses(classes)

    modal.on('show', () => {
        const element = modal[key] || modal.root.querySelector(key)

        if (!element) {
            return
        }

        element.classList.add(...classes)

        return waitAnimationsFinished(element)
    })

    modal.on('hide:before', () => {
        const element = modal[key] || modal.root.querySelector(key)

        if (!element) {
            return
        }

        element.classList.remove(...classes)

        return waitAnimationsFinished(element)
    })
}

const animateHide = (modal, key, classes) => {
    classes = parseCSSClasses(classes)

    modal.on('hide:before', () => {
        const element = modal[key] || modal.root.querySelector(key)

        if (!element) {
            return
        }

        element.classList.add(...classes)

        return waitAnimationsFinished(element).finally(() => {
            element.classList.remove(...classes)
        })
    })
}

const waitAnimationsFinished = async (element) => {
    if (element.getAnimations) {
        return Promise.allSettled(
            element
                .getAnimations()
                .map(animation => animation.finished)
        )
    }

    return new Promise((resolve) => {
        const style = getComputedStyle(element)

        const animationDuration = parseFloat(style.animationDuration) || 0
        const transitionDuration = parseFloat(style.transitionDuration) || 0

        setTimeout(resolve, 1000 * Math.max(animationDuration, transitionDuration))

        let animations = animationDuration > 0
        let transitions = transitionDuration > 0

        if (!transitions && !animations) {
            resolve()
        }

        if (animations) {
            element.addEventListener('animationend', () => {
                animations = false

                if (!transitions) {
                    resolve()
                }
            }, { once: true })
        }

        if (transitions) {
            element.addEventListener('transitionend', () => {
                transitions = false

                if (!animations) {
                    resolve()
                }
            }, { once: true })
        }
    })
}
