import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const About = () => {
    const a = useContext(noteContext)
    return (
        <div>
            I am in about {a.name} and he is in class {a.class}
        </div>
    )
}

export default About