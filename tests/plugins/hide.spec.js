import plugin from '../../src/plugins/hide.js'
import { createModalFactory } from '../../src/modal.js'

describe('Plugin "hide"', () => {
    let createModal

    beforeEach(() => {
        ({ createModal } = createModalFactory([{
            key: 'hide',
            callable: plugin,
            lazy: false,
        }]))
    })

    it('allows to set element click on which will hide modal', async () => {
        const modal = createModal({
            hide: '.close',
        })

        modal.content.innerHTML = `
            <h4>Lorem ipsum</h4>
            <p>Dolor sit amet...</p>
            <button class="close">Close</button>
        `

        await modal.show()

        let hided = false

        modal.on('hide', () => {
            hided = true
        })

        const button = modal.content.querySelector('.close')
        button.click()

        process.nextTick(() => {
            expect(hided).toBe(true)
        })
    })

    it('hides modal when backdrop is clicked on', async () => {
        const modal = createModal()

        await modal.show()

        let hided = false

        modal.on('hide', () => {
            hided = true
        })

        modal.backdrop.click()

        process.nextTick(() => {
            expect(hided).toBe(true)
        })
    })

    it('allows to disbale hiding modal when backdrop is clicked on', async () => {
        const modal = createModal({
            hide: {
                backdrop: false,
            }
        })

        await modal.show()

        let hided = false

        modal.on('hide', () => {
            hided = true
        })

        modal.backdrop.click()

        process.nextTick(() => {
            expect(hided).toBe(false)
        })
    })

    it('hides modal when <ESC> is pressed', async () => {
        const modal = createModal()

        await modal.show()

        let hided = false

        modal.on('hide', () => {
            hided = true
        })

        modal.content.dispatchEvent(new KeyboardEvent('keyup', {
            key: 'Escape',
            bubbles: true,
        }))

        process.nextTick(() => {
            expect(hided).toBe(true)
        })
    })

    it('allows to disbale hiding modal when <ESC> pressed', async () => {
        const modal = createModal({
            hide: {
                escape: false,
            }
        })

        await modal.show()

        let hided = false

        modal.on('hide', () => {
            hided = true
        })

        modal.content.dispatchEvent(new KeyboardEvent('keyup', {
            key: 'Escape',
            bubbles: true,
        }))

        process.nextTick(() => {
            expect(hided).toBe(false)
        })
    })
})
