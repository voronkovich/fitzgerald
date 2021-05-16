import plugin from '../../src/plugins/animate.js'
import { createModalFactory } from '../../src/modal.js'

describe('Plugin "animate"', () => {
    let modal

    beforeEach(() => {
        ({ modal } = createModalFactory([{
            key: 'animate',
            callable: plugin,
        }]))
    })

    it('allows to add specified CSS classes to animate element after modal has been showed', async () => {
        const popup = modal({
            animate: {
                'button': {
                    show: 'animate__animated animate__bounceInRight',
                }
            }
        })

        popup.content.innerHTML = `
            <button class="btn">Click me!</button>
        `

        const button = popup.content.querySelector('.btn')

        await popup.show()

        expect(button.className).toBe('btn animate__animated animate__bounceInRight')

        button.dispatchEvent(new Event('animationend'))

        expect(button.className).toBe('btn')
    })

    it('allows to add specified CSS classes to animate element before modal has been hidden', async () => {
        const popup = modal({
            animate: {
                'button': {
                    hide: 'animate__animated animate__fadeOut',
                }
            }
        })

        popup.content.innerHTML = `
            <button class="btn">Click me!</button>
        `

        const button = popup.content.querySelector('.btn')

        await popup.show()

        await popup.hide()

        expect(button.className).toBe('btn animate__animated animate__fadeOut')

        button.dispatchEvent(new Event('animationend'))

        expect(button.className).toBe('btn')
    })
})
