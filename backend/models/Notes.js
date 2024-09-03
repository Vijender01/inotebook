import mongoose from 'mongoose';
const { Schema } = mongoose;

const NotesSchema = new Schema({
    title: {
        name: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        degault: "General",
    },
    date: {
        type: Date,
        default: Date.now,
    },

});

module.exports = mongoose.model('notes',NotesSchema)