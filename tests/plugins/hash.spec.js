import plugin from '../../src/plugins/hash.js'
import { createModalFactory } from '../../src/modal.js'

describe('Plugin "hash"', () => {
    let modal

    beforeEach(() => {
        ({ modal } = createModalFactory([{
            key: 'hash',
            callable: plugin,
        }]))
    })

    it('throws an exception if invalid hash provided', () => {
        expect(() => {
            modal({ hash: 'abrakadabra' })
        }).toThrow('Hash must be not empty string starting with "#".')
    })

    it("changes location's hash when modal is showing", async () => {
        const popup = modal({
            hash: '#sign-in',
        })

        await popup.show()

        expect(location.hash).toBe('#sign-in')
    })

    it("removes location's hash when modal is hiding", async () => {
        location.hash = '#hello'

        const popup = modal({
            hash: '#sign-in',
        })

        await popup.show()
        await popup.hide()

        expect(location.hash).toBe('')
    })

    it("shows popup when location's hash changed to specified value", () => {
        const popup = modal({
            hash: '#sign-in',
        })

        let showed = false

        popup.on('show', () => {
            showed = true
        })

        window.location.hash = '#sign-in'
        // JSDOM doesn't fire "hashchange" automatically
        window.dispatchEvent(new HashChangeEvent('hashchange'))

        process.nextTick(() => {
            expect(showed).toBe(true)
        })
    })

    it("hides popup when location's hash changed to arbitrary value", async () => {
        const popup = modal({
            hash: '#sign-in',
        })

        await popup.show()

        let hided = false

        popup.on('hide', () => {
            hided = true
        })

        window.location.hash = '#gallery'
        // JSDOM doesn't fire "hashchange" automatically
        window.dispatchEvent(new HashChangeEvent('hashchange'))

        process.nextTick(() => {
            expect(hided).toBe(true)
        })
    })

    it('removes event listener after modal destroy', async () => {
        const popup = modal({
            hash: '#sign-in',
        })

        window.removeEventListener = jest.fn(window.removeEventListener)

        await popup.destroy()

        expect(window.removeEventListener).toBeCalled()
    })
})
