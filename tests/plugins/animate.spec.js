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

    it('adds specified CSS classes for animating element', async () => {
        const popup = modal({
            animate: {
                'button': {
                    show: 'animate__animated animate__bounceInRight',
                }
            }
        })

        popup.content.innerHTML = `
            <button>Click me!</button>
        `

        const button = popup.content.querySelector('button')

        await popup.show()

        expect(button.className).toBe('animate__animated animate__bounceInRight')
    })
})
