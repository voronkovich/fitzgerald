import plugin from '../../src/plugins/id.js'
import { createModalFactory } from '../../src/modal.js'

describe('Plugin "id"', () => {
    let modal

    beforeEach(() => {
        ({ modal } = createModalFactory([{
            key: 'id',
            callable: plugin,
        }]))
    })

    it('adds "id" attribute to root element', () => {
        const popup = modal({
            id: 'my-modal',
        })

        expect(popup.root.id).toBe('my-modal')
    })

    it('throws an exception if invalid value provided', () => {
        expect(() => {
            modal({
                id: {},
            })
        }).toThrow('An "id" must be not empty string.')
    })
})
