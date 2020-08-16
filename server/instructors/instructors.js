const fs = require('fs')
const data = require('../../db/data.json')
const { age, phone, convertToArray, separatorDashString } = require('../utils/main')

// show
exports.view = function (req, res) {
    const { id } = req.params
    const foundInstructor = data.instructors.find(instructor => instructor.id == id)

    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        phone: phone(foundInstructor.phone),
        routine: separatorDashString(foundInstructor.routine),
        shift: separatorDashString(foundInstructor.shift),
        modalities: convertToArray(foundInstructor.modalities),
    }

    if (!foundInstructor) return res.send("Instructor not found!")

    res.render('instructors/view', { instructor })
}

// create
exports.post = function(req, res) {
    let { 
        fullName,
        email,
        phone,
        birth,
        gender,
        height,
        weight,
        routine,
        shift,
        modalities } = req.body

    const id = Number(data.instructors.length + 1)

    data.instructors.push({
        id,
        fullName,
        email,
        phone,
        birth,
        gender,
        height,
        weight,
        routine,
        shift,
        modalities
    })

    fs.writeFile('db/data.json', JSON.stringify(data, null, 4), function(err) {

        if(err) throw err;

        return res.send(data)
    })

}

// edit
exports.edit = function (req, res) {
    const { id } = req.params
    const foundInstructor = data.instructors.find(instructor => instructor.id == id)

    const instructor = {
        ...foundInstructor,
    }

    if (!foundInstructor) return res.send("Instructor not found!")

    res.render('instructors/edit', { instructor })
}