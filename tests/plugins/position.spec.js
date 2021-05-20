import plugin from '../../src/plugins/position.js'
import { createModalFactory } from '../../src/modal.js'

describe('Plugin "position"', () => {
    let createModal

    beforeEach(() => {
        ({ createModal } = createModalFactory([{
            key: 'position',
            callable: plugin,
        }]))
    })

    it('sets modal position with CSS variables', () => {
        const modal = createModal({
            position: {
                vertical: 'bottom',
                horizontal: 'left',
            }
        })

        expect(
            modal.root.style.getPropertyValue('--fitz-position-vertical')
        ).toBe('flex-end')

        expect(
            modal.root.style.getPropertyValue('--fitz-position-horizontal')
        ).toBe('flex-start')
    })

    it('Throws exception if invalid vertical position specified', () => {
        expect(() => {
            createModal({
                position: {
                    vertical: 'foo',
                }
            })
        }).toThrow('Invalid vertical position: "foo".')
    })

    it('Throws exception if invalid horizontal position specified', () => {
        expect(() => {
            createModal({
                position: {
                    horizontal: 'bar',
                }
            })
        }).toThrow('Invalid horizontal position: "bar".')
    })
})
