import plugin from '../../src/plugins/hide.js'
import { createModalFactory } from '../../src/modal.js'

describe('Plugin "hide"', () => {
    let modal

    beforeEach(() => {
        ({ modal } = createModalFactory([{
            key: 'hide',
            callable: plugin,
            lazy: false,
        }]))
    })

    it('allows to set element click on which will hide popup', async () => {
        const popup = modal({
            hide: '.close',
        })

        popup.content.innerHTML = `
            <h4>Lorem ipsum</h4>
            <p>Dolor sit amet...</p>
            <button class="close">Close</button>
        `

        await popup.show()

        let hided = false

        popup.on('hide', () => {
            hided = true
        })

        const button = popup.content.querySelector('.close')
        button.click()

        process.nextTick(() => {
            expect(hided).toBe(true)
        })
    })

    it('hides popup when backdrop is clicked on', async () => {
        const popup = modal()

        await popup.show()

        let hided = false

        popup.on('hide', () => {
            hided = true
        })

        popup.backdrop.click()

        process.nextTick(() => {
            expect(hided).toBe(true)
        })
    })

    it('allows to disbale hiding popup when backdrop is clicked on', async () => {
        const popup = modal({
            hide: {
                backdrop: false,
            }
        })

        await popup.show()

        let hided = false

        popup.on('hide', () => {
            hided = true
        })

        popup.backdrop.click()

        process.nextTick(() => {
            expect(hided).toBe(false)
        })
    })

    it('hides popup when <ESC> is pressed', async () => {
        const popup = modal()

        await popup.show()

        let hided = false

        popup.on('hide', () => {
            hided = true
        })

        popup.content.dispatchEvent(new KeyboardEvent('keyup', {
            keyCode: 27,
            bubbles: true,
        }))

        process.nextTick(() => {
            expect(hided).toBe(true)
        })
    })

    it('allows to disbale hiding popup when <ESC> pressed', async () => {
        const popup = modal({
            hide: {
                escape: false,
            }
        })

        await popup.show()

        let hided = false

        popup.on('hide', () => {
            hided = true
        })

        popup.content.dispatchEvent(new KeyboardEvent('keyup', {
            keyCode: 27,
            bubbles: true,
        }))

        process.nextTick(() => {
            expect(hided).toBe(false)
        })
    })
})
