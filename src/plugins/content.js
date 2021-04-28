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

const setElementContent = (element, content) => {
    if ('undefined' === typeof content) {
        return
    }

    if ('string' === typeof content) {
        element.innerHTML = content

        return
    }

    if (null === content) {
        replaceChildren(element)

        return
    }

    if (content.content instanceof DocumentFragment) {
        replaceChildren(element, content.content.cloneNode(true))

        return
    }

    replaceChildren(element, content)
}

const replaceChildren = (node, ...childs) => {
    node.childNodes.forEach(child => node.removeChild(child))

    childs.forEach(child => node.appendChild(child))
}
