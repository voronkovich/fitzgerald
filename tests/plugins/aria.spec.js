import plugin from '../../src/plugins/aria.js'
import { createModalFactory } from '../../src/modal.js'

describe('Plugin "aria"', () => {
    let createModal

    beforeEach(() => {
        ({ createModal } = createModalFactory([{
            key: 'aria',
            callable: plugin,
        }]))
    })

    it('adds "dialog" role by default', () => {
        const modal = createModal({
            aria: true,
        })

        expect(modal.content.getAttribute('role')).toBe('dialog')
    })

    it('allows to change role attribute', () => {
        const modal = createModal({
            aria: {
                role: 'alertdialog',
            },
        })

        expect(modal.content.getAttribute('role')).toBe('alertdialog')
    })

    it('adds "aria-modal" attribute', () => {
        const modal = createModal({
            aria: true,
        })

        expect(modal.content.getAttribute('aria-modal')).toBe('true')
    })

    it('allows to set "aria-label" attribute', () => {
        const modal = createModal({
            aria: {
                label: 'Aria label',
            }
        })

        expect(modal.content.getAttribute('aria-label')).toBe('Aria label')
    })

    it('allows to use "aria-labelledby" attribute', async () => {
        const modal = createModal({
            aria: {
                labelledBy: 'h4'
            }
        })

        modal.content.innerHTML = `
            <h4>Hello!</h4>
            <div>Lorem ipsum dolor sit amet</div>
        `

        await modal.show()

        // Auto generated id
        const id = modal.content.firstElementChild.id

        expect(id).toBeTruthy()
        expect(modal.content.getAttribute('aria-labelledby')).toBe(id)
    })

    it('allows to use "aria-describedby" attribute', async () => {
        const modal = createModal({
            aria: {
                describedBy: 'div',
            }
        })

        modal.content.innerHTML = `
            <h4>Hello!</h4>
            <div>Lorem ipsum dolor sit amet</div>
        `

        await modal.show()

        // Auto generated id
        const id = modal.content.lastElementChild.id

        expect(id).toBeTruthy()
        expect(modal.content.getAttribute('aria-describedby')).toBe(id)
    })
})
