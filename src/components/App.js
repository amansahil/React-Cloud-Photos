import React, { Component } from 'react';
import * as firebase from 'firebase';

import Login from './Login.js'
import Home from './Home.js';
import './styles/login.css';

class App extends Component {
    
    constructor(props) {
        super();
        
        this.state = {
            error: '',
            user: '',
            email: '',
            password: ''
        }
        
        this.login = this.login.bind(this);
        this.email = this.email.bind(this);
        this.password = this.password.bind(this);
    };
    
    email(e){
       this.setState({email: e.target.value}); 
    }
    
    password(e){
        this.setState({password: e.target.value});
    }
    
    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            this.setState({
                user
            })
        });
    }
    
    login() {
        
        const { email, password } = this.state;
	    firebase.auth().createUserWithEmailAndPassword(email, password).then(function (user){
	        this.setState({ user })
	    })
		.catch((err) => {
			firebase.auth().signInWithEmailAndPassword(email, password)
			 .catch((err) => {
			    this.setState({ error: err.message })
			 });
		});
    }
    
    render(){
        if(!this.state.user){
           return (
               <Login 
                    emailProp={this.email}
                    passwordProp={this.password}
                    loginProp={this.login}
                    error={this.state.error}
               />

           ); 
        } else {
            return <Home />;
        }
    }   
}


export default App;