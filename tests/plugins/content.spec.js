import plugin from '../../src/plugins/content.js'
import { createModalFactory } from '../../src/modal.js'

describe('Plugin "content"', () => {
    let modal

    beforeEach(() => {
        ({ modal } = createModalFactory([{
            key: 'content',
            callable: plugin,
            lazy: false,
        }]))
    })

    it('allows to set modal content as HTML-string', () => {
        const popup = modal({
            content: '<p>Lorem ipsum</p>',
        })

        expect(popup.content.innerHTML).toBe('<p>Lorem ipsum</p>')
    })

    it('allows to remove modal content', () => {
        const popup = modal({
            content: '<p>Lorem ipsum</p>',
        })

        popup.setContent()

        expect(popup.content.innerHTML).toBe('')
    })

    it('allows to set modal content as Node instance', () => {
        document.body.innerHTML = `
            <h1>Lorem ipsum</h1>
            <div class="modal">Dolor sit amet</div>
        `

        const popup = modal({
            content: document.querySelector('.modal'),
        })

        expect(popup.content.innerHTML).toBe('<div class="modal">Dolor sit amet</div>')
    })

    it('allows to set modal content as HTMLTemplate instance', () => {
        document.body.innerHTML = `
            <h1>Lorem ipsum</h1>
            <template class="modal">Dolor sit amet</template>
        `

        const popup = modal({
            content: document.querySelector('.modal'),
        })

        expect(popup.content.innerHTML).toBe('Dolor sit amet')
    })
})
