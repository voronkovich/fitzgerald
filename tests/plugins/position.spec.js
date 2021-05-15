import plugin from '../../src/plugins/position.js'
import { createModalFactory } from '../../src/modal.js'

describe('Plugin "position"', () => {
    let modal

    beforeEach(() => {
        ({ modal } = createModalFactory([{
            key: 'position',
            callable: plugin,
        }]))
    })

    it('sets modal position with CSS variables', () => {
        const popup = modal({
            position: {
                vertical: 'bottom',
                horizontal: 'left',
            }
        })

        expect(
            popup.root.style.getPropertyValue('--fitz-position-vertical')
        ).toBe('flex-end')

        expect(
            popup.root.style.getPropertyValue('--fitz-position-horizontal')
        ).toBe('flex-start')
    })

    it('Throws exception if invalid vertical position specified', () => {
        expect(() => {
            modal({
                position: {
                    vertical: 'foo',
                }
            })
        }).toThrow('Invalid vertical position: "foo".')
    })

    it('Throws exception if invalid horizontal position specified', () => {
        expect(() => {
            modal({
                position: {
                    horizontal: 'bar',
                }
            })
        }).toThrow('Invalid horizontal position: "bar".')
    })
})
