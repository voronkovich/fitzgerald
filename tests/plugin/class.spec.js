import plugin from '../../src/plugins/class.js'
import { createModalFactory } from '../../src/modal.js'

describe('Plugin "class"', () => {
    let modal

    beforeEach(() => {
        ({ modal } = createModalFactory([{
            key: 'class',
            callable: plugin,
        }]))
    })

    it('adds "class" attribute to root element', () => {
        const popup = modal({
            class: 'sign-in my-modal',
        })

        expect(popup.root.classList.contains('sign-in')).toBe(true)
        expect(popup.root.classList.contains('my-modal')).toBe(true)
    })

    it('throws an exception if invalid value provided', () => {
        expect(() => {
            modal({
                class: {},
            })
        }).toThrow('Class must be not empty string.')
    })
})
