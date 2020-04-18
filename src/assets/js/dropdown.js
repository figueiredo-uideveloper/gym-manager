const buttons = Array.from(document.querySelectorAll('.dropdown-button'));

for (button of buttons) {
    let buttonPopper = button;
    toggleDataShow(buttonPopper);
}

function toggleDataShow(button) {
    button.addEventListener("click", function () {
        let dropdownContent = this.nextElementSibling;

        if (dropdownContent.classList.contains('data-show')) {
            dropdownContent.classList.remove("data-show");
        } else {
            let dropdowns = document.getElementsByClassName("dropdown");

            for (dropdown of dropdowns) {
                if (dropdown.classList.contains('data-show')) {
                    dropdown.classList.remove('data-show');
                }
            }
            dropdownContent.classList.add("data-show");
        }
    });
}


window.onclick = function (event) {
    if (!event.target.matches('.dropdown-button')) {
        let dropdowns = document.getElementsByClassName("dropdown");

        for (dropdown of dropdowns) {
            if (dropdown.classList.contains('data-show')) {
                dropdown.classList.remove('data-show');
            }
        }
    }
}