import React, { Component } from 'react';

class Login extends Component {
    render(){
        return (
            <div>
            	<nav className="navbar navbar-inverse navbar-fixed-top">
	             <a className="navbar-brand">React Cloud</a>
	            </nav>
            	<div className="container">
					<div className="row">
						<h1 className="content">Revolutionary Photo App</h1>
						<p className="error">{this.props.error}</p>
						<div className="form-cont">
							<div id="form">
								<div className="form-group">
									<label htmlFor="emailID">Email address</label>
									<input type="text" className="form-control" id="emailID" onChange={this.props.emailProp} placeholder="Enter email" />
								</div>
								<div className="form-group">
									<label htmlFor="password">Password</label>
									<input type="password" className="form-control" id="password" onChange={this.props.passwordProp} placeholder="Password" />
								</div>
								<button className="btn btn-primary" id="login" onClick={this.props.loginProp}>Log In or Sign Up</button>
							</div>
						</div>
					</div>
				</div>
        	</div>
        );
    }
}

export default Login
