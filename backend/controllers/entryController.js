const Entry = require('../models/Entry')
const mongoose = require('mongoose')

// get all entries
const getEntries = async (req, res) => {
  const entries = await Entry.find({}).sort({createdAt: -1})
  res.status(200).json(entries)
}

// get a single entry
const getEntry = async (req, res) => {
  const {id} = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such entry'})
  }
  const entry = await Entry.findById(id)

  if (!entry) {
    return res.status(404).json({error: 'No such entry'})
  }
  res.status(200).json(entry)
}

// create a new entry
const createEntry = async (req, res) => {
    const {title, body} = req.body
    let emptyFields = []
    if (!title) {
      emptyFields.push('Title')
    }
    if (!body) {
      emptyFields.push('Body')
    }
    if (emptyFields.length > 0) {
      return res.status(400).json({error: 'Following fields are empty: ', emptyFields})
    }
    try {
      const entry = await Entry.create({title, body})
      res.status(200).json(entry)
    } catch (error) {
      res.status(400).json({error: error.message})
    }
}

// delete an entry
const deleteEntry = async (req, res) => {
  const {id} = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such entry'})
  }
  try {
    const entry = await Entry.findByIdAndDelete(id)
    if (!entry) {
      return res.status(404).json({error: 'No such entry'})
    }
    res.status(200).json(entry)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// update an entry
const updateEntry = async (req, res) => {
  const {id} = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such entry'})
  } 
  try {
    const entry = await Entry.findOneAndUpdate({_id: id}, {
      ...req.body
    }, {new: true})
    if (!entry) {
        return res.status(404).json({error: 'No such entry'})
    }
    console.log(entry)
    res.status(200).json(entry)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}


module.exports = {
    createEntry,
    getEntries,
    getEntry,
    deleteEntry,
    updateEntry
}