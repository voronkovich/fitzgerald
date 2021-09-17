/**
 * @jest-environment jsdom
 */

import plugin from '../../src/plugins/content.js'
import { createModalFactory } from '../../src/modal.js'

describe('Plugin "content"', () => {
    let createModal

    beforeEach(() => {
        ({ createModal } = createModalFactory([{
            key: 'content',
            callable: plugin,
            lazy: false,
        }]))
    })

    it('allows to set modal content as HTML-string', () => {
        const modal = createModal({
            content: '<p>Lorem ipsum</p>',
        })

        expect(modal.content.innerHTML).toBe('<p>Lorem ipsum</p>')
    })

    it('allows to remove modal content', () => {
        const modal = createModal({
            content: '<p>Lorem ipsum</p>',
        })

        modal.setContent()

        expect(modal.content.innerHTML).toBe('')
    })

    it('allows to set modal content as Node instance', () => {
        document.body.innerHTML = `
            <h1>Lorem ipsum</h1>
            <div class="modal">Dolor sit amet</div>
        `

        const modal = createModal({
            content: document.querySelector('.modal'),
        })

        expect(modal.content.innerHTML).toBe('<div class="modal">Dolor sit amet</div>')
    })

    it('allows to set modal content as HTMLTemplate instance', () => {
        document.body.innerHTML = `
            <h1>Lorem ipsum</h1>
            <template class="modal">Dolor sit amet</template>
        `

        const modal = createModal({
            content: document.querySelector('.modal'),
        })

        expect(modal.content.innerHTML).toBe('Dolor sit amet')
    })
})
