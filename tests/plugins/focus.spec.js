/**
 * @jest-environment jsdom
 */

import plugin from '../../src/plugins/focus.js'
import { createModalFactory } from '../../src/modal.js'

describe('Plugin "focus"', () => {
    let createModal

    beforeEach(() => {
        ({ createModal } = createModalFactory([{
            key: 'focus',
            callable: plugin,
            lazy: false,
        }]))

        document.body.innerHTML = ''
    })

    it('sets focus to modal content by default', async () => {
        const modal = createModal()

        modal.content.innerHTML = `
            <p>
                <a href="https://github.com/voronkovich/fitzgerald">
                    Fitzgerald
                </a>
            <p>
        `

        document.body.appendChild(modal.root)

        await modal.show()

        expect(document.activeElement).toBe(modal.content)
    })

    describe('allows to set focus to desired element', () => {

        it('by providing selector', async () => {
            const modal = createModal({
                focus: 'input[type="email"]',
            })

            modal.content.innerHTML = `
                <h2>Subscribe</h2>
                <form>
                    <label>
                        Full name: <input type="text" name="name" />
                    </label>
                    <label>
                        Email: <input type="email" name="email" />
                    </label>
                    <button>Subscribe</button>
                </form>
            `

            document.body.appendChild(modal.root)

            await modal.show()

            const emailInput = modal.content.querySelector('input[type="email"]')

            expect(document.activeElement).toBe(emailInput)
        })

        it('by adding attribute data-fitz-focus', async () => {
            const modal = createModal()

            modal.content.innerHTML = `
                <h2>Subscribe</h2>
                <form>
                    <label>
                        Full name: <input type="text" name="name" data-fitz-focus />
                    </label>
                    <label>
                        Email: <input type="email" name="email" />
                    </label>
                    <button>Subscribe</button>
                </form>
            `

            document.body.appendChild(modal.root)

            await modal.show()

            const fullNameInput = modal.content.querySelector('input[type="text"]')

            expect(document.activeElement).toBe(fullNameInput)
        })

        it('by calling setFocus() method', async () => {
            const modal = createModal()

            modal.content.innerHTML = `
                <h2>Subscribe</h2>
                <form>
                    <label>
                        Full name: <input type="text" name="name" />
                    </label>
                    <label>
                        Email: <input type="email" name="email" />
                    </label>
                    <button type="submit">Subscribe</button>
                </form>
            `

            document.body.appendChild(modal.root)

            await modal.show()

            const submit = modal.content.querySelector('[type="submit"]')

            expect(document.activeElement).not.toBe(submit)

            modal.setFocus('[type="submit"]')

            expect(document.activeElement).toBe(submit)
        })
    })

    it('restores previous active element after modal has been hidden', async () => {
        const modal = createModal()

        document.body.innerHTML = `
            <button>Click Me!</button>
        `

        const button = document.querySelector('button')
        button.focus()

        modal.content.innerHTML = `
            <a href="https://github.com/voronkovich/fitzgerald" data-fitz-focus>
                Fitzgerald
            </a>
        `

        document.body.appendChild(modal.root)

        await modal.show()

        expect(document.activeElement).not.toBe(button)

        await modal.hide()

        expect(document.activeElement).toBe(button)
    })

    describe('creates focus trap', () => {

        it('prevents loosing focus when modal has no tabbables', async () => {
            const modal = createModal()

            modal.content.innerHTML = `<p>Lorem ipsum</p>`

            document.body.appendChild(modal.root)

            await modal.show()

            modal.content.dispatchEvent(new KeyboardEvent('keydown', {
                bubbles: true,
                key: 'Tab',
            }))

            expect(document.activeElement).toBe(modal.content)
        })

        it('allows to move focus inside modal', async () => {
            const modal = createModal()

            modal.content.innerHTML = `
                <h2>Cool modal plugins</h2>
                <ul>
                    <li>
                        <a href="https://github.com/voronkovich/fitzgerald">
                            Fitzgerald
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/ghosh/Micromodal" data-fitz-focus>
                            Micromodal
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/KittyGiraudel/a11y-dialog">
                            A11y Dialog
                        </a>
                    </li>
                </ul>
            `

            document.body.appendChild(modal.root)

            await modal.show()

            const event = new KeyboardEvent('keydown', {
                bubbles: true,
                key: 'Tab',
            })

            modal.content.dispatchEvent(event)

            // Firing <Tab> event on window does not change the document.activeElement
            // https://github.com/jsdom/jsdom/issues/2102
            // We just check that browser will do the default action
            expect(event.defaultPrevented).toBe(false)
        })

        it('focuses on first tabbable element when <Tab> pressed on last one', async () => {
            const modal = createModal()

            modal.content.innerHTML = `
                <h2>Cool modal plugins</h2>
                <ul>
                    <li>
                        <a href="https://github.com/voronkovich/fitzgerald">
                            Fitzgerald
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/ghosh/Micromodal">
                            Micromodal
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/KittyGiraudel/a11y-dialog" data-fitz-focus>
                            A11y Dialog
                        </a>
                    </li>
                </ul>
            `

            document.body.appendChild(modal.root)

            await modal.show()

            const firstLink = modal.content.querySelector('a')

            modal.content.dispatchEvent(new KeyboardEvent('keydown', {
                bubbles: true,
                key: 'Tab',
            }))

            expect(document.activeElement).toBe(firstLink)
        })

        it('focuses on last tabbable element when <Shift-Tab> pressed on first one', async () => {
            const modal = createModal()

            modal.content.innerHTML = `
                <h2>Cool modal plugins</h2>
                <ul>
                    <li>
                        <a href="https://github.com/voronkovich/fitzgerald" data-fitz-focus>
                            Fitzgerald
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/ghosh/Micromodal">
                            Micromodal
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/KittyGiraudel/a11y-dialog">
                            A11y Dialog
                        </a>
                    </li>
                </ul>
            `

            document.body.appendChild(modal.root)

            await modal.show()

            const links = modal.content.querySelectorAll('a')
            const lastLink = links[links.length - 1]

            modal.content.dispatchEvent(new KeyboardEvent('keydown', {
                bubbles: true,
                key: 'Tab',
                shiftKey: true,
            }))

            expect(document.activeElement).toBe(lastLink)
        })
    })
})
