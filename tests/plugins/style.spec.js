/**
 * @jest-environment jsdom
 */

import plugin from '../../src/plugins/style.js'
import { createModalFactory } from '../../src/modal.js'

describe('Plugin "style"', () => {
    let createModal

    beforeEach(() => {
        ({ createModal } = createModalFactory([{
            key: 'style',
            callable: plugin,
        }]))
    })

    it('sets CSS variables', () => {
        const modal = createModal({
            style: {
                backdropBackground: '#eeaaee',
                width: '50%',
            }
        })

        expect(
            modal.root.style.getPropertyValue('--fitz-backdrop-background')
        ).toBe('#eeaaee')

        expect(
            modal.root.style.getPropertyValue('--fitz-width')
        ).toBe('50%')
    })
})
