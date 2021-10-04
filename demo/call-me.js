(function() {
    const modal = Fitz.createModal({
        class: {
            root: 'call-me',
            content: 'animate__animated',
        },
        content: document.querySelector('#call-me-template'),
        hash: '#call-me',
        focus: 'input',
        aria: {
            labelledBy: 'header h2',
            describedBy: 'header p',
        },
        animate: {
            content: {
                show: 'animate__bounceInDown',
                hide: 'animate__fadeOutLeft',
            },
            '[type=submit]': {
                show: 'animate__animated animate__slow animate__bounceInUp',
            },
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

        modal.setFocus()
    }, { once: true })
}())
