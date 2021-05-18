import plugin from '../../src/plugins/mount.js'
import { createModalFactory } from '../../src/modal.js'

describe('Plugin "mount"', () => {
    let modal

    beforeEach(() => {
        ({ modal } = createModalFactory([{
            key: 'mount',
            callable: plugin,
            lazy: false,
        }]))

        document.body.innerHTML = ''
    })

    it('mounts modal to document.body by default', () => {
        const popup = modal()

        expect(document.body.lastElementChild).toBe(popup.root)
    })

    it('allows to set element for mounting', () => {
        document.body.innerHTML = `
            <h1>Hello!</h1>
            <p>Lorem ipsum dolor sit amet</p>
            <div id="modal"></div>
        `

        const popup = modal({
            mount: '#modal'
        })

        const mountElement = document.querySelector('#modal')

        expect(mountElement.lastElementChild).toBe(popup.root)
    })

    it('throws exception if mount element not exists', () => {
        expect(() => {
            modal({
                mount: '#my-modal > div'
            })
        }).toThrow('Mount element "#my-modal > div" not found.')
    })

    it('throws exception if mount element invalid', () => {
        expect(() => {
            modal({
                mount: []
            })
        }).toThrow('Mount element must be instance of "Element".')
    })

    it('removes modal from DOM after modal has been destroyed', async () => {
        document.body.innerHTML = `
            <h1>Hello!</h1>
            <p>Lorem ipsum dolor sit amet</p>
            <div id="modal"></div>
        `

        const popup = modal({
            mount: '#modal'
        })

        const mountElement = document.querySelector('#modal')

        expect(mountElement.firstElementChild).not.toBe(null)

        await popup.destroy()

        expect(mountElement.firstElementChild).toBe(null)
    })
})
