export default (modal, options) => {
    if (false === options) {
        return
    }

    const opts = Object.assign({
        role: 'dialog',
        label: null,
        labelledBy: '[data-fitz-aria-labelledby]',
        describedBy: '[data-fitz-aria-describedby]',
    }, options)

    modal.content.setAttribute('aria-modal', true)

    if (opts.role) {
        modal.content.setAttribute('role', opts.role)
    }


    if (opts.label) {
        modal.content.setAttribute('aria-label', opts.label)
    }

    modal.on('show:before', () => {
        const labelledBy = modal.content.querySelector(opts.labelledBy)
        if (labelledBy) {
            modal.content.setAttribute(
                'aria-labelledby',
                getElementId(labelledBy)
            )
        }

        const describedBy = modal.content.querySelector(opts.describedBy)
        if (describedBy) {
            modal.content.setAttribute(
                'aria-describedby',
                getElementId(describedBy)
            )
        }
    })
}

let counter = 0

const getElementId = (element) => {
    if (!element.id) {
        element.id = `fitz-aria-${counter++}`
    }

    return element.id
}
