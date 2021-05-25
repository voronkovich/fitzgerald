import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

export default (modal, options = '[data-fitz-lock-scroll]') => {
    if (false === options) {
        return
    }

    const getTargetElement = () => {
        if (options instanceof HTMLElement) {
            return options
        }

        if ('string' === typeof options) {
            const element = modal.root.querySelector(options)

            if (element) {
                return element
            }
        }

        return modal.container
    }

    modal.on('show', () => {
        disableBodyScroll(getTargetElement())
    })

    modal.on('hide', () => {
        enableBodyScroll(getTargetElement())
    })

    modal.on('destroy', () => {
        enableBodyScroll(getTargetElement())
    })
}
