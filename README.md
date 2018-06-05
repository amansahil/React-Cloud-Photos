# React-Cloud-Photos
A simple clone of Google Cloud Photos built with react for the web

## Setting up firebase

1) Go to firebase.com

2) Go to the console and start a new project

3) Go to authentication from the menu on the left and enable email under sign up methods
  
  <img width="1439" alt="firebase auth" src="https://user-images.githubusercontent.com/33552991/41003230-48f2bfee-6927-11e8-8ed8-3d2ae85318c2.png">
  
4) Next go to databse right below the authentication option, create a real time database

5) Under the rules tab enter this in

    <code>
      {
        "rules": {
          "users": {
            "$uid":{
              ".read" : "$uid === auth.uid",
              ".write": "$uid === auth.uid"
            }
          }
        }
      }
    </code>

6) Next go to databse right below the Storage option and click on get started

7) Click on project overview above authentication and select "Add Firebase to your web app". Copy only the config variable

8) Copy it into the src/index.js and replace it with the exisiting config var

For more info check out - https://firebase.google.com/docs/web/setup

## Getting Cloud Vision API

1) Go to cloud.google.com and enter your console

2) Create a new project and select API & Services 

3) Click on Enable Services and API

<img width="1440" alt="Enable Services and API" src="https://user-images.githubusercontent.com/33552991/41005639-6eed9cf2-692f-11e8-992e-290b9c4f2777.png">

4) Search for Google Cloud Vision API and enable it

<img width="1440" alt="Google Cloud Vision API" src="https://user-images.githubusercontent.com/33552991/41005691-9f1c4810-692f-11e8-9846-a18e3d49e1f0.png">

5) Go back and go to credentials

<img width="1440" alt="Credentials" src="https://user-images.githubusercontent.com/33552991/41006042-f4c76a64-6930-11e8-9e0c-3ad88956c80e.png">

6) Click on create credentials and click on API key

<img width="420" alt="screen shot 2018-06-06 at 2 21 04 am" src="https://user-images.githubusercontent.com/33552991/41005875-4d175180-6930-11e8-8aae-969e90f00b12.png">

7) Replace the generated API key it for the API_KEY placeholder in src/components/Home.js on line 96

## Running the project

Install Node: https://nodejs.org/en/

Open a terminal in the directory and run these two commands

- Run this to install required node modules
  <code>
    npm install
  </code>
- Run this to start the project
  <code>
    npm start
  </code>
