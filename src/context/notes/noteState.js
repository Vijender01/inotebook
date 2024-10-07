import noteContext from './noteContext';
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  
    // get all note
    const getAllNote = async () => {
      //TODO: API call
      let response =await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZkNmFlMGM3ZjE2OWEzYTg5MzViOTFhIiwibmFtZSI6ImdhNzNyNTdnIiwiZW1haWwiOiJnYXI3NDY1ZEBnbWFpbC5jb20ifSwiaWF0IjoxNzI2NjM1NDMxfQ.eYXJNHiUgRQ3Kf6pAQkVhtpgPILnvhyQWcOxI75Ot-I'
        },
      });
      const json = await response.json();
      console.log(json);
      setNotes(json);
      
      console.log('i am in gett all notes');
    }

  // add a note
  const addNote = async (title, description, tag) => {
    //TODO: API call
    let response =await fetch(`${host}/api/notes/addnote/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZkNmFlMGM3ZjE2OWEzYTg5MzViOTFhIiwibmFtZSI6ImdhNzNyNTdnIiwiZW1haWwiOiJnYXI3NDY1ZEBnbWFpbC5jb20ifSwiaWF0IjoxNzI1NjA0Nzk0fQ.5HxDqsJLH25ry8seIv2r8ldSUsTkZV2wNVqwHLi4-b8'
      },
      body: JSON.stringify({title, description, tag}),
    });

    const json = await response.json();
      console.log(json);

    const note = {
      "_id": json._id,
      "user": json.user,
      "title": title,
      "description": description,
      "tag": tag,
      "date": json.date,
      "__v": 0
    };
    setNotes(notes.concat(note))
  }
  //DELETE a note
  const deleteNote = async (id) => {

    let response =await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZkNmFlMGM3ZjE2OWEzYTg5MzViOTFhIiwibmFtZSI6ImdhNzNyNTdnIiwiZW1haWwiOiJnYXI3NDY1ZEBnbWFpbC5jb20ifSwiaWF0IjoxNzI2NjM1NDMxfQ.eYXJNHiUgRQ3Kf6pAQkVhtpgPILnvhyQWcOxI75Ot-I'
      },
    });
    const json = response.json();
    console.log('deleteNote',json);
    

    console.log('Deleting the note with ID>>>', id);
    const newNote = notes.filter((note) => {
      return note._id !== id
    })
    setNotes(newNote);

  }
  //Edit a note
  const EditNote =async (id, title, description, tag) => {

    let response =await fetch(`${host}/api/notes/editnote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZkNmFlMGM3ZjE2OWEzYTg5MzViOTFhIiwibmFtZSI6ImdhNzNyNTdnIiwiZW1haWwiOiJnYXI3NDY1ZEBnbWFpbC5jb20ifSwiaWF0IjoxNzI2NjM1NDMxfQ.eYXJNHiUgRQ3Kf6pAQkVhtpgPILnvhyQWcOxI75Ot-I'
      },
      body: JSON.stringify(id,title,description,tag),
    });
    // eslint-disable-next-line
    const json = response.json();

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  }

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, EditNote, getAllNote }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;