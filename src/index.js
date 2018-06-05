import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
import * as firebase from 'firebase';
import registerServiceWorker from './registerServiceWorker';
var config = {
    apiKey: "AIzaSyDWGJ4QNaBeiM5EAF5Onw2TBmhVNmy3KyM",
    authDomain: "firephoto-b8be7.firebaseapp.com",
    databaseURL: "https://firephoto-b8be7.firebaseio.com",
    projectId: "firephoto-b8be7",
    storageBucket: "firephoto-b8be7.appspot.com",
    messagingSenderId: "916626634338"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();