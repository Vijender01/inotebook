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
});

//ROUTE:3 Update existing note using: PUT "/api/notes/editnote/:id"

router.put('/editnote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        const newNote = {};

        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        let note = await Notes.findById(req.params.id);

        if (!note) return res.status(404).json({ message: "Note not found" });

        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });

        res.json(note);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//ROUTE:4 to deleted the note using..: PUT "/api/notes/deletenote/:id" 
router.put('/deletenote/:id', fetchuser, async (req, res) => {
    try {


        let note = await Notes.findById(req.params.id);

        if (!note) return res.status(404).json({ message: "Note not found" });

        //allow deleting only user owns it.
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        note = await Notes.findByIdAndDelete(req.params.id);

        res.json("Note Dleted");

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;