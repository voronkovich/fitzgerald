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

        const modal = factory.modal({
            foo: 'foo'
        })

        expect(fooOptions).toBe('foo')
        expect(fooModal).toBe(modal)
    })
})

describe('Modal', () => {
    it('is frozen', () => {
        const modal = createModalFactory().modal()

        expect(Object.isFrozen(modal)).toBe(true)
    })

    it('is hidden by default', () => {
        const factory = createModalFactory()

        const modal = factory.modal()

        expect(modal.isHidden()).toBe(true)
        expect(modal.isVisible()).toBe(false)
    })

    describe('Show', () => {
        it('shows popup', async () => {
            const factory = createModalFactory()

            const modal = factory.modal()
            await modal.show()

            expect(modal.root.style.visibility).toBe('visible')
            expect(modal.isVisible()).toBe(true)
            expect(modal.isHidden()).toBe(false)
        })

        it('returns the same promise instance while showing process is not completed', () => {
            const factory = createModalFactory()

            const modal = factory.modal()

            const promise1 = modal.show()
            const promise2 = modal.show()

            expect(promise1).toBe(promise2)
        })

        it('emits event before showing popup', async () => {
            let firedBefore = false

            const modal = createModalFactory().modal()

            modal.on('show:before', () => {
                firedBefore = modal.isHidden()
            })

            await modal.show()

            expect(firedBefore).toBe(true)
        })

        it('emits event after showing popup', async () => {
            let firedAfter = false

            const modal = createModalFactory().modal()

            modal.on('show', () => {
                firedAfter = modal.isVisible()
            })

            await modal.show()

            expect(firedAfter).toBe(true)
        })
    })

    describe('Hide', () => {
        it('hides popup', async () => {
            const factory = createModalFactory()

            const modal = factory.modal()

            await modal.show()

            expect(modal.isVisible()).toBe(true)

            await modal.hide()

            expect(modal.root.style.visibility).toBe('hidden')
            expect(modal.isVisible()).toBe(false)
            expect(modal.isHidden()).toBe(true)
        })

        it('returns the same promise instance while hiding process is not completed', async () => {
            const factory = createModalFactory()

            const modal = factory.modal()

            await modal.show()

            const promise1 = modal.hide()
            const promise2 = modal.hide()

            expect(promise1).toBe(promise2)
        })

        it('emits event before hiding popup', async () => {
            let firedBefore = false

            const modal = createModalFactory().modal()

            modal.on('hide:before', () => {
                firedBefore = modal.isVisible()
            })

            await modal.show()

            await modal.hide()

            expect(firedBefore).toBe(true)
        })

        it('emits event after hiding popup', async () => {
            let firedAfter = false

            const modal = createModalFactory().modal()

            modal.on('hide', () => {
                firedAfter = modal.isHidden()
            })

            await modal.show()

            await modal.hide()

            expect(firedAfter).toBe(true)
        })
    })

    describe('Destroy', () => {
        it('emits event', async () => {
            let fired = false

            const modal = createModalFactory().modal()

            modal.on('destroy', () => {
                fired = true
            })

            await modal.destroy()

            expect(fired).toBe(true)
        })

        it('returns the same promise instance', async () => {
            const factory = createModalFactory()

            const modal = factory.modal()

            const promise1 = modal.destroy()
            const promise2 = modal.destroy()

            expect(promise1).toBe(promise2)
        })
    })
})
