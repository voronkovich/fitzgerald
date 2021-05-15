export default (modal, options) => {
    if (false === options) {
        return
    }

    if (options.vertical) {
        if (!vertical[options.vertical]) {
            throw Error(`Invalid vertical position: "${options.vertical}".`)
        }

        modal.root.style.setProperty(
            '--fitz-position-vertical',
            vertical[options.vertical]
        )
    }

    if (options.horizontal) {
        if (!horizontal[options.horizontal]) {
            throw Error(`Invalid horizontal position: "${options.horizontal}".`)
        }

        modal.root.style.setProperty(
            '--fitz-position-horizontal',
            horizontal[options.horizontal]
        )
    }
}

const vertical = {
    'top':    'flex-start',
    'center': 'center',
    'bottom': 'flex-end',
}

const horizontal = {
    'left':   'flex-start',
    'center': 'center',
    'right':  'flex-end',
}
