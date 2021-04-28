export default (modal, options) => {
    if (false === options) {
        return
    }

    for (const [key, opts]  of Object.entries(options)) {
        const element = modal[key]

        if (!element) {
            throw Error(`Animation object "${key}" not exists.`)
        }

        if (opts.show) {
            const showClasses = opts.show.split(/\s/)

            modal.on('show', () => {
                animate(element, showClasses)

                return waitAnimationsFinished(element)
            })
        }

        if (opts.hide) {
            const hideClasses = opts.hide.split(/\s/)

            modal.on('hide:before', () => {
                animate(element, hideClasses)

                return waitAnimationsFinished(element)
            })
        }
    }
}

const animate = (element, classes) => {
    element.classList.add(...classes)

    element.addEventListener('animationend', () => {
        element.classList.remove(...classes)
    }, { once: true })
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
        let { animations, transitions } = hasAnimations(element)

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

const hasAnimations = (element) => {
    const style = getComputedStyle(element)

    const animationDuration = parseFloat(style.animationDuration) || 0
    const transitionDuration = parseFloat(style.transitionDuration) || 0

    return {
        animations: animationDuration > 0,
        transitions: transitionDuration > 0,
    }
}
