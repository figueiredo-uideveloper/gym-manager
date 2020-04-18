let deleteButtons = Array.from(document.querySelectorAll('[delete-button]'));
let modalCancelButton = document.querySelector('[modal-cancel-button]');

modalCancelButton.addEventListener("click", toggleModal);

for (deleteButton of deleteButtons) {
    deleteButton.addEventListener("click", toggleModal);
}

function toggleModal() {
    let modalWrapper = document.querySelector('.modal-wrapper');
    modalWrapper.classList.toggle("show");
}