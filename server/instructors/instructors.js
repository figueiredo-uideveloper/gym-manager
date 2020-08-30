const fs = require('fs')
const data = require('../../db/data.json')
const { age, phone, isObject } = require('../utils/main')

// index
exports.index = function (req, res) {
    res.render('instructors/index', {instructors: data.instructors})
}

// show
exports.view = function (req, res) {
    const { id } = req.params
    const foundInstructor = data.instructors.find(instructor => instructor.id == id)

    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        phone: phone(foundInstructor.phone),
        routine: foundInstructor.routine,
        shift: foundInstructor.shift,
        modalities: foundInstructor.modalities,
    }

    if (!foundInstructor) return res.send("Instructor not found!")

    res.render('instructors/view', { instructor })
}

// create
exports.post = function (req, res) {
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
        routine: isObject(routine) ? routine : [routine],
        shift: isObject(shift) ? shift : [shift],
        modalities: isObject(modalities) ? modalities : [modalities]
    })

    fs.writeFile('db/data.json', JSON.stringify(data, null, 4), function(err) {

        if(err) throw err;

        return res.redirect('/instructors')
    })

}

// edit
exports.edit = function (req, res) {
    const { id } = req.params
    const foundInstructor = data.instructors.find(instructor => instructor.id == id)

    const instructor = {
        ...foundInstructor
    }

    if (!foundInstructor) return res.send("Instructor not found!")

    res.render('instructors/edit', { instructor })
}

// update
exports.put = function (req, res) {
    const { id } = req.body
    let index = 0

    const foundInstructor = data.instructors.find(function (instructor, foundIndex) {
        if (id == instructor.id) {
            index = foundIndex
            return true
        }   
    })
    
    if (!foundInstructor) return res.send("Instructor not found!")

    const instructor = {
        ...foundInstructor,
        ...req.body,
        id: Number(id),
        routine: isObject(req.body.routine) ? req.body.routine : [req.body.routine],
        shift: isObject(req.body.shift) ? req.body.shift : [req.body.shift],
        modalities: isObject(req.body.modalities) ? req.body.modalities : [req.body.modalities]
    }

    data.instructors[index] = instructor

    fs.writeFile('db/data.json', JSON.stringify(data, null, 4), function(err) {
        if(err) throw err

        return res.redirect(`/instructor/${id}/view`)
    })
}