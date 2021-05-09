import plugin from '../../src/plugins/aria.js'
import { createModalFactory } from '../../src/modal.js'

describe('Plugin "aria"', () => {
    let modal

    beforeEach(() => {
        ({ modal } = createModalFactory([{
            key: 'aria',
            callable: plugin,
        }]))
    })

    it('adds "dialog" role by default', () => {
        const popup = modal({
            aria: true,
        })

        expect(popup.content.getAttribute('role')).toBe('dialog')
    })

    it('allows to change role attribute', () => {
        const popup = modal({
            aria: {
                role: 'alertdialog',
            },
        })

        expect(popup.content.getAttribute('role')).toBe('alertdialog')
    })

    it('adds "aria-modal" attribute', () => {
        const popup = modal({
            aria: true,
        })

        expect(popup.content.getAttribute('aria-modal')).toBe('true')
    })

    it('allows to set "aria-label" attribute', () => {
        const popup = modal({
            aria: {
                label: 'Aria label',
            }
        })

        expect(popup.content.getAttribute('aria-label')).toBe('Aria label')
    })

    it('allows to use "aria-labelledby" attribute', async () => {
        const popup = modal({
            aria: {
                labelledBy: 'h4'
            }
        })

        popup.content.innerHTML = `
            <h4>Hello!</h4>
            <div>Lorem ipsum dolor sit amet</div>
        `

        await popup.show()

        // Auto generated id
        const id = popup.content.firstElementChild.id

        expect(id).toBeTruthy()
        expect(popup.content.getAttribute('aria-labelledby')).toBe(id)
    })

    it('allows to use "aria-describedby" attribute', async () => {
        const popup = modal({
            aria: {
                describedBy: 'div',
            }
        })

        popup.content.innerHTML = `
            <h4>Hello!</h4>
            <div>Lorem ipsum dolor sit amet</div>
        `

        await popup.show()

        // Auto generated id
        const id = popup.content.lastElementChild.id

        expect(id).toBeTruthy()
        expect(popup.content.getAttribute('aria-describedby')).toBe(id)
    })
})
