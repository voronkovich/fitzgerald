export default (modal, content) => {
    if (false === content) {
        return
    }

    modal.setContent = (content) => {
        setElementContent(modal.content, content)

        return modal
    }

    if (content) {
        modal.setContent(content)
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
