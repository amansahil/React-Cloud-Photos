import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
import * as firebase from 'firebase';
import registerServiceWorker from './registerServiceWorker';
var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();