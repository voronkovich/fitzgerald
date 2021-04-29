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
        modal.backdrop.addEventListener('click', modal.hide)
    }

    if (opts.escape) {
        modal.root.addEventListener('keyup', (e) => {
            if (27 === e.keyCode) {
                modal.hide()
            }
        })
    }
}
