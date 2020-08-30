const deleteButtons = Array.from(document.querySelectorAll('[delete-button]'))
const modalCancelButton = document.querySelector('[modal-cancel-button]')
const modalWrapper = document.querySelector('.modal-wrapper')
const inputDeleteID = document.querySelector('#inputDeleteID')

modalCancelButton.addEventListener("click", function(event){
    event.preventDefault()

    inputDeleteID.value = ''
    toggleModal()
});

for (deleteButton of deleteButtons) {
    deleteButton.addEventListener("click", function(event){
        event.preventDefault()

        id = this.closest('[instructor-id]').id

        inputDeleteID.value = id

        toggleModal()
    });
}

function toggleModal() {
    modalWrapper.classList.toggle("show")
}