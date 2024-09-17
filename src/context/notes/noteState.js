import noteContext from './noteContext';
import { useState } from "react";

const NoteState = (props) => {
  const notesInitial = [
    {
      "_id": "66daa6db860d3dw5e69a5de25fd",
      "user": "66d6ae0c7f169a3a8935b91a",
      "title": "My Title",
      "description": " Please wake up early updatedddddddddddddddddddd ",
      "tag": "personal updatedsdsd",
      "date": "2024-09-06T06:53:15.159Z",
      "__v": 0
    },
    {
      "_id": "66daa6db860dfe52e69a5de25fd",
      "user": "66d6ae0c7f169a3a8935b91a",
      "title": "My Title",
      "description": " Please wake up early updatedddddddddddddddddddd ",
      "tag": "personal updatedsdsd",
      "date": "2024-09-06T06:53:15.159Z",
      "__v": 0
    }, {
      "_id": "66daa6dgeb860d5e569a5de25fd",
      "user": "66d6ae0c7f169a3a8935b91a",
      "title": "My Title",
      "description": " Please wake up early updatedddddddddddddddddddd ",
      "tag": "personal updatedsdsd",
      "date": "2024-09-06T06:53:15.159Z",
      "__v": 0
    }, {
      "_id": "66daa6db860d51e69qwqa5de25fd",
      "user": "66d6ae0c7f169a3a8935b91a",
      "title": "My Title",
      "description": " Please wake up early updatedddddddddddddddddddd ",
      "tag": "personal updatedsdsd",
      "date": "2024-09-06T06:53:15.159Z",
      "__v": 0
    }, {
      "_id": "66daa6db860drtvv5e699a5de25fd",
      "user": "66d6ae0c7f169a3a8935b91a",
      "title": "My Title",
      "description": " Please wake up early updatedddddddddddddddddddd ",
      "tag": "personal updatedsdsd",
      "date": "2024-09-06T06:53:15.159Z",
      "__v": 0
    }
  ]
  const [notes, setNotes] = useState(notesInitial);

  // add a note
  const addNote = (title, description, tag) => {
    //TODO: API call
    console.log('i am adding note');

    const note = {
      "_id": "66daa6db860d5e69fewfe9a5de25fd",
      "user": "66d6ae0c7f169a3a8935b91a",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2024-09-06T06:53:15.159Z",
      "__v": 0
    };
    setNotes(notes.concat(note))
  }
  //DELETE a note
  const deleteNote = (id) => {
    console.log('Deleting the note with ID>>>', id);
    const newNote = notes.filter((note) => {
     return note._id !== id
    })
    setNotes(newNote);

  }
  //Edit a note
  const EditNote = (id,title,description,tag) => {
      for(let index=0; index < notes.length; index++) {
        const element = notes[index];
        if(element._id === id) {
          element.title = title;
          element.description = description;
          element.tag = tag;
        }
      }
  }

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, EditNote }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;