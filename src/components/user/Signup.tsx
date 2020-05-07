import React, { Component } from 'react';

export class Signup extends Component {
    constructor(){
        super()
        this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
            open: false
        }
    }
    
    handleChange = (name: any) => (event: { target: { value: any; }; }) => {
        this.setState({error:""})
        this.setState({[name]: event.target.value});
    }

    clickSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const {name, email, password} = this.state;
        const user = {
            name,
            email,
            password
        };
        // console.log(user);
        this.signup(user)
        .then(data =>{
            if(data.error) this.setState({error: data.error})
                else this.setState({
                    error: "",
                    name: "",
                    email: "",
                    password: "",
                    open: true 
            })
        })
    }

    signup = (user: any) => {
        return fetch("http://localhost:8080/signup", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            return response.json()
        })
        .catch (err => console.log(err))
    }

    signUpForm = (name: string | number | string[] | undefined, email: string | number | string[] | undefined, password: string | number | string[] | undefined) => (
        <form>
                    <div className="form-group">
                        <label className="text-muted">Name</label>
                        <input 
                            onChange={this.handleChange("name")} 
                            type="text" 
                            className="form-control"
                            value = {name}
                        />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input 
                            onChange={this.handleChange("email")} 
                            type="email" 
                            className="form-control"
                            value = {email}
                        />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input 
                        onChange={this.handleChange("password")} 
                        type="password" 
                        className="form-control"
                        value = {password}
                    />
                    </div>
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
                        Submit
                    </button>
                </form>
    )

    render() {
        const {name, email, password, error, open} = this.state
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Signup</h2>
                <div 
                    className = "alert alert-danger"
                    style = {{display: error? "" : "none"}}>
                    {error}
                </div>

                <div 
                    className = "alert alert-info"
                    style = {{display: open? "" : "none"}}>
                    New account is successfully created. Please sign in.
                </div>

                {this.signUpForm(name, email, password)}
            </div>
        );
    }
}

