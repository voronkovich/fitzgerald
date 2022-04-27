export default (modal, options) => {
    if (false === options) {
        return
    }

    if (typeof options === 'string' || options instanceof Node || options instanceof NodeList) {
        options = {
            content: options,
        }
    }

    const opts = Object.assign({
        content: null,
        contentSelector: '[data-fitz-content]',
    }, options)

    modal.setContent = (content) => {
        let contentElement = modal.content.querySelector(opts.contentSelector)

        if (!contentElement) {
            contentElement = modal.content
        }

        setElementContent(contentElement, content)

        return modal
    }

    if (opts.content) {
        modal.setContent(opts.content)
    }
}

/**
 * Sets an element's content.
 *
 * @param {Element} element
 * @param {string|HTMLTemplateElement|NodeList|Node|null} [content]
 */
export const setElementContent = (element, content) => {
    if ( 'undefined' === typeof content || null === content) {
        replaceChildren(element)

        return
    }

    if ('string' === typeof content) {
        element.innerHTML = content

        return
    }

    if (content.content instanceof DocumentFragment) {
        replaceChildren(element, content.content.cloneNode(true))

        return
    }

    if (content instanceof NodeList) {
        replaceChildren(element, ...content)

        return
    }

    replaceChildren(element, content)
}

const replaceChildren = (node, ...childs) => {
    while (node.firstChild) {
        node.removeChild(node.firstChild)
    }

    childs.forEach(child => node.appendChild(child))
}
