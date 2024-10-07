import React from 'react'

const Login = () => {
    const handelSubmit = async (e) => {
        e.preventDefault();
        const { password } = e.target;
        console.log(password.value);

        const response = await fetch("http://localhost:5000/api/auth/login",{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZkNmFlMGM3ZjE2OWEzYTg5MzViOTFhIiwibmFtZSI6ImdhNzNyNTdnIiwiZW1haWwiOiJnYXI3NDY1ZEBnbWFpbC5jb20ifSwiaWF0IjoxNzI2NjM1NDMxfQ.eYXJNHiUgRQ3Kf6pAQkVhtpgPILnvhyQWcOxI75Ot-I'
            },
            body:json.stringify({email,password})
        })
        const json= await response.json();
        console.log(json);
        
    }
    return (
        <div>
            <form onSubmit={handelSubmit}>
                <div className="form-group">
                    <label for="email">Email address</label>
                    <input type="email" class="form-control" id="email" name='password' aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" className="form-control" name='password' id="password" placeholder="Password" />
                </div>
                <div class="form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label class="form-check-label" for="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login