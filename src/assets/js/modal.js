let deleteButtons = Array.from(document.querySelectorAll('[delete-button]'));
let modalCancelButton = document.querySelector('[modal-cancel-button]');

modalCancelButton.addEventListener("click", function(event){
    event.preventDefault();

    toggleModal();
});

for (deleteButton of deleteButtons) {
    deleteButton.addEventListener("click", function(event){
        event.preventDefault();

        toggleModal();
    });
}

function toggleModal() {
    let modalWrapper = document.querySelector('.modal-wrapper');
    modalWrapper.classList.toggle("show");
}