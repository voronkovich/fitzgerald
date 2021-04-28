export default (modal, options) => {
    if (false === options) {
        return
    }

    fetch(options)
        .then(response => response.text())
        .then(result => {
            modal.content.innerHTML = result
        })
}
