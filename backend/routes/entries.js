const express = require('express')
const {
    createEntry,
    getEntries,
    getEntry,
    deleteEntry,
    updateEntry
} = require('../controllers/entryController')
const { create } = require('../models/Entry')

const router = express.Router()

//GET all entries
router.get('/', getEntries)

//GET a single entry
router.get('/:id', getEntry)

//POST a new entry
router.post('/', createEntry)

//DELETE an entry
router.delete('/:id', deleteEntry)

//UPDATE an entry
router.patch('/:id', updateEntry)

module.exports = router