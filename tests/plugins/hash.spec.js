/**
 * @jest-environment jsdom
 */

import plugin from '../../src/plugins/hash.js'
import { createModalFactory } from '../../src/modal.js'

describe('Plugin "hash"', () => {
    let createModal

    beforeEach(() => {
        ({ createModal } = createModalFactory([{
            key: 'hash',
            callable: plugin,
        }]))
    })

    it('throws an exception if invalid hash provided', () => {
        expect(() => {
            createModal({ hash: 'abrakadabra' })
        }).toThrow('Hash must be not empty string starting with "#".')
    })

    it("changes location's hash when modal is showing", async () => {
        const modal = createModal({
            hash: '#sign-in',
        })

        await modal.show()

        expect(location.hash).toBe('#sign-in')
    })

    it("removes location's hash when modal is hiding", async () => {
        location.hash = '#hello'

        const modal = createModal({
            hash: '#sign-in',
        })

        await modal.show()
        await modal.hide()

        expect(location.hash).toBe('')
    })

    it("shows modal when location's hash changed to specified value", () => {
        const modal = createModal({
            hash: '#sign-in',
        })

        let showed = false

        modal.on('show', () => {
            showed = true
        })

        window.location.hash = '#sign-in'
        // JSDOM doesn't fire "hashchange" automatically
        window.dispatchEvent(new HashChangeEvent('hashchange'))

        process.nextTick(() => {
            expect(showed).toBe(true)
        })
    })

    it("hides modal when location's hash changed to arbitrary value", async () => {
        const modal = createModal({
            hash: '#sign-in',
        })

        await modal.show()

        let hided = false

        modal.on('hide', () => {
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
        const modal = createModal({
            hash: '#sign-in',
        })

        window.removeEventListener = jest.fn(window.removeEventListener)

        await modal.destroy()

        expect(window.removeEventListener).toBeCalled()
    })
})
