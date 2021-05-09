export default (modal, options) => {
    if (false === options) {
        return
    }

    const opts = Object.assign({
        role: 'dialog',
        modal: true,
        hidden: false,
        label: null,
        labelledBySelector: '[data-fitz-aria-labelledby]',
        describedBySelector: '[data-fitz-aria-describedby]',
    }, options)

    if (opts.role) {
        modal.content.setAttribute('role', opts.role)
    }

    if (opts.modal) {
        modal.content.setAttribute('aria-modal', true)
    }

    if (opts.label) {
        modal.content.setAttribute('aria-label', opts.label)
    }

    const setAriaHidden = (value) => {
        if (!opts.hidden) {
            return
        }

        if (value) {
            modal.root.setAttribute('aria-hidden', true)
        } else {
            modal.root.removeAttribute('aria-hidden')
        }
    }

    setAriaHidden(true)

    modal.on('show:before', () => {
        setAriaHidden(false)

        const labelledBy = modal.content.querySelector(opts.labelledBySelector)
        if (labelledBy) {
            modal.content.setAttribute(
                'aria-labelledby',
                getElementId(labelledBy)
            )
        }

        const describedBy = modal.content.querySelector(opts.describedBySelector)
        if (describedBy) {
            modal.content.setAttribute(
                'aria-describedby',
                getElementId(describedBy)
            )
        }
    })

    modal.on('hide:before', () => {
        setAriaHidden(true)
    })
}

let counter = 0

const getElementId = (element) => {
    if (!element.id) {
        element.id = `fitz-aria-${counter++}`
    }

    return element.id
}
