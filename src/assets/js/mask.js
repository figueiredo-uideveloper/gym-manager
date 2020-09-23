var dateMask = IMask(document.getElementById('date'), {
    mask: Date,
    pattern: 'd-m-Y',
    blocks: {
        d: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 31,
            maxLength: 2,
        },
        m: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12,
            maxLength: 2,
        },
        Y: {
            mask: IMask.MaskedRange,
            from: 1900,
            to: 9999,
        }
    },

    format: function (date) {
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        if (day < 10) day = "0" + day;
        if (month < 10) month = "0" + month;

        return [day, month, year].join('-');
    },
    
    parse: function (str) {
        var yearMonthDay = str.split('-');
        return new Date(yearMonthDay[2], yearMonthDay[1] - 1, yearMonthDay[0]);
    },
    lazy: true
});

const masks = {
    phone (value) {
        return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
        .replace(/(-\d{4})\d+?$/, '$1')
    },
    height (value) {
        return value
        .replace(/\D/g, '')
        .replace(/(\d)(\d{2})/, '$1.$2')
        .replace(/(.\d{2})\d+?$/, '$1')
    },
    weight (value) {
        return value
        .replace(/\D/g, '')
        .replace(/(\d)(\d{2})/, '$1.$2')
        .replace(/(.\d{2})\d+?$/, '$1')
    }
}

document.querySelectorAll('.input-masked').forEach(($input) => {
    const field = $input.dataset.mask

    $input.addEventListener('input',(e) => {
        e.target.value = masks[field](e.target.value)
    },false)
})

