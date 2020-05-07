import React, {Component} from "react";
import { Redirect } from "react-router-dom";

export class Signin extends Component {
    constructor(props: Readonly<{}>){
        super(props)
        this.state = {
            email: "",
            password: "",
            error: "",
            redirectToRenderer: false,
            loading: false
        }
    }

    handleChange = (formField: any) => (event: { target: { value: any; }; }) => {
        this.setState({error:""})
        this.setState({[formField]: event.target.value});
    }

    authenticate (jwt: any, next: { (): void; (): void; }) {
        if(typeof window !== "undefined") {
            localStorage.setItem("jwt", JSON.stringify(jwt))
            next()
        }
    }

    clickSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        this.setState({loading:true});
        const {email, password} = this.state;
        const user = {
            email,
            password
        };
        // console.log(user);
        this.signIn(user)
        .then(data =>{
            if(data.error) this.setState({error: data.error, loading:false})
                else {
                    this.authenticate(data, () => {
                        this.setState({redirectToRenderer: true})
                    })
                }
        });
    }

    signIn = (user: any) => {
        return fetch("http://localhost:8080/signIn", {
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

    signInForm = (email: string | number | string[] | undefined, password: string | number | string[] | undefined) => (
        <form>
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
        const {email, password, error, redirectToRenderer, loading} = this.state

        if(redirectToRenderer) {
            return <Redirect to="/" />
        }

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">SignIn</h2>
                <div 
                    className = "alert alert-danger"
                    style = {{display: error? "" : "none"}}>
                    {error}
                </div>

                {loading ? (<div className = "jumbotron text-center">
                <h2>Loading...</h2>
                </div>) : ("")}

                {this.signInForm(email, password)}
            </div>
        );
    }
}