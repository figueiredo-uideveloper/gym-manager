module.exports = {
    age: function(timestamp) {
        const today = new Date()
        const birthDay = new Date(timestamp)

        let age = today.getUTCFullYear() - birthDay.getUTCFullYear()
        const month = today.getUTCMonth() - birthDay.getUTCMonth()

        if (month < 0 || month == 0 && today.getUTCDate() < birthDay.getUTCDate()) {
            age = age - 1
        }

        return age
    },
    phone: function(phoneNumber){
        const DDD = phoneNumber.slice(0, 2)
        const firstPart = phoneNumber.slice(2, 7)
        const lastPart = phoneNumber.slice(7, 11)

        const maskedPhone = `(${DDD}) ${firstPart}-${lastPart}`

        return maskedPhone
    }
}