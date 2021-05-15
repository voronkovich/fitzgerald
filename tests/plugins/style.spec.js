import plugin from '../../src/plugins/style.js'
import { createModalFactory } from '../../src/modal.js'

describe('Plugin "style"', () => {
    let modal

    beforeEach(() => {
        ({ modal } = createModalFactory([{
            key: 'style',
            callable: plugin,
        }]))
    })

    it('sets CSS variables', () => {
        const popup = modal({
            style: {
                backdropBackground: '#eeaaee',
                width: '50%',
            }
        })

        expect(
            popup.root.style.getPropertyValue('--fitz-backdrop-background')
        ).toBe('#eeaaee')

        expect(
            popup.root.style.getPropertyValue('--fitz-width')
        ).toBe('50%')
    })
})
