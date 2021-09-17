/**
 * @jest-environment jsdom
 */

import plugin from '../../src/plugins/id.js'
import { createModalFactory } from '../../src/modal.js'

describe('Plugin "id"', () => {
    let createModal

    beforeEach(() => {
        ({ createModal } = createModalFactory([{
            key: 'id',
            callable: plugin,
        }]))
    })

    it('adds "id" attribute to root element', () => {
        const modal = createModal({
            id: 'my-modal',
        })

        expect(modal.root.id).toBe('my-modal')
    })

    it('throws an exception if invalid value provided', () => {
        expect(() => {
            createModal({
                id: {},
            })
        }).toThrow('An "id" must be not empty string.')
    })
})
