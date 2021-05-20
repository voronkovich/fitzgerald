import plugin from '../../src/plugins/class.js'
import { createModalFactory } from '../../src/modal.js'

describe('Plugin "class"', () => {
    let createModal

    beforeEach(() => {
        ({ createModal } = createModalFactory([{
            key: 'class',
            callable: plugin,
        }]))
    })

    it('adds "class" attribute to root element', () => {
        const modal = createModal({
            class: 'sign-in my-modal',
        })

        expect(modal.root.classList.contains('sign-in')).toBe(true)
        expect(modal.root.classList.contains('my-modal')).toBe(true)
    })

    it('throws an exception if invalid value provided', () => {
        expect(() => {
            createModal({
                class: {},
            })
        }).toThrow('Class must be not empty string.')
    })
})
