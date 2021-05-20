import plugin from '../../src/plugins/animate.js'
import { createModalFactory } from '../../src/modal.js'

describe('Plugin "animate"', () => {
    let createModal

    beforeEach(() => {
        ({ createModal } = createModalFactory([{
            key: 'animate',
            callable: plugin,
        }]))
    })

    it('allows to add specified CSS classes to animate element after modal has been showed', async () => {
        const modal = createModal({
            animate: {
                'button': {
                    show: 'animate__animated animate__bounceInRight',
                }
            }
        })

        modal.content.innerHTML = `
            <button class="btn">Click me!</button>
        `

        const button = modal.content.querySelector('.btn')

        let animationClass = ''
        modal.on('show', () => {
            animationClass = button.className
        })

        await modal.show()

        expect(animationClass).toBe('btn animate__animated animate__bounceInRight')
        expect(button.className).toBe('btn')
    })

    it('allows to add specified CSS classes to animate element before modal has been hidden', async () => {
        const modal = createModal({
            animate: {
                'button': {
                    hide: 'animate__animated animate__fadeOut',
                }
            }
        })

        modal.content.innerHTML = `
            <button class="btn">Click me!</button>
        `

        const button = modal.content.querySelector('.btn')

        let animationClass = ''
        modal.on('hide:before', () => {
            animationClass = button.className
        })

        await modal.show()

        await modal.hide()

        expect(animationClass).toBe('btn animate__animated animate__fadeOut')
        expect(button.className).toBe('btn')
    })
})
