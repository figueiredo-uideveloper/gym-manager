const radioInputs = document.querySelectorAll('.form__radio--item')
let containsChecked = false;

radioInputs.forEach((input) => {
    if (input.querySelector('input').checked) {
        containsChecked = true
    }
})

const removeChecked = function () {
    radioInputs.forEach((input) => {
        input.classList.remove('checked');
    })
}

const applyChecked = function (input) {
    input.classList.add('checked');
}

radioInputs.forEach((input)=>{
    if (!containsChecked && input.dataset.gender == 'male') {
        input.querySelector('input').checked = true
        applyChecked(input)
    }

    input.addEventListener('click', function() {
        removeChecked()
        applyChecked(input)
    })
})
