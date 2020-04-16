const checkboxs = document.querySelectorAll('.listmark');
checkboxs.forEach(c => {
    c.addEventListener('click', (event) => {
        const id = event.currentTarget.dataset.id
        fetch(`/update/${id}`).catch(e => console.log(e))
    }, false)
})