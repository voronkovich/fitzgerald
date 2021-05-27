Fitz.createModal({
    class: {
        root: 'animate__animated',
        content: 'animate__animated',
    },
    content: document.querySelector('#terms-of-use-template'),
    hash: '#terms-of-use',
    style: {
        // backdropOpacity: 0.9,
        // backdropBackground: '#000000',
        // transitionDuration: '250ms',
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
