const editButtons = Array.from(document.querySelectorAll('[edit-button]'));

for (editButton of editButtons) {
    editButton.addEventListener("click", function (event) {
        event.preventDefault();

        person = this.closest('[item-person]')
        id = person.id
        type = person.type

        window.location.href = `/${type}s/${id}/edit`
    });
}