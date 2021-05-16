export default (modal, options) => {
    if (false === options) {
        return
    }

    for (const [key, opts]  of Object.entries(options)) {
        if (opts.show) {
            animateElement(modal, key, 'show', opts.show)
        }

        if (opts.hide) {
            animateElement(modal, key, 'hide:before', opts.hide)
        }
    }
}

const animateElement = (modal, key, event, classes) => {
    classes = classes.split(/\s/)

    modal.on(event, () => {
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
