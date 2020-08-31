const fs = require('fs')
const data = require('../db/data.json')
const { age, phone, isObject } = require('./utils/main')

exports.index = function (req, res) {
    res.render('members/index', {members: data.members})
}

exports.view = function (req, res) {
    const { id } = req.params
    const foundmember = data.members.find(member => member.id == id)

    const member = {
        ...foundmember,
        age: age(foundmember.birth),
        phone: phone(foundmember.phone),
        routine: foundmember.routine,
        shift: foundmember.shift,
        modalities: foundmember.modalities,
    }

    if (!foundmember) return res.send("member not found!")

    res.render('members/view', { member })
}

exports.create = function (req, res) {
    res.render('members/create')
}

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

    const id = Number(data.members.length + 1)

    data.members.push({
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

        return res.redirect('/members')
    })

}

exports.edit = function (req, res) {
    const { id } = req.params
    const foundmember = data.members.find(member => member.id == id)

    const member = {
        ...foundmember
    }

    if (!foundmember) return res.send("member not found!")

    res.render('members/edit', { member })
}

exports.put = function (req, res) {
    const { id } = req.body
    let index = 0

    const foundmember = data.members.find(function (member, foundIndex) {
        if (id == member.id) {
            index = foundIndex
            return true
        }   
    })
    
    if (!foundmember) return res.send("member not found!")

    const member = {
        ...foundmember,
        ...req.body,
        id: Number(id),
        routine: isObject(req.body.routine) ? req.body.routine : [req.body.routine],
        shift: isObject(req.body.shift) ? req.body.shift : [req.body.shift],
        modalities: isObject(req.body.modalities) ? req.body.modalities : [req.body.modalities]
    }

    data.members[index] = member

    fs.writeFile('db/data.json', JSON.stringify(data, null, 4), function(err) {
        if(err) throw err

        return res.redirect(`/members/${id}/view`)
    })
}

exports.delete = function (req, res) {
    const { id } = req.body

    const filteredmembers = data.members.filter(function (member) {
        return member.id != id
    })

    data.members = filteredmembers

    fs.writeFile('db/data.json', JSON.stringify(data, null, 4), function(err) {
        if (err) throw err

        return res.redirect('/members')
    })

}