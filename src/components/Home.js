import React, { Component } from 'react';
import axios from 'axios';
import * as firebase from 'firebase';

import './styles/gallery.css';

class Home extends Component {
    
    constructor(props){
        super();
        
        this.state = {
            progress: 0,
            uploader: {
                display: 'none',
            },
            data: [],
            key: [],
            disabled: ''
        }
        
        this.logout = this.logout.bind(this);
        this.uploadPhoto = this.uploadPhoto.bind(this);
        this.delete = this.delete.bind(this);
        this.buttonState = this.buttonState.bind(this);
    }
    
    componentDidMount(){
        const { currentUser } = firebase.auth();
        firebase.database().ref(`/users/${currentUser.uid}/files`)
      	    .on('value', snapshot => {
      	        if(snapshot.val() != null){
          	     this.setState({
          	         data: Object.values(snapshot.val()),
          	         key: Object.keys(snapshot.val())
          	     }) 
      	        } else {
      	            this.setState({
              	         data: [],
              	         key: []     	                
      	            })
      	        }
           });
           
           this.buttonState()
    }

    buttonState() {
        var connectedRef = firebase.database().ref(".info/connected");
        connectedRef.on("value", function(snap) {
          if (snap.val() === true) {
            this.setState({ disabled: '' })
          } else {
              this.setState({ disabled: "disabled" })
          }
        }.bind(this));
    }
    

    delete(id){
        const { currentUser } = firebase.auth();
    	firebase.database().ref(`/users/${currentUser.uid}/files/${id}`)
      	.on('value', snapshot => {
      	    if(snapshot.val() != null) {
          		var loc = snapshot.val().loc;
           		var storageRef = firebase.storage().ref(loc);
           		storageRef.delete().then(function() {
           		   firebase.database().ref(`/users/${currentUser.uid}/files/${id}`)
	   	            .remove();
        		 }).catch(function(error) {
        		   	console.log(error);
        		 });
      	    }	 
        });
    }
    
    
    uploadPhoto(e){
        
        var file = e.target.files[0];

        const { currentUser } = firebase.auth();
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++){
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }


        var loc = currentUser.uid+"/"+text+file.name;

        var storageRef = firebase.storage().ref(loc);

        var task = storageRef.put(file);

        

        task.on('state_changed',
            function progress(snapshot) {
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                this.setState({ uploader: { display: 'block' }, progress: percentage })
            }.bind(this),

            function error(err) {

            },

            async function complete() {
            var link = await storageRef.getDownloadURL();
            axios.post('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAtKVJCCPmLP9p-voX2oxyXHq83fIwGwKw', {
                requests:[{
                    image:{
                        source:{
                            imageUri: link
                    }
                    },
                    features:[
                        {
                        type:"LABEL_DETECTION",
                        maxResults:3
                        }
                    ]
            }]
            })
            .then((response) => {
                var sugguestions = [];
                for(var i=0; i<3; i++){
                    sugguestions.push(response.data.responses[0].labelAnnotations[i].description)
                }
                firebase.database().ref(`/users/${currentUser.uid}/files`).push({ link, loc, sugguestions });
                document.getElementById("file").value = ""; 
                this.setState({uploader: { display: 'none' }})             
            })
            .catch((error) => {
                var sugguestions = [];
                for(var i=0; i<3; i++){
                    sugguestions.push('undefined')
                }
                firebase.database().ref(`/users/${currentUser.uid}/files`).push({ link, loc, sugguestions });
                document.getElementById("file").value = "";  
                this.setState({uploader: { display: 'none' }})  
            });
            }.bind(this)
        )

    }
    
    
    logout(){
        firebase.auth().signOut().then({
            
        })
    	 .catch(function (err) {
    
    	 });
    }
    
    render(){
        return (
            <div>
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                	<div className="navbar-header">
                		<a className="navbar-brand"><span className="glyphicon glyphicon-picture" aria-hidden="true"></span>React Cloud</a>
                	</div>
                	<ul className="nav navbar-nav navbar-right">
                		<li><a onClick={this.logout} id='logout'>Logout</a></li>
                	</ul>
                </div>
            </nav>
            <div className="container">
        	    <div className="jumbotron">
        		<h1><i className="fas fa-camera-retro"></i> Image Gallery</h1>
        		<p><progress value={this.state.progress} max="100" style={this.state.uploader}>{this.state.progress}%</progress></p>
                <p><input type="file" onChange={this.uploadPhoto} className="btn btn-primary btn-lg" id="file" disabled={this.state.disabled}/></p>
                </div>
                <div className="row flexRow">
                    {this.state.data.map((data, i ) => <Photos data={data} key={i} keyProp={this.state.key[i]} delete={this.delete}/>)}
                </div>
            </div>
            </div>
        );
    }
}

class Photos extends Component {
    render() {
        return (
            <div className="col-md-3 col-sm-6">
                <div className="thumbnail">
                    <span onClick={()=>this.props.delete(this.props.keyProp)}>
                        <i className='fa fa-times'></i>
                    </span>
                    <img src={this.props.data.link} alt={`${this.props.data.sugguestions[0]}, ${this.props.data.sugguestions[1]}, ${this.props.data.sugguestions[2]}`} />
                    <div className="caption">
                        <h4><center>{this.props.data.sugguestions[0]}</center></h4>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;