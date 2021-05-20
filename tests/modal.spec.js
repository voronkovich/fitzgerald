import { createModalFactory } from '../src/modal.js'

describe('createModalFactory', () => {
    it('allows to use plugins', () => {
        let fooUsed = false
        let barUsed = false

        const factory = createModalFactory([{
            key: 'foo',
            callable: () => {
                fooUsed = true
            },
        }])

        factory.plugin({
            key: 'bar',
            callable: () => {
                barUsed = true
            },
        })

        factory.modal({
            foo: 'foo',
            bar: 'bar',
        })

        expect(fooUsed).toBe(true)
        expect(barUsed).toBe(true)
    })

    it('passes modal instance and plugin options to plugin callable', () => {
        let fooOptions
        let fooModal

        const factory = createModalFactory([{
            key: 'foo',
            callable: (modal, options) => {
                fooOptions = options
                fooModal = modal
            },
        }])

        const popup = factory.modal({
            foo: 'foo'
        })

        expect(fooOptions).toBe('foo')
        expect(fooModal).toBe(popup)
    })
})

describe('Modal', () => {
    const { modal } = createModalFactory()

    beforeEach(() => {
        document.body.innerHTML = ''
    })

    it('is frozen', () => {
        const popup = modal()

        expect(Object.isFrozen(popup)).toBe(true)
    })

    it('is hidden by default', () => {
        const popup = modal()

        expect(popup.isHidden()).toBe(true)
        expect(popup.isVisible()).toBe(false)
    })

    describe('Show', () => {
        it('shows popup', async () => {
            const popup = modal()

            await popup.show()

            expect(popup.root.style.visibility).toBe('visible')
            expect(popup.isVisible()).toBe(true)
            expect(popup.isHidden()).toBe(false)
        })

        it('returns the same promise instance while showing process is not completed', () => {
            const popup = modal()

            const promise1 = popup.show()
            const promise2 = popup.show()

            expect(promise1).toBe(promise2)
        })

        it('emits event before showing popup', async () => {
            const popup = modal()

            let firedBefore = false

            popup.on('show:before', () => {
                firedBefore = popup.isHidden()
            })

            await popup.show()

            expect(firedBefore).toBe(true)
        })

        it('emits event after showing popup', async () => {
            const popup = modal()

            let firedAfter = false

            popup.on('show', () => {
                firedAfter = popup.isVisible()
            })

            await popup.show()

            expect(firedAfter).toBe(true)
        })

        it('throws an exception if modal is destroyed', async () => {
            const popup = modal()

            popup.destroy()

            await expect(popup.show())
                .rejects
                .toThrow(Error('Modal is destroyed.'))
        })

        it('throws an exception if hiding process is not completed', async () => {
            const popup = modal()

            await popup.show()

            popup.hide()

            await expect(popup.show())
                .rejects
                .toThrow(Error('Hiding process is not completed.'))
        })
    })

    describe('Hide', () => {
        it('hides popup', async () => {
            const popup = modal()

            await popup.show()

            expect(popup.isVisible()).toBe(true)

            await popup.hide()

            expect(popup.root.style.visibility).toBe('hidden')
            expect(popup.isVisible()).toBe(false)
            expect(popup.isHidden()).toBe(true)
        })

        it('returns the same promise instance while hiding process is not completed', async () => {
            const popup = modal()

            await popup.show()

            const promise1 = popup.hide()
            const promise2 = popup.hide()

            expect(promise1).toBe(promise2)
        })

        it('emits event before hiding popup', async () => {
            const popup = modal()

            let firedBefore = false

            popup.on('hide:before', () => {
                firedBefore = popup.isVisible()
            })

            await popup.show()

            await popup.hide()

            expect(firedBefore).toBe(true)
        })

        it('emits event after hiding popup', async () => {
            const popup = modal()

            let firedAfter = false

            popup.on('hide', () => {
                firedAfter = popup.isHidden()
            })

            await popup.show()

            await popup.hide()

            expect(firedAfter).toBe(true)
        })

        it('throws an exception if modal is destroyed', async () => {
            const popup = modal()

            popup.destroy()

            await expect(popup.hide())
                .rejects
                .toThrow(Error('Modal is destroyed.'))
        })

        it('throws an exception if showing process is not completed', async () => {
            const popup = modal()

            popup.show()

            await expect(popup.hide())
                .rejects
                .toThrow(Error('Showing process is not completed.'))
        })
    })

    describe('Destroy', () => {
        it('emits event', async () => {
            const popup = modal()

            let fired = false

            popup.on('destroy', () => {
                fired = true
            })

            await popup.destroy()

            expect(fired).toBe(true)
        })

        it('returns the same promise instance', async () => {
            const popup = modal()

            const promise1 = popup.destroy()
            const promise2 = popup.destroy()

            expect(promise1).toBe(promise2)
        })
    })
})
