import plugin from '../../src/plugins/mount.js'
import { createModalFactory } from '../../src/modal.js'

describe('Plugin "mount"', () => {
    let createModal

    beforeEach(() => {
        ({ createModal } = createModalFactory([{
            key: 'mount',
            callable: plugin,
            lazy: false,
        }]))

        document.body.innerHTML = ''
    })

    it('mounts modal to document.body by default', () => {
        const modal = createModal()

        expect(document.body.lastElementChild).toBe(modal.root)
    })

    it('allows to set element for mounting', () => {
        document.body.innerHTML = `
            <h1>Hello!</h1>
            <p>Lorem ipsum dolor sit amet</p>
            <div id="modal"></div>
        `

        const modal = createModal({
            mount: '#modal'
        })

        const mountElement = document.querySelector('#modal')

        expect(mountElement.lastElementChild).toBe(modal.root)
    })

    it('throws exception if mount element not exists', () => {
        expect(() => {
            createModal({
                mount: '#my-modal > div'
            })
        }).toThrow('Mount element "#my-modal > div" not found.')
    })

    it('throws exception if mount element invalid', () => {
        expect(() => {
            createModal({
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

        const modal = createModal({
            mount: '#modal'
        })

        const mountElement = document.querySelector('#modal')

        expect(mountElement.firstElementChild).not.toBe(null)

        await modal.destroy()

        expect(mountElement.firstElementChild).toBe(null)
    })
})
