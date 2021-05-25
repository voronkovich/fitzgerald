import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

export default (modal, lockScroll) => {
    if (false === lockScroll) {
        return
    }

    modal.on('show', () => {
        disableBodyScroll(modal.container)
    })

    modal.on('hide', () => {
        enableBodyScroll(modal.container)
    })

    modal.on('destroy', () => {
        enableBodyScroll(modal.container)
    })
}
