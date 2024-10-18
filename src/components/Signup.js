import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({name:"",email: "",password: "",cpassword:''})
  let navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name,email,password} = credentials;
    
    const response = await fetch("http://localhost:5000/api/auth/createuser",{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
            },
        body:JSON.stringify({name,email,password})
    })
    const json= await response.json();
    if(json.success){
      localStorage.setItem('token',json.authtoken);
      props.showAlert('Successfully created',"success")
      navigate("/");
    }else{
      props.showAlert('Error creating user','danger')
    }
    console.log(json);
    
}

const onChange = (e) =>{
  console.log(credentials, e.target.name, e.target.value);;;
  
  setCredentials({...credentials,[e.target.name]: e.target.value})
}
  return (
    <form onSubmit={handleSubmit}>
       <div className="mb-3">
        <label htmlFor="name" className="form-label">name</label>
        <input type="text" name='name' className="form-control" onChange={onChange} id="exampleInputPassword1" />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
        <input type="email" name='email' className="form-control" id="email" onChange={onChange} aria-describedby="emailHelp" />
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" onChange={onChange} className="form-control" name='password' minLength={6} id="exampleInputPassword1" />
      </div>
      <div className="mb-3">
        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
        <input type="password" onChange={onChange} className="form-control" minLength={6} id="cpassword" />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}

export default Signup