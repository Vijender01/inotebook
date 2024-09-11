import noteContext from './noteContext';
import { useState } from "react";

const NoteState = (props) => {
    const notesInitial =[
        {
          "_id": "66daa6db860d5e69a5de25fd",
          "user": "66d6ae0c7f169a3a8935b91a",
          "title": "My Title",
          "description": " Please wake up early updatedddddddddddddddddddd ",
          "tag": "personal updatedsdsd",
          "date": "2024-09-06T06:53:15.159Z",
          "__v": 0
        },
        {
            "_id": "66daa6db860d5e69a5de25fd",
            "user": "66d6ae0c7f169a3a8935b91a",
            "title": "My Title",
            "description": " Please wake up early updatedddddddddddddddddddd ",
            "tag": "personal updatedsdsd",
            "date": "2024-09-06T06:53:15.159Z",
            "__v": 0
          }, {
            "_id": "66daa6db860d5e69a5de25fd",
            "user": "66d6ae0c7f169a3a8935b91a",
            "title": "My Title",
            "description": " Please wake up early updatedddddddddddddddddddd ",
            "tag": "personal updatedsdsd",
            "date": "2024-09-06T06:53:15.159Z",
            "__v": 0
          }, {
            "_id": "66daa6db860d5e69a5de25fd",
            "user": "66d6ae0c7f169a3a8935b91a",
            "title": "My Title",
            "description": " Please wake up early updatedddddddddddddddddddd ",
            "tag": "personal updatedsdsd",
            "date": "2024-09-06T06:53:15.159Z",
            "__v": 0
          }, {
            "_id": "66daa6db860d5e69a5de25fd",
            "user": "66d6ae0c7f169a3a8935b91a",
            "title": "My Title",
            "description": " Please wake up early updatedddddddddddddddddddd ",
            "tag": "personal updatedsdsd",
            "date": "2024-09-06T06:53:15.159Z",
            "__v": 0
          }
      ]
      const [notes, setNotes] = useState(notesInitial);
    return(
        <noteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;