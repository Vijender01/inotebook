import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

function AddNote(props) {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note,setNote] = useState({title:"", description:"",tag:"Vijender"})

    const handleClick = (e) => {
        e.preventDefault();
        console.log(note.title,note.description,note.tag);
        
        addNote(note.title,note.description,note.tag);
        setNote({title:"", description:"", tag:""});
        props.showAlert("Updated successfully", "success");
    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]: e.target.value});
    }

    return (
        <div className="container my-3">
            <h1>Add a Note</h1>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' onChange={onChange} />
                </div>
                <div className='mb-3'>
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>
        </div>
    )
}

export default AddNote