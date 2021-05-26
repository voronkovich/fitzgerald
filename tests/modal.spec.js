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

        factory.usePlugin({
            key: 'bar',
            callable: () => {
                barUsed = true
            },
        })

        factory.createModal({
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

        const modal = factory.createModal({
            foo: 'foo'
        })

        expect(fooOptions).toBe('foo')
        expect(fooModal).toBe(modal)
    })
})

describe('Modal', () => {
    const { createModal } = createModalFactory()

    beforeEach(() => {
        document.body.innerHTML = ''
    })

    it('is frozen', () => {
        const modal = createModal()

        expect(Object.isFrozen(modal)).toBe(true)
    })

    it('is hidden by default', () => {
        const modal = createModal()

        expect(modal.isHidden()).toBe(true)
        expect(modal.isVisible()).toBe(false)
    })

    describe('Show', () => {
        it('shows modal', async () => {
            const modal = createModal()

            await modal.show()

            expect(modal.root.classList.contains('fitz-visible')).toBe(true)
            expect(modal.isVisible()).toBe(true)
            expect(modal.isHidden()).toBe(false)
        })

        it('returns the same promise instance while showing process is not completed', () => {
            const modal = createModal()

            const promise1 = modal.show()
            const promise2 = modal.show()

            expect(promise1).toBe(promise2)
        })

        it('emits event before showing modal', async () => {
            const modal = createModal()

            let firedBefore = false

            modal.on('show:before', () => {
                firedBefore = modal.isHidden()
            })

            await modal.show()

            expect(firedBefore).toBe(true)
        })

        it('emits event after showing modal', async () => {
            const modal = createModal()

            let firedAfter = false

            modal.on('show', () => {
                firedAfter = modal.isVisible()
            })

            await modal.show()

            expect(firedAfter).toBe(true)
        })

        it('throws an exception if modal is destroyed', async () => {
            const modal = createModal()

            modal.destroy()

            await expect(modal.show())
                .rejects
                .toThrow(Error('Modal is destroyed.'))
        })

        it('throws an exception if hiding process is not completed', async () => {
            const modal = createModal()

            await modal.show()

            modal.hide()

            await expect(modal.show())
                .rejects
                .toThrow(Error('Hiding process is not completed.'))
        })
    })

    describe('Hide', () => {
        it('hides modal', async () => {
            const modal = createModal()

            await modal.show()

            expect(modal.isVisible()).toBe(true)

            await modal.hide()

            expect(modal.root.classList.contains('fitz-visible')).toBe(false)
            expect(modal.isVisible()).toBe(false)
            expect(modal.isHidden()).toBe(true)
        })

        it('returns the same promise instance while hiding process is not completed', async () => {
            const modal = createModal()

            await modal.show()

            const promise1 = modal.hide()
            const promise2 = modal.hide()

            expect(promise1).toBe(promise2)
        })

        it('emits event before hiding modal', async () => {
            const modal = createModal()

            let firedBefore = false

            modal.on('hide:before', () => {
                firedBefore = modal.isVisible()
            })

            await modal.show()

            await modal.hide()

            expect(firedBefore).toBe(true)
        })

        it('emits event after hiding modal', async () => {
            const modal = createModal()

            let firedAfter = false

            modal.on('hide', () => {
                firedAfter = modal.isHidden()
            })

            await modal.show()

            await modal.hide()

            expect(firedAfter).toBe(true)
        })

        it('throws an exception if modal is destroyed', async () => {
            const modal = createModal()

            modal.destroy()

            await expect(modal.hide())
                .rejects
                .toThrow(Error('Modal is destroyed.'))
        })

        it('throws an exception if showing process is not completed', async () => {
            const modal = createModal()

            modal.show()

            await expect(modal.hide())
                .rejects
                .toThrow(Error('Showing process is not completed.'))
        })
    })

    describe('Destroy', () => {
        it('emits event', async () => {
            const modal = createModal()

            let fired = false

            modal.on('destroy', () => {
                fired = true
            })

            await modal.destroy()

            expect(fired).toBe(true)
        })

        it('returns the same promise instance', async () => {
            const modal = createModal()

            const promise1 = modal.destroy()
            const promise2 = modal.destroy()

            expect(promise1).toBe(promise2)
        })
    })
})
