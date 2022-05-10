export default (modal, options) => {
    if (false === options) {
        return
    }

    if ('string' === typeof options) {
        options = {
            click: options,
        }
    }

    const opts = Object.assign({
        click: '[data-fitz-hide]',
        backdrop: true,
        escape: true,
    }, options)

    if (opts.click) {
        modal.root.addEventListener('click', (e) => {
            if (e.target.closest(opts.click)) {
                modal.hide()
            }
        })
    }

    if (opts.backdrop) {
        modal.root.addEventListener('click', (e) => {
            if (!nodeContains(modal.content, e.target)) {
                modal.hide()
            }
        })
    }

    if (opts.escape) {
        modal.root.addEventListener('keyup', (e) => {
            if ('Escape' === e.key || 'Esc' === e.key) {
                modal.hide()
            }
        })
    }
}

const nodeContains = (node, needle) => {
    if (node.contains(needle)) {
        return true
    }

    const slots = node.querySelectorAll('slot')

    for (const slot of slots) {
        for (const assignedNode of slot.assignedNodes()) {
            if (assignedNode.contains(needle)) {
                return true
            }
        }
    }

    return false
}
