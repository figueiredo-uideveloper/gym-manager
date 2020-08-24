const editButtons = Array.from(document.querySelectorAll('[edit-button]'));

for (editButton of editButtons) {
    editButton.addEventListener("click", function (event) {
        event.preventDefault();

        id = this.closest('[instructor-id]').id

        window.location.href = `/instructor/${id}/edit`
    });
}