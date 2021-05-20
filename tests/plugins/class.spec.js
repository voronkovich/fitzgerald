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

    it('adds "class" attribute to root element if string specified', () => {
        const modal = createModal({
            class: 'sign-in my-modal',
        })

        expect(modal.root.classList.contains('sign-in')).toBe(true)
        expect(modal.root.classList.contains('my-modal')).toBe(true)
    })

    it('adds "class" attributes for specified elements', () => {
        const modal = createModal({
            class: {
                backdrop: 'bg-purple-600 bg-opacity-100',
                content: 'bg-gray-100 rounded-xl p-8',
            }
        })

        expect(modal.backdrop.classList.contains('bg-purple-600')).toBe(true)
        expect(modal.backdrop.classList.contains('bg-opacity-100')).toBe(true)

        expect(modal.content.classList.contains('bg-gray-100')).toBe(true)
        expect(modal.content.classList.contains('rounded-xl')).toBe(true)
        expect(modal.content.classList.contains('p-8')).toBe(true)
    })

    it('throws an exception if specified element not exists', () => {
        expect(() => {
            createModal({
                class: {
                    foo: 'bg-purple-100',
                },
            })
        }).toThrow(`Couldn't set class for "foo" element because it not exists.`)
    })
})
