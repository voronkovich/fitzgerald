export default (modal, options = {}) => {
    if (false === options) {
        return
    }

    const opts = Object.assign({
        hideSelector: '[data-modest-popup-hide]',
        onBackdropClick: true,
        onEscape: true,
    }, options)

    if (opts.hideSelector) {
        modal.root.addEventListener('click', (e) => {
            if (e.target.closest(opts.hideSelector)) {
                modal.hide()
            }
        })
    }

    if (opts.onBackdropClick) {
        modal.backdrop.addEventListener('click', modal.hide)
    }

    if (opts.onEscape) {
        modal.root.addEventListener('keyup', (e) => {
            if (27 === e.keyCode) {
                modal.hide()
            }
        })
    }
}
