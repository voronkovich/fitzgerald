const modal = Fitz.createModal({
    class: {
        root: 'call-me animate__animated',
        content: 'animate__animated',
    },
    content: document.querySelector('#call-me-template'),
    hash: '#call-me',
    style: {
        // backdropOpacity: 0.9,
        // backdropBackground: '#000000',
        // transitionDuration: '250ms',
    },
    focus: 'input',
    aria: {
        labelledBy: 'header h2',
        describedBy: 'header p',
    },
    animate: {
        // root: {
        //     show: 'animate__fadeIn',
        //     hide: 'animate__fadeOut',
        // },
        // content: {
        //     show: 'animate__bounceInDown',
        //     hide: 'animate__fadeOutLeft',
        // },
        // '[type=submit]': {
        //     show: 'animate__animated animate__slow animate__bounceInRight',
        // },
    }
})

modal.content.addEventListener('submit', (e) => {
    e.preventDefault()

    e.target.remove()

    const name = e.target.name.value
    const phone = e.target.phone.value

    modal.content.querySelector('header h2').textContent = 'Thank you!'
    modal.content.querySelector('header p').textContent = `
        Thank you, ${name}! We will call you at ${phone} as soon as possible.
    `
}, { once: true })
