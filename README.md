# [Minhsenger™][app-link]

<p align="right">
  <em>Before using <strong>Minhsenger™</strong>, I can only talk to myself. Now, I can use it to chat with another me. So much more convenient.</em> 😂
</p>

## Table of Contents
- [Overview](#Overview)
- [Installation](#Installation)
- [Notes](#Notes)
- [Acknowledgement](#Acknowledgement)

## Overview   
- [Minhsenger™][app-link] is a [_Progressive Web Application_][pwa-wiki] that allows users to chat with others.   
- The application supports unique user nicknames, chat rooms and a real-time dashboard which shows online users and their rooms.

## Installation
- Clone the repo
- Install packages in both frontend and backend    
  ```bash
  cd backend/
  npm install
  cd ../frontend/
  npm install
  ```   
- Build the application   
  ```bash
  cd ../backend/
  npm run build:ui
  ```
- Start up the application   
  ```bash
  npm start
  ```    
- By default, the application is started at http://localhost:5000    

## Notes
- Frontend is a React application created with [create-react-app][create-react-app-repo] package.
- UI is built with [Material UI framework][material-ui-website].
- Backend runs on [Node.js][nodejs-website] and is built with [Express.js][express-website].
- Communication between frontend and backend utilizes [socket.io][socket.io-website]     

## Acknowledgement   
- [Minhsenger™][app-link] is a case study of INFO-3139 course at Fanshawe College.   
- Special thanks to [Professor Evan Lauersen][evan-lauersen-github] for providing color codes of the chat bubbles.   

[app-link]: https://github.com/minhvo-dev/React-Socket.io-Minhsenger   
[pwa-wiki]: https://en.wikipedia.org/wiki/Progressive_web_application   
[create-react-app-repo]: https://github.com/facebook/create-react-app
[material-ui-website]: https://material-ui.com/  
[nodejs-website]: https://nodejs.org/en/     
[express-website]: https://expressjs.com/    
[socket.io-website]: https://socket.io/    
[evan-lauersen-github]: https://github.com/elauersen    
