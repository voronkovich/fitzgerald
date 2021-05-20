import plugin from '../../src/plugins/zIndex.js'
import { createModalFactory } from '../../src/modal.js'

describe('Plugin "zIndex"', () => {
    let modal

    beforeEach(() => {
        ({ modal } = createModalFactory([{
            key: 'zIndex',
            callable: plugin,
            lazy: false,
        }]))

        document.body.innerHTML = ''
    })

    it('throws exception if invalid value specified', () => {
        expect(() => {
            modal({
                zIndex: 'foo'
            })
        }).toThrow('Invalid z-index value: "foo".')
    })

    it('sets provided z-index value for modal root element', () => {
        const popup = modal({
            zIndex: 50,
        })

        expect(Number(popup.root.style.zIndex)).toBe(50)
    })

    it('sets maximum available z-index value by default', () => {
        document.body.innerHTML = `
            <h1 style="z-index: 3">My z-index is 3!</h1>
            <div style="z-index: 5">My z-index is 5!</div>
        `

        const popup = modal()

        expect(Number(popup.root.style.zIndex)).toBeGreaterThan(5)
    })
})
