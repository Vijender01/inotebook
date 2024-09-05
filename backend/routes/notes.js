const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

//ROUTE:1 Get all notes using: GET "/api/notes/fetchallnotes"
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal ServerError");
    }
})

//ROUTE:2 Add new note using: POST "/api/notes/addnote"
router.get('/addnote', fetchuser, [
    body('title', 'Enter a valid note title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    try {

        const { title, description, tag } = req.body;

        const newNote = new Notes({
            user: req.user.id,
            title,
            description,
            tag
        })
        const savedNote = await newNote.save();
        res.json(savedNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal ServerError");
    }
})

module.exports = router;