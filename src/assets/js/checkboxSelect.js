const checkboxInputs = document.querySelectorAll('.form__checkbox--item')

const toggleChecked = function (input) {
    input.classList.toggle('checked')
}

checkboxInputs.forEach((input) => {
    input.addEventListener('mouseup', function () {
        toggleChecked(input)
    })
})